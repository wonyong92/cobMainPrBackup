package com.team23.mainPr.Domain.Comment.Dto.Request;

import lombok.Data;

import java.time.ZonedDateTime;

@Data
public class CreateCommentEntityDto {

    String commentContents;
    Integer writerId;
    Integer targetPostId;
}
