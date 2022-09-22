package com.team23.mainPr.Domain.Member.Dto.Request;

import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class UpdateMemberDto {

	@NotNull(message = "nickname must not be null")
	private String nickname;
}
