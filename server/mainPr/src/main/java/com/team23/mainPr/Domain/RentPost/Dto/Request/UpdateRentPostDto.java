package com.team23.mainPr.Domain.RentPost.Dto.Request;

import com.team23.mainPr.Domain.RentPost.Entity.RentPost;
import io.swagger.annotations.ApiModel;
import javax.validation.constraints.NotNull;
import lombok.Data;

@ApiModel(description = "게시글 수정에 필요한 데이터를 한번에 모아서 요청", value = "UpdateRentPostDto")
@Data
public class UpdateRentPostDto {

    @NotNull(message = "게시글 식별자 정보가 누락되었습니다.(postId)")
    private Integer postId;
    @NotNull(message = "게시글 정보가 누락되었습니다.(rentPostContents)")
    private String rentPostContents;
    @NotNull(message = "게시글 이름 정보가 누락되었습니다.(rentPostName)")
    private String rentPostName;
    private Boolean rentStatus = false;
    private Integer rentPrice;
    private String location;

    public RentPost updateData(RentPost rentPost, UpdateRentPostDto dto) {

        rentPost.setRentPostName(dto.getRentPostName());
        rentPost.setRentPostContents(dto.getRentPostContents());
        rentPost.setRentStatus(dto.getRentStatus());
        rentPost.setRentPrice(dto.getRentPrice());
        rentPost.setLocation(dto.getLocation());
        return rentPost;
    }
}
