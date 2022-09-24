package com.team23.mainPr.Domain.Login.Dto.Request;

import static com.team23.mainPr.Global.Enum.ChildCommonDtoMsgList.NULL_LOGINID;

import java.time.ZonedDateTime;
import javax.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateLoginEntityDto {

    @NotNull(message = "로그인 아이디 정보가 누락되었습니다.(loginId)(loginId)")
    private String loginId;

    @NotNull(message = "password must not be null")
    private String password;

    @NotNull(message = "memberId must not be null")
    private Integer memberId;

    @NotNull(message = "token must not be null")
    private String token;

    private ZonedDateTime lastLoginData;
    private ZonedDateTime logoutData = null;
    private Boolean logouted = false;
}
