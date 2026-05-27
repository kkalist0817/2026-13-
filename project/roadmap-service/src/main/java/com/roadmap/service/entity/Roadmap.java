package com.roadmap.service.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "roadmaps")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Roadmap {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String duration;      // 예: "3주"
    private String difficulty;    // 하/중/상
    private String startLevel;    // 비전공자, 초보자 등

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User author;

    @OneToMany(mappedBy = "roadmap", cascade = CascadeType.ALL)
    private List<Week> weeks;
}