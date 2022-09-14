package com.team23.mainPr.ExceptionHandler;

import com.team23.mainPr.CustomException.MemberNameException;
import com.team23.mainPr.CustomException.MemberNicknameException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice("com.team23.mainPr.Member")
public class MemberExHandler {

    @ExceptionHandler(MemberNameException.class)
    public String handleMemberNameException(Exception e) {

        MemberNameException ex = (MemberNameException) e;

        return ex.getMsg();
    }

    @ExceptionHandler(MemberNicknameException.class)
    public String handleMemberNicknameException(Exception e) {

        MemberNicknameException ex = (MemberNicknameException) e;

        return ex.getMsg();
    }
}
