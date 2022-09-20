package com.team23.mainPr.Domain.Comment.Dto.Response;

import lombok.Data;

import java.time.ZonedDateTime;

@Data
public class CommentEntityResponseDto {

    Integer commentId;
    String commentContents;
    ZonedDateTime writeDate;
    ZonedDateTime updateDate;
    Integer writerId;
    Integer targetPostId;

}
