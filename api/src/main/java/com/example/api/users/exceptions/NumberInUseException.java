package com.example.api.users.exceptions;

import com.example.api.data.exceptions.ApplicationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;

public class NumberInUseException extends ApplicationException {
    public NumberInUseException(String message) {
        super(message);
    }

    @Override
    public ProblemDetail toProblemDetail(){
        ProblemDetail problem = ProblemDetail.forStatus(HttpStatus.CONFLICT);

        problem.setTitle("Phone number already in use.");
        problem.setDetail(this.getMessage());

        return problem;
    }
}
