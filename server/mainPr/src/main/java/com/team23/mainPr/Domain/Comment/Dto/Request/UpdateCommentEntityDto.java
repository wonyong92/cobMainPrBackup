package com.team23.mainPr.Domain.Comment.Dto.Request;

import lombok.Data;

@Data
public class UpdateCommentEntityDto {
    Integer commentId;
    String commentContents;
}
