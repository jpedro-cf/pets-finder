package com.example.api.data.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@ControllerAdvice
public class RestExceptionHandler {

    @ExceptionHandler(ApplicationException.class)
    public ProblemDetail handleApplicationException(ApplicationException e){
        return e.toProblemDetail();
    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ProblemDetail handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {

        var params = e.getFieldErrors()
                .stream()
                .map(f -> f.getField().isEmpty() ? "" : f.getField())
                .toList();

        var pb = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);

        pb.setTitle("Parâmetros inválidos.");
        pb.setProperty("missing_params", params);

        return pb;
    }
}
