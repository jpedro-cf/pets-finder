package com.example.api.data.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;

public class NotFoundException extends ApplicationException{
    public NotFoundException(String message) {
        super(message);
    }
    @Override
    public ProblemDetail toProblemDetail(){
        ProblemDetail problem = ProblemDetail.forStatus(HttpStatus.NOT_FOUND);

        problem.setTitle("Resource not found.");
        problem.setDetail(this.getMessage());

        return problem;
    }
}
