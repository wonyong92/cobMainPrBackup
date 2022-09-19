package com.team23.mainPr.Domain.Comment.Dto.Request;

import lombok.Data;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
public class CreateCommentEntityDto {
    @NotNull(message = "commentContents must not be null")
    @NotEmpty(message = "commentContents must not be empty")
    String commentContents;
    @NotNull(message = "writerId must not be null")
    Integer writerId;
    @NotNull(message = "writerId must not be null")
    Integer targetPostId;
}
