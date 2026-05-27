package com.roadmap.service.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "weeks")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Week {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int weekNumber;   // 1주차, 2주차...

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "roadmap_id")
    private Roadmap roadmap;

    @OneToMany(mappedBy = "week", cascade = CascadeType.ALL)
    private List<Checklist> checklists;
}