package com.roadmap.service.dto;

import com.roadmap.service.entity.Roadmap;
import lombok.*;
import java.util.List;
import java.util.stream.Collectors;

@Getter @Builder
public class RoadmapResponse {
    private Long id;
    private String title;
    private String description;
    private String duration;
    private String difficulty;
    private String startLevel;
    private Long authorId;
    private List<WeekResponse> weeks;

    @Getter @Builder
    public static class WeekResponse {
        private int weekNumber;
        private List<ChecklistResponse> checklists;
    }

    @Getter @Builder
    public static class ChecklistResponse {
        private Long id;
        private String content;
        private boolean completed;
    }

    public static RoadmapResponse from(Roadmap roadmap) {
        return RoadmapResponse.builder()
                .id(roadmap.getId())
                .title(roadmap.getTitle())
                .description(roadmap.getDescription())
                .duration(roadmap.getDuration())
                .difficulty(roadmap.getDifficulty())
                .startLevel(roadmap.getStartLevel())
                .authorId(roadmap.getAuthor() != null ? roadmap.getAuthor().getId() : null)
                .weeks(roadmap.getWeeks() == null ? List.of() :
                        roadmap.getWeeks().stream().map(w -> WeekResponse.builder()
                                .weekNumber(w.getWeekNumber())
                                .checklists(w.getChecklists() == null ? List.of() :
                                        w.getChecklists().stream().map(c -> ChecklistResponse.builder()
                                                .id(c.getId())
                                                .content(c.getContent())
                                                .completed(c.isCompleted())
                                                .build()).collect(Collectors.toList()))
                                .build()).collect(Collectors.toList()))
                .build();
    }
}
