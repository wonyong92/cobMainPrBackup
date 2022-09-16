package com.team23.mainPr.RentPost.Mapper;

import com.team23.mainPr.RentPost.Dto.RentPostResponse;
import com.team23.mainPr.RentPost.Entity.RentPost;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RentPostMapper {
    RentPostResponse RentPostToRentPostResponse(RentPost rentPost);
}
