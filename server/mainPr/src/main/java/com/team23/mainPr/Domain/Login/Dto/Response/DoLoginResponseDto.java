package com.team23.mainPr.Domain.Login.Dto.Response;

import java.time.ZonedDateTime;

import lombok.Data;

@Data
public class DoLoginResponseDto {

	Integer memberId;
	Integer loginId;
	ZonedDateTime lastLoginDate;
}
