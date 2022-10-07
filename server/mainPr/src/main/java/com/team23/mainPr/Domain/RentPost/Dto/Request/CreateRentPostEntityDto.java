package com.team23.mainPr.Domain.RentPost.Dto.Request;

import io.swagger.annotations.ApiModel;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import lombok.Data;

@ApiModel(description = "게시글 생성에 필요한 데이터를 한번에 모아서 요청", value = "CreateRentPostDto")
@Data
public class CreateRentPostEntityDto {

    @NotNull(message = "게시글 정보가 누락되었습니다.(rentPostContents)") private String rentPostContents;

    @NotNull(message = "게시글 이름 정보가 누락되었습니다.(rentPostName)") private String rentPostName;

    @NotNull(message = "작성자 정보가 누락되었습니다.(writerId)") private Integer writerId;

    @Pattern(regexp = "^(category).*") private String category = "category";

    @NotNull(message = "가격 정보가 누락되었습니다.(rentPrice)") private Integer rentPrice;

    @NotNull(message = "지역 정보가 누락되었습니다.(location)")
    @Pattern(regexp = "^(location).*")
    private String location = "location";
}
