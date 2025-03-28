package com.example.api.users.exceptions;

import com.example.api.data.exceptions.ApplicationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;

public class EmailInUseException extends ApplicationException {
    public EmailInUseException(String message){
        super(message);
    }
    @Override
    public ProblemDetail toProblemDetail(){
        ProblemDetail problem = ProblemDetail.forStatus(HttpStatus.CONFLICT);

        problem.setTitle("Email already in use.");
        problem.setDetail(this.getMessage());

        return problem;
    }
}
