package com.team23.mainPr.Domain.RentPost.Dto.Response;

import java.util.List;
import lombok.Data;
import org.springframework.data.domain.Pageable;

@Data
public class PagedRentPostResponseDtos {

    List<RentPostResponseDto> rentPosts;
    Integer pageNumber;

    public PagedRentPostResponseDtos(List<RentPostResponseDto> rentPosts, Pageable pageinfo) {
        this.rentPosts = rentPosts;
        this.pageNumber = pageinfo.getPageNumber();
    }
}