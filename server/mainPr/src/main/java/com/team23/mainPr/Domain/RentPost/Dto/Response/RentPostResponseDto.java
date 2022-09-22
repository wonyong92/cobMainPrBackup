package com.team23.mainPr.Domain.RentPost.Dto.Response;

import java.time.ZonedDateTime;

import lombok.Data;

@Data
public class RentPostResponseDto {

	private Integer rentPostId;
	private String rentPostContents;
	private String rentPostName;
	private ZonedDateTime writeDate;
	private ZonedDateTime updateDate;
	private Integer writerId;
	private Integer viewCount;
	private String category;
}
