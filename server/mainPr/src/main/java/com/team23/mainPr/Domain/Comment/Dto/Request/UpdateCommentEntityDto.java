package com.team23.mainPr.Domain.Comment.Dto.Request;

import lombok.Data;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;


@Data
public class UpdateCommentEntityDto {
     @NotNull(message = "commentId must not be null")
    Integer commentId;
     @NotNull(message = "commentContents must not be null")
     @NotEmpty(message = "commentContents must not be empty")
    String commentContents;
}
