package com.roadmap.service.service;

import com.roadmap.service.dto.RoadmapResponse;
import com.roadmap.service.entity.*;
import com.roadmap.service.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PurchaseService {

    private final PurchaseRepository purchaseRepository;
    private final UserRepository userRepository;
    private final RoadmapRepository roadmapRepository;

    public Purchase createPurchase(Long userId, Long roadmapId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
        Roadmap roadmap = roadmapRepository.findById(roadmapId)
                .orElseThrow(() -> new RuntimeException("로드맵을 찾을 수 없습니다."));

        if (purchaseRepository.existsByUserAndRoadmap(user, roadmap)) {
            throw new RuntimeException("이미 구매한 로드맵입니다.");
        }

        return purchaseRepository.save(
                Purchase.builder().user(user).roadmap(roadmap).build()
        );
    }

    public boolean checkPurchase(Long userId, Long roadmapId) {
        User user = userRepository.findById(userId).orElseThrow();
        Roadmap roadmap = roadmapRepository.findById(roadmapId).orElseThrow();
        return purchaseRepository.existsByUserAndRoadmap(user, roadmap);
    }

    public List<RoadmapResponse> getMyPurchases(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return purchaseRepository.findByUser(user).stream()
                .map(p -> RoadmapResponse.from(p.getRoadmap()))
                .collect(Collectors.toList());
    }
}