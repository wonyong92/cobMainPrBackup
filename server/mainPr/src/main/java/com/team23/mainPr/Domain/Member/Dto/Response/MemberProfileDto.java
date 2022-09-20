package com.team23.mainPr.Domain.Member.Dto.Response;

import lombok.Data;

import java.time.ZonedDateTime;

@Data
public class MemberProfileDto {

    private String loginId;
    private String nickname;
    private String email;
    private ZonedDateTime createdAt;
    private Integer profileImageId;

}
