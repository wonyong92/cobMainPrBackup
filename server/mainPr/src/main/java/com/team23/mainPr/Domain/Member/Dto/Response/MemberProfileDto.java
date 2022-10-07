package com.team23.mainPr.Domain.Member.Dto.Response;

import java.time.ZonedDateTime;
import lombok.Data;

@Data
public class MemberProfileDto {

    private String loginId;
    private String nickname;
    private String email;
    private ZonedDateTime createdAt;
    private Integer profileImageId;
}
