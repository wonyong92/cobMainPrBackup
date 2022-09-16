package com.team23.mainPr.Profile.Dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * getter는 쓰는게 맞는데 setter 꼭 있어야 하나? : 라이브러리 종속도가 너무 높은 상태
 * http converter 의 동작: 자동 맵핑 동작 개념 확인
 * setter 있으면 스웨거에서 setter 부분에 대한 이상한 example이 생성된다. nickname:string 이런 데이터
 */

@NoArgsConstructor
@AllArgsConstructor
@Data
@ApiModel(value = "ProfileUpdateDto", description = "수정할 프로필 데이터를 dto 객체로 한번에 요청 받기")
public class UpdateProfileDto {

    @ApiModelProperty(value = "닉네임 변경시", example = "nickName5566")
    public String nickname;
    @ApiModelProperty(value = "소개글 변경시", example = "hello world!")
    public String about;

}
