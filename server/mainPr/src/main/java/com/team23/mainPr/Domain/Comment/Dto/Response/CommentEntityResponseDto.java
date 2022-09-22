package com.team23.mainPr.Domain.Comment.Dto.Response;

import java.time.ZonedDateTime;

import lombok.Data;

@Data
public class CommentEntityResponseDto {

	Integer commentId;
	String commentContents;
	ZonedDateTime writeDate;
	ZonedDateTime updateDate;
	Integer writerId;
	Integer targetPostId;
}
