package com.team23.mainPr.Global.ExceptionHandler;

import com.team23.mainPr.Global.CustomException.CustomException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ControllerExceptionHandler {

    @ExceptionHandler
    public Object handleControllerException(Exception e) {

        CustomException ex;

        if (e instanceof CustomException) {
            ex = (CustomException) e;
            return ex.getErrordata();
        }

        return e.getMessage();
    }
}
