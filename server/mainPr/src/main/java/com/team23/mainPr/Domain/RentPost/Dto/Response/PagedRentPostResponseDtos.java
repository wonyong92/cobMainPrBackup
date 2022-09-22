package com.team23.mainPr.Domain.RentPost.Dto.Response;

import java.util.List;

import org.springframework.data.domain.Pageable;

import lombok.Data;

@Data
public class PagedRentPostResponseDtos {
	List<RentPostResponseDto> rentPosts;
	Pageable pageInfo;

	public PagedRentPostResponseDtos(List<RentPostResponseDto> rentPosts, Pageable pageinfo) {
		this.rentPosts = rentPosts;
		this.pageInfo = pageinfo;
	}
}
