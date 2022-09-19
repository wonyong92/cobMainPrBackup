package com.team23.mainPr.Domain.Comment.Dto.Response;

import com.team23.mainPr.Global.Dto.ParentCommonDto;
import lombok.Data;

import java.time.ZonedDateTime;

@Data
public class CommentEntityResponseDto extends ParentCommonDto {
    Integer commentId;
    String commentContents;
    ZonedDateTime writeDate;
    ZonedDateTime updateDate;
    Integer writerId;
    Integer targetPostId;
}
