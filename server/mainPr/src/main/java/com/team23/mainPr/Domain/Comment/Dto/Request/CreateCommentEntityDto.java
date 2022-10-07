package com.team23.mainPr.Domain.Comment.Dto.Request;

import com.team23.mainPr.Global.Dto.ParentCommonDto;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateCommentEntityDto extends ParentCommonDto {

    @NotNull(message = "commentContents must not be null") @NotEmpty(message = "commentContents must not be empty") String commentContents;

    @NotNull(message = "writerId must not be null") Integer writerId;

    @NotNull(message = "writerId must not be null") Integer targetPostId;
}
