package com.team23.mainPr.CustomException;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
public class MemberNameException extends RuntimeException {

    String msg = "check member name!";

    public MemberNameException(){}

    public MemberNameException(String msg){
        this.msg = msg;
    }
}
