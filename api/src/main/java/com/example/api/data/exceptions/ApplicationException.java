package com.example.api.data.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;

public class ApplicationException extends RuntimeException{
    public ApplicationException(String message){
        super(message);
    }
    public ProblemDetail toProblemDetail(){
        ProblemDetail problem = ProblemDetail.forStatus(HttpStatus.INTERNAL_SERVER_ERROR);

        problem.setTitle("API Internal Server Error.");

        return problem;
    }
}
