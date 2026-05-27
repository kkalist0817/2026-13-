package com.roadmap.service.repository;

import com.roadmap.service.entity.Checklist;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ChecklistRepository extends JpaRepository<Checklist, Long> {
    List<Checklist> findByWeek_Roadmap_Id(Long roadmapId);
}