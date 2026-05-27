package com.roadmap.service.service;

import com.roadmap.service.dto.RoadmapRequest;
import com.roadmap.service.dto.RoadmapResponse;
import com.roadmap.service.entity.*;
import com.roadmap.service.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoadmapService {

    private final RoadmapRepository roadmapRepository;
    private final UserRepository userRepository;

    public List<RoadmapResponse> getAllRoadmaps() {
        return roadmapRepository.findAll().stream()
                .map(RoadmapResponse::from).collect(Collectors.toList());
    }

    public List<RoadmapResponse> searchRoadmaps(String keyword) {
        return roadmapRepository.findByTitleContaining(keyword).stream()
                .map(RoadmapResponse::from).collect(Collectors.toList());
    }

    public RoadmapResponse getRoadmap(Long id) {
        Roadmap roadmap = roadmapRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("로드맵을 찾을 수 없습니다."));
        return RoadmapResponse.from(roadmap);
    }

    public RoadmapResponse getPreview(Long id) {
        // 미리보기: 제목, 기간, 난이도만 반환 (체크리스트 제외)
        Roadmap roadmap = roadmapRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("로드맵을 찾을 수 없습니다."));
        return RoadmapResponse.builder()
                .id(roadmap.getId())
                .title(roadmap.getTitle())
                .description(roadmap.getDescription())
                .duration(roadmap.getDuration())
                .difficulty(roadmap.getDifficulty())
                .startLevel(roadmap.getStartLevel())
                .weeks(List.of())
                .build();
    }

    @Transactional
    public RoadmapResponse createRoadmap(RoadmapRequest request, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        Roadmap roadmap = Roadmap.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .duration(request.getDuration())
                .difficulty(request.getDifficulty())
                .startLevel(request.getStartLevel())
                .author(user)
                .build();

        if (request.getWeeks() != null) {
            List<Week> weeks = request.getWeeks().stream().map(wr -> {
                Week week = Week.builder()
                        .weekNumber(wr.getWeekNumber())
                        .roadmap(roadmap)
                        .build();
                List<Checklist> checklists = wr.getChecklists().stream()
                        .map(c -> Checklist.builder().content(c).completed(false).week(week).build())
                        .collect(Collectors.toList());
                week.setChecklists(checklists);
                return week;
            }).collect(Collectors.toList());
            roadmap.setWeeks(weeks);
        }

        return RoadmapResponse.from(roadmapRepository.save(roadmap));
    }

    @Transactional
    public RoadmapResponse updateRoadmap(Long id, RoadmapRequest request) {
        Roadmap roadmap = roadmapRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("로드맵을 찾을 수 없습니다."));
        roadmap.setTitle(request.getTitle());
        roadmap.setDescription(request.getDescription());
        roadmap.setDuration(request.getDuration());
        roadmap.setDifficulty(request.getDifficulty());
        roadmap.setStartLevel(request.getStartLevel());
        return RoadmapResponse.from(roadmapRepository.save(roadmap));
    }

    public void deleteRoadmap(Long id) {
        roadmapRepository.deleteById(id);
    }
}