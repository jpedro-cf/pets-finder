package com.example.api.pets.enums;

public enum PetTypeEnum {
    CAT("CAT"),
    DOG("DOG"),
    OTHER("OTHER");

    private String value;

    PetTypeEnum(final String value) {
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
