package com.example.api.data.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;

public class UnauthorizedException extends ApplicationException{
    public UnauthorizedException(String message) {
        super(message);
    }

    @Override
    public ProblemDetail toProblemDetail(){
        ProblemDetail problem = ProblemDetail.forStatus(HttpStatus.UNAUTHORIZED);

        problem.setTitle("Unauthorized.");
        problem.setDetail(this.getMessage());

        return problem;
    }
}
