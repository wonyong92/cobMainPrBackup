package com.team23.mainPr.Global.ExceptionHandler;

import com.team23.mainPr.Global.CustomException.CustomException;
import javax.validation.ConstraintViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

@RestControllerAdvice
public class ControllerExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> methodArgumentValidException(MethodArgumentNotValidException e) {
        return new ResponseEntity<>(e.getMessage().split(";")[5]
            .replace("default message [", "")
            .replace("]] ", ""), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = {ConstraintViolationException.class})
    protected ResponseEntity<Object> handleConstraintViolation(ConstraintViolationException e,WebRequest request) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<String> handleControllerException(CustomException e) {
        return new ResponseEntity<>(e.getErrordata().getReason(), e.getErrordata().getCode());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleControllerException(Exception e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
