package com.team23.mainPr.Domain.RentPost.Dto.Response;

import java.util.List;
import lombok.Data;
import org.springframework.data.domain.Pageable;

@Data
public class PagedRentPostResponseDtos {

    List<RentPostResponseDto> rentPosts;
    Integer pageNumber;
    Integer totalPages;
    Long totalEntity;

    public PagedRentPostResponseDtos(List<RentPostResponseDto> rentPosts, Pageable pageinfo,Integer totalPages,Long totalEntity) {
        this.rentPosts = rentPosts;
        this.pageNumber = pageinfo.getPageNumber();
        this.totalPages = totalPages;
        this.totalEntity = totalEntity;
    }
}
