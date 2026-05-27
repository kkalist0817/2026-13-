package com.roadmap.service.service;

import com.roadmap.service.dto.RoadmapResponse;
import com.roadmap.service.entity.Checklist;
import com.roadmap.service.repository.ChecklistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChecklistService {

    private final ChecklistRepository checklistRepository;

    public List<RoadmapResponse.ChecklistResponse> getAllChecklists(Long roadmapId) {
        return checklistRepository.findByWeek_Roadmap_Id(roadmapId).stream()
                .map(c -> RoadmapResponse.ChecklistResponse.builder()
                        .id(c.getId())
                        .content(c.getContent())
                        .completed(c.isCompleted())
                        .build())
                .collect(Collectors.toList());
    }

    public void updateProgress(Long checklistId, boolean completed) {
        Checklist checklist = checklistRepository.findById(checklistId)
                .orElseThrow(() -> new RuntimeException("체크리스트를 찾을 수 없습니다."));
        checklist.setCompleted(completed);
        checklistRepository.save(checklist);
    }

    public double getProgressRate(Long roadmapId) {
        List<Checklist> all = checklistRepository.findByWeek_Roadmap_Id(roadmapId);
        if (all.isEmpty()) return 0.0;
        long done = all.stream().filter(Checklist::isCompleted).count();
        return (double) done / all.size() * 100;
    }
}