package com.team23.mainPr.Member.Dto;

import com.team23.mainPr.Dto.CommonDtoBoundary;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ApiModel(value = "CreateMemberDto", description = "입력 받은 정보를 dto로 맵핑")
public class CreateMemberDto extends CommonDtoBoundary {

    /*
    * ETC: swagger 이슈 - private 일때 제대로 인식이 안되는 경우 발생, public으로 사용시 제대로 스웨거 동작 
    */
    
    @ApiModelProperty(value = "로그인 아이디 - 영어로 시작, 숫자포함 총 5~11자", example = "wonyong92") 
    public String loginId="";
    @ApiModelProperty(value = "패스워드 - 특수문자 [@!#%&] 최소 1글자 이상 포함, 최소 6글자 최대 20 글자 ", example = "password@@@password")
    public String password="";
    @ApiModelProperty(value = "닉네임 ", example = "Nickname5586")
    public String nickname="";



}
