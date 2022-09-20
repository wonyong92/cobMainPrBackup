package com.team23.mainPr.Domain.Login.Dto.Response;

import lombok.Data;

import java.time.ZonedDateTime;

@Data
public class DoLoginResponseDto {

    Integer memberId;
    Integer loginId;
    ZonedDateTime lastLoginDate;

}
