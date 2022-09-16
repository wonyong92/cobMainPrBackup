package com.team23.mainPr.Member.Dto;

import com.team23.mainPr.Dto.ParentCommonDto;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MemberResponse extends ParentCommonDto {

    private Integer id;
    private String loginId;
    private String password;
    private String nickname;
    private String email;
    private String phone;
    private LocalDateTime createdAt;
    private Integer profileId;

}
