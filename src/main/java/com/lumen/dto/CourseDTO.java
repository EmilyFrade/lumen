package com.lumen.dto;

import com.lumen.model.enums.Category;
import com.lumen.model.enums.CourseStatus;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class CourseDTO {

    private String title;

    private String description;

    private Category category;

    private Integer progress;

    private Integer rating;

    private CourseStatus status;

    private String instructor;

    private String duration;

    private Boolean paid;

    private BigDecimal price;

    private List<String> modules;

    private String notes;
}

