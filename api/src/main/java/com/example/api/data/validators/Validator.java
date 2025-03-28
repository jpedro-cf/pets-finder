package com.example.api.data.validators;

import java.util.Optional;

public interface Validator<T> {
    public void validate(T data);
}
