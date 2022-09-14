package com.team23.mainPr.Dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class CommonDto<T extends CommonDtoBoundary> {

    String msg = "";
    T t;

    public void SetDto(T dto) {
        this.t = dto;
    }

    public T getDto() {
        return this.t;
    }

    public String getMsg() {
        return this.msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
