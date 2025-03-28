package com.example.api.users.exceptions;

import com.example.api.data.exceptions.ApplicationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;

public class PasswordInvalidException extends ApplicationException {
    public PasswordInvalidException(String message) {
        super(message);
    }
    @Override
    public ProblemDetail toProblemDetail(){
        ProblemDetail problem = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);

        problem.setTitle("Password invalid.");
        problem.setDetail(this.getMessage());

        return problem;
    }
}
