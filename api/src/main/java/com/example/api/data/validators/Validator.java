package com.example.api.data.validators;

import java.util.Optional;

public interface Validator<T> {
    public Optional<String> validate(T data);
}
