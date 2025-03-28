package com.example.api.users.exceptions;

import com.example.api.data.exceptions.ApplicationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;

public class MissingNumberException extends ApplicationException {
    public MissingNumberException(String message) {
        super(message);
    }
    @Override
    public ProblemDetail toProblemDetail(){
        ProblemDetail problem = ProblemDetail.forStatus(HttpStatus.UNAUTHORIZED);

        problem.setTitle("Missing number in profile.");
        problem.setDetail(this.getMessage());

        return problem;
    }
}
