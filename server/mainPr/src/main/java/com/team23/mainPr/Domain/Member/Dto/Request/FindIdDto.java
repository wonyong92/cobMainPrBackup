package com.team23.mainPr.Domain.Member.Dto.Request;

import javax.validation.constraints.NotNull;
import lombok.Data;

@Data
public class FindIdDto {

    @NotNull(message = "이메일 정보가 누락되었습니다.(email)(email)") String email;

    @NotNull(message = "이름 정보가 누락되었습니다.(name)") String name;
}
