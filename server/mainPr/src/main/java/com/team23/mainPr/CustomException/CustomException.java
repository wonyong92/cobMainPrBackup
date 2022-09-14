package com.team23.mainPr.CustomException;

import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
public class CustomException extends RuntimeException{

    Errordata errordata;

    public CustomException(Errordata e)
    {
        this.errordata = e;
    }
}
