package com.example.api.pets.enums;

public enum PetStatusEnum {
    PROCESSED("PROCESSED"),
    PROCESSING("PROCESSING"),
    UNAVAILABLE("UNAVAILABLE");

    private String value;

    PetStatusEnum(final String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return this.getValue();
    }
}
