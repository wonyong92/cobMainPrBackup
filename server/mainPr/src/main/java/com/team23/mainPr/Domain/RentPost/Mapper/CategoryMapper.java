package com.team23.mainPr.Domain.RentPost.Mapper;

import com.team23.mainPr.Domain.RentPost.Dto.Response.CategoryResponseDto;
import com.team23.mainPr.Domain.RentPost.Entity.Category;
import com.team23.mainPr.Domain.RentPost.Repository.CategoryRepository;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

    CategoryResponseDto CategoryToCategoryResponseDto(Category category);
}
