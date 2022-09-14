package com.team23.mainPr.CustomException;

import lombok.Getter;

@Getter
public class CustomException extends RuntimeException {

    Errordata errordata;

    public CustomException(Errordata e) {
        this.errordata = e;
    }
}
