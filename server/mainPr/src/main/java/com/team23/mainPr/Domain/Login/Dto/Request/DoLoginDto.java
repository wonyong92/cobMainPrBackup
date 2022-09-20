package com.team23.mainPr.Domain.Login.Dto.Request;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class DoLoginDto {

    @NotNull(message = "loginId must not be null")
    private String loginId;
    @NotNull(message = "password must not be null")
    private String password;

}