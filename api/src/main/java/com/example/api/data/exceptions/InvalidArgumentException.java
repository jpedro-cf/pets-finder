package com.example.api.data.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;

public class InvalidArgumentException extends ApplicationException {
    public InvalidArgumentException(String message) {
        super(message);
    }

    @Override
    public ProblemDetail toProblemDetail(){
        ProblemDetail problem = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);

        problem.setTitle("Invalid argument.");
        problem.setDetail(this.getMessage());

        return problem;
    }
}
