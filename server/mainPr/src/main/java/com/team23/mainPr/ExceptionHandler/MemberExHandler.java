package com.team23.mainPr.ExceptionHandler;

import com.team23.mainPr.CustomException.CustomException;
import com.team23.mainPr.CustomException.Errordata;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice("com.team23.mainPr.Member")
public class MemberExHandler {

    @ExceptionHandler
    public Errordata handleMemberNameException(Exception e) {

        CustomException ex = (CustomException) e;

        return ex.getErrordata();
    }
}
