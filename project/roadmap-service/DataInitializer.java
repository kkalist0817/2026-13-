package com.roadmap.service;

import com.roadmap.service.entity.*;
import com.roadmap.service.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RoadmapRepository roadmapRepository;

    @Override
    public void run(String... args) {
        // 테스트 계정 생성
        User user = userRepository.save(
                User.builder().username("admin").password("1234").build()
        );

        // 테스트 로드맵 생성
        Week week1 = Week.builder().weekNumber(1).build();
        Checklist c1 = Checklist.builder().content("1주목 adapter 강의").completed(false).week(week1).build();
        Checklist c2 = Checklist.builder().content("개념요체플이").completed(false).week(week1).build();
        week1.setChecklists(List.of(c1, c2));

        Roadmap roadmap = Roadmap.builder()
                .title("ADsP 3주 단기합격 로드맵")
                .description("ADsP 자격증을 3주 만에 합격하는 로드맵")
                .duration("3주")
                .difficulty("중상")
                .startLevel("비전공자")
                .author(user)
                .weeks(List.of(week1))
                .build();
        week1.setRoadmap(roadmap);

        roadmapRepository.save(roadmap);
    }
}