package com.team23.mainPr.Domain.Comment.Dto.Request;

import com.team23.mainPr.Global.Dto.ParentCommonDto;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateCommentEntityDto extends ParentCommonDto {

    @NotNull(message = "댓글 식별자 정보가 누락되었습니다.(commentId)") Integer commentId;
    @NotNull(message = "댓글 내용 정보가 누락되었습니다.(commentContents)") @NotEmpty(message = "commentContents must not be empty") String commentContents;
    @NotNull(message = "작성자 정보가 누락되었습니다.(writerId)") Integer writerId;
}
