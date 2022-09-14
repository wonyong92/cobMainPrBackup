package com.team23.mainPr.CustomException;

import lombok.Getter;

@Getter
public class MemberNicknameException extends RuntimeException{

    String msg = "check member nickname!";

    public MemberNicknameException(){}

    public MemberNicknameException(String msg){
        this.msg = msg;
    }
}
