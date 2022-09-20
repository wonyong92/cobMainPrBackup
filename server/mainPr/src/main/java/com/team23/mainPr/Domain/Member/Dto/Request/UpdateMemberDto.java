package com.team23.mainPr.Domain.Member.Dto.Request;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class UpdateMemberDto {
    @NotNull(message = "nickname must not be null")
    private String nickname;
}
