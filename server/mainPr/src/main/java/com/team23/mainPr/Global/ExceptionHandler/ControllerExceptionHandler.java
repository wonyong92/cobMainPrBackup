package com.team23.mainPr.Global.ExceptionHandler;

import com.team23.mainPr.Global.CustomException.CustomException;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ControllerExceptionHandler {

    @ExceptionHandler({MethodArgumentNotValidException.class})
    @Order(value = 3)
    public ResponseEntity<String> methodArgumentValidException(MethodArgumentNotValidException e) {

        return new ResponseEntity<>(e.getMessage().split(";")[5].replace("default message [","").replace("]] ","") ,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    @Order(value = 7)
    public ResponseEntity<String> handleControllerException(CustomException e) {
        return new ResponseEntity<>(e.getErrordata().getReason(), e.getErrordata().getCode());
    }
    @ExceptionHandler
    @Order(value = 11)
    public ResponseEntity<String> handleControllerException(Exception e) {
        return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
