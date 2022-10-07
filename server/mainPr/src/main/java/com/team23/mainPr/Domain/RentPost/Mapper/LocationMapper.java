package com.team23.mainPr.Domain.RentPost.Mapper;

import com.team23.mainPr.Domain.RentPost.Dto.Response.CategoryResponseDto;
import com.team23.mainPr.Domain.RentPost.Dto.Response.LocationResponseDto;
import com.team23.mainPr.Domain.RentPost.Entity.Category;
import com.team23.mainPr.Domain.RentPost.Entity.Location;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface LocationMapper {

    LocationResponseDto LocationToLocationResponseDto(Location location);
}
