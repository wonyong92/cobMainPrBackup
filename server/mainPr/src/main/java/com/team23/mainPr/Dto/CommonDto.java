package com.team23.mainPr.Dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class CommonDto <T extends CommonDtoBoundary>{

    String msg = "";
    T t;

    public void SetDto(T dto)
    {
        this.t = dto;
    }

    public T  getDto()
    {
        return this.t;
    }

    public void  setMsg(String msg)
    {
        this.msg = msg;
    }

    public String  getMsg()
    {
        return this.msg;
    }
}
