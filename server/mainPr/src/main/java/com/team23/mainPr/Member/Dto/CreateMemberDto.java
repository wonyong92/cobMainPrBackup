package com.team23.mainPr.Member.Dto;

import com.team23.mainPr.Dto.ParentCommonDto;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ApiModel(value = "CreateMemberDto", description = "입력 받은 회원 가입 정보를 dto로 맵핑")
public class CreateMemberDto extends ParentCommonDto {

    /*
     * ETC: swagger 이슈 - private 일때 제대로 인식이 안되는 경우 발생, public으로 사용시 제대로 스웨거 동작
     */

    public String loginId = "";
    public String password = "";
    public String nickname = "";
    private String email;
    private LocalDateTime createdAt;
    private String profileImageId = "default.png";
}
