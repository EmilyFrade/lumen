package com.lumen.model.enums;

public enum Category {

    TECH("Tecnologia"),
    BUSINESS("Negócios"),
    DESIGN("Design"),
    MARKETING("Marketing"),
    DATA("Dados"),
    PERSONAL_DEVELOPMENT("Desenvolvimento Pessoal"),
    LANGUAGES("Idiomas");

    private final String displayName;

    Category(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}

