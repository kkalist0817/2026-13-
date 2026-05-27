package com.roadmap.service.repository;

import com.roadmap.service.entity.Roadmap;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RoadmapRepository extends JpaRepository<Roadmap, Long> {
    List<Roadmap> findByTitleContaining(String keyword);
}