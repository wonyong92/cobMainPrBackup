package com.team23.mainPr.Domain.Member.Dto.Request;

import javax.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UpdateMemberDto {

    @NotNull(message = "닉네임 정보가 누락되었습니다.(nickname)") private String nickname;
    @NotNull(message = "유저 정보가 누락되었습니다.(memberId)") private Integer memberId;
}
