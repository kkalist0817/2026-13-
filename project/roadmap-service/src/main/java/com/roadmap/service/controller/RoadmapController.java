package com.roadmap.service.controller;

import com.roadmap.service.dto.*;
import com.roadmap.service.service.RoadmapService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/roadmaps")
@RequiredArgsConstructor
public class RoadmapController {

    private final RoadmapService roadmapService;

    // GET /api/v1/roadmaps
    @GetMapping
    public ResponseEntity<?> getAllRoadmaps() {
        return ResponseEntity.ok(roadmapService.getAllRoadmaps());
    }

    // GET /api/v1/roadmaps/search?keyword={keyword}
    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam String keyword) {
        return ResponseEntity.ok(roadmapService.searchRoadmaps(keyword));
    }

    // GET /api/v1/roadmaps/{roadmapId}
    @GetMapping("/{roadmapId}")
    public ResponseEntity<?> getRoadmap(@PathVariable Long roadmapId) {
        return ResponseEntity.ok(roadmapService.getRoadmap(roadmapId));
    }

    // GET /api/v1/roadmaps/{roadmapId}/preview
    @GetMapping("/{roadmapId}/preview")
    public ResponseEntity<?> getPreview(@PathVariable Long roadmapId) {
        return ResponseEntity.ok(roadmapService.getPreview(roadmapId));
    }

    // POST /api/v1/roadmaps
    @PostMapping
    public ResponseEntity<?> createRoadmap(@RequestBody RoadmapRequest request, HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) return ResponseEntity.status(401).body("로그인이 필요합니다.");
        return ResponseEntity.ok(roadmapService.createRoadmap(request, userId));
    }

    // PUT /api/v1/roadmaps/{roadmapId}
    @PutMapping("/{roadmapId}")
    public ResponseEntity<?> updateRoadmap(@PathVariable Long roadmapId,
                                           @RequestBody RoadmapRequest request) {
        return ResponseEntity.ok(roadmapService.updateRoadmap(roadmapId, request));
    }

    // DELETE /api/v1/roadmaps/{roadmapId}
    @DeleteMapping("/{roadmapId}")
    public ResponseEntity<?> deleteRoadmap(@PathVariable Long roadmapId) {
        roadmapService.deleteRoadmap(roadmapId);
        return ResponseEntity.ok("삭제 완료");
    }
}