package com.team23.mainPr.Member.Dto;

import com.team23.mainPr.Dto.ParentCommonDto;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Data
public class MemberResponse extends ParentCommonDto {

    private Integer memberId;
    private String loginId;
    private String password;
    private String nickname;
    private String email;
    private LocalDateTime createdAt;
    private Integer rentHistory;
    private String profileImageId;

}
