package com.team23.mainPr.Domain.RentPost.Mapper;

import com.team23.mainPr.Domain.RentPost.Dto.Request.CreateRentPostEntityDto;
import com.team23.mainPr.Domain.RentPost.Dto.Response.PagedRentPostResponseDtos;
import com.team23.mainPr.Domain.RentPost.Dto.Response.RentPostResponseDto;
import com.team23.mainPr.Domain.RentPost.Entity.RentPost;
import java.util.List;
import org.mapstruct.Mapper;
import org.springframework.data.domain.Pageable;

@Mapper(componentModel = "spring")
public interface RentPostMapper {

    RentPostResponseDto RentPostToRentPostResponseDto(RentPost rentPost);

    RentPost CreateRentPostEntityDtoToRentPost(CreateRentPostEntityDto dto);

    default PagedRentPostResponseDtos PagedRentPostToRentPostPagedResponseDto(
        List<RentPostResponseDto> rentPostResponseDtos, Pageable pageinfo) {
        return new PagedRentPostResponseDtos(rentPostResponseDtos, pageinfo);
    }
}
