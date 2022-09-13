package com.team23.mainPr.SellPost.Dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@ApiModel(value = "CreateSellPostDto", description = "게시글 생성에 필요한 데이터를 한번에 모아서 요청")
@Data
public class CreateSellPostDto {

    @ApiModelProperty(value="Name",example = "노트북 렌트 합니다.")
    public String name;
    @ApiModelProperty(value="Contents",example = "삼성 노트북 **** 노트북 렌트 합니다.")
    public String contents;

}
