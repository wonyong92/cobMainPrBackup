package com.team23.mainPr.Domain.RentPost.Dto.Request;

import io.swagger.annotations.ApiModel;
import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@ApiModel(description = "게시글 생성에 필요한 데이터를 한번에 모아서 요청", value = "CreateRentPostDto")
@Data
public class CreateRentPostEntityDto {

    @NotNull(message = "rentPostContents must not be null")
    private String rentPostContents;
    @NotNull(message = "rentPostName must not be null")
    private String rentPostName;
    @NotNull(message = "writerId must not be null")
    private Integer writerId;
    @Pattern(regexp = "^(category).*")
    private String category = "category";

}
