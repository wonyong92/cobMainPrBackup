package com.team23.mainPr.Domain.RentPost.Dto.Response;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data

public class CategoryLocationResponseDto {

    private final List<CategoryResponseDto> categories;
    private final List<LocationResponseDto> locations;

}
