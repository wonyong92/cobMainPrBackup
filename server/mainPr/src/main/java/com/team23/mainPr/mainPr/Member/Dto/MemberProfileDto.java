package com.team23.mainPr.mainPr.Member.Dto;

import com.team23.mainPr.Dto.ParentCommonDto;

import java.time.ZonedDateTime;

public class MemberProfileDto extends ParentCommonDto {

    private String loginId;
    private String nickname;
    private String email;
    private ZonedDateTime createdAt;
    private String profileImageId;
}
