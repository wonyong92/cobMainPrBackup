package com.team23.mainPr;

import lombok.Data;

import java.time.ZonedDateTime;

@Data
public class CreateLoginDto {

    private String loginId;
    private String password;
    private Integer memberId;
    private String token;
    private ZonedDateTime lastLoginDt;
    private ZonedDateTime logoutDt = null;
    private Boolean logouted=false;
}
