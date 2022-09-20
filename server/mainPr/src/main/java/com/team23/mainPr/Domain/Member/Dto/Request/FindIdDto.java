package com.team23.mainPr.Domain.Member.Dto.Request;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class FindIdDto {
    @NotNull(message="email must not be null")
    String email;
    @NotNull(message="name must not be null")
    String name;
}
