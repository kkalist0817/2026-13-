package com.roadmap.service.dto;

import lombok.*;
import java.util.List;

@Getter @Setter
public class RoadmapRequest {
    private String title;
    private String description;
    private String duration;
    private String difficulty;
    private String startLevel;
    private List<WeekRequest> weeks;

    @Getter @Setter
    public static class WeekRequest {
        private int weekNumber;
        private List<String> checklists;
    }
}