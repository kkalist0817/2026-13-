package com.roadmap.service.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "checklists")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Checklist {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;        // 항목 내용
    private boolean completed;     // 완료 여부

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "week_id")
    private Week week;
}