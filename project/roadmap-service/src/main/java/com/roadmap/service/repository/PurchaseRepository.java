package com.roadmap.service.repository;

import com.roadmap.service.entity.Purchase;
import com.roadmap.service.entity.User;
import com.roadmap.service.entity.Roadmap;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface PurchaseRepository extends JpaRepository<Purchase, Long> {
    boolean existsByUserAndRoadmap(User user, Roadmap roadmap);
    List<Purchase> findByUser(User user);
    Optional<Purchase> findByUserAndRoadmap(User user, Roadmap roadmap);
}