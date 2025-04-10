package com.example.api.users.enums;

public enum UserRolesEnum {
    ADMIN("ADMIN"),
    USER("USER");

    private String value;

    UserRolesEnum(final String value) {
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
