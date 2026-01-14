package com.lumen.model.enums;

public enum CourseStatus {
    
    INTEREST("Interesse"),
    IN_PROGRESS("Em andamento"),
    COMPLETED("Concluído");

    private final String displayName;

    CourseStatus(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}

