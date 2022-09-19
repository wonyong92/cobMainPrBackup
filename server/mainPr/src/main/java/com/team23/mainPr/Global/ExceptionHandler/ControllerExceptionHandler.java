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
        //Bean Validation 이 throw 하는 에러 객체에서 필요한 메세지만 분리하여 응답하기.
          return new ResponseEntity<>(e.getMessage().split(";")[5].replace("default message [","").replace("]] ","") ,HttpStatus.BAD_REQUEST);
    }

     @ExceptionHandler
     @Order(value = 7)
     public ResponseEntity<String> handleControllerException(CustomException e) {
         //커스텀 에러 데이터에 대해서 이유 메세지와 status code 응답하기
         return new ResponseEntity<>(e.getErrordata().getReason(), e.getErrordata().getCode());
    }
     @ExceptionHandler
     @Order(value = 11)
     public ResponseEntity<String> handleControllerException(Exception e) {
         //생각해보면 모든 에러상황에 대해 처리하는 것은 친절하지만 너무 비효율적일 수 있다. 못잡은 에러는 500번 보내주고 프론트에서 알아서 처리하도록 하게 하여야겠다.
          return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
