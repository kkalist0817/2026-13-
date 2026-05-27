package com.roadmap.service.controller;

import com.roadmap.service.service.*;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class PurchaseController {

    private final PurchaseService purchaseService;
    private final ChecklistService checklistService;

    // POST /api/v1/purchases
    @PostMapping("/purchases")
    public ResponseEntity<?> purchase(@RequestBody Map<String, Long> body, HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) return ResponseEntity.status(401).body("로그인이 필요합니다.");
        return ResponseEntity.ok(purchaseService.createPurchase(userId, body.get("roadmapId")));
    }

    // GET /api/v1/purchases/check?roadmapId={roadmapId}
    @GetMapping("/purchases/check")
    public ResponseEntity<?> checkPurchase(@RequestParam Long roadmapId, HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) return ResponseEntity.status(401).body(false);
        return ResponseEntity.ok(purchaseService.checkPurchase(userId, roadmapId));
    }

    // GET /api/v1/users/me/purchases
    @GetMapping("/users/me/purchases")
    public ResponseEntity<?> getMyPurchases(HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) return ResponseEntity.status(401).body("로그인이 필요합니다.");
        return ResponseEntity.ok(purchaseService.getMyPurchases(userId));
    }

    // GET /api/v1/roadmaps/{roadmapId}/checklists
    @GetMapping("/roadmaps/{roadmapId}/checklists")
    public ResponseEntity<?> getChecklists(@PathVariable Long roadmapId) {
        return ResponseEntity.ok(checklistService.getAllChecklists(roadmapId));
    }

    // PATCH /api/v1/checklists/{checklistId}/progress
    @PatchMapping("/checklists/{checklistId}/progress")
    public ResponseEntity<?> updateProgress(@PathVariable Long checklistId,
                                            @RequestBody Map<String, Boolean> body) {
        checklistService.updateProgress(checklistId, body.get("completed"));
        return ResponseEntity.ok("저장 완료");
    }

    // GET /api/v1/roadmaps/{roadmapId}/progress-rate
    @GetMapping("/roadmaps/{roadmapId}/progress-rate")
    public ResponseEntity<?> getProgressRate(@PathVariable Long roadmapId) {
        return ResponseEntity.ok(checklistService.getProgressRate(roadmapId));
    }
}