package com.roadmap.service.controller;

import com.roadmap.service.dto.LoginRequest;
import com.roadmap.service.entity.User;
import com.roadmap.service.service.AuthService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    // POST /api/v1/auth/login
    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request, HttpSession session) {
        User user = authService.login(request);
        session.setAttribute("userId", user.getId());
        return ResponseEntity.ok(user);
    }

    // GET /api/v1/users/me
    @GetMapping("/users/me")
    public ResponseEntity<?> getMe(HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) return ResponseEntity.status(401).body("로그인이 필요합니다.");
        return ResponseEntity.ok(userId);
    }
}