package com.team23.mainPr.RentPost.Dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@ApiModel(description = "게시글 생성에 필요한 데이터를 한번에 모아서 요청", value = "CreateRentPostDto")
@Data
public class CreateRentPostDto {

    @ApiModelProperty(value = "Name", example = "노트북 렌트 합니다.")
    public String name;
    @ApiModelProperty(value = "Contents", example = "삼성 노트북 **** 노트북 렌트 합니다.")
    public String contents;

}
