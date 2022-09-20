package com.team23.mainPr.Domain.RentPost.Dto.Request;

import com.team23.mainPr.Domain.RentPost.Entity.RentPost;
import io.swagger.annotations.ApiModel;
import lombok.Data;

@ApiModel(description = "게시글 수정에 필요한 데이터를 한번에 모아서 요청", value = "UpdateRentPostDto")
@Data
public class UpdateRentPostDto {

    private String rentPostContents;
    private String rentPostName;
    private Boolean rentStatus = false;

    public RentPost updateData(RentPost rentPost, UpdateRentPostDto dto) {

        rentPost.setRentPostName(dto.getRentPostName());
        rentPost.setRentPostContents(dto.getRentPostContents());
        rentPost.setRentStatus(dto.getRentStatus());

        return rentPost;
    }
}

