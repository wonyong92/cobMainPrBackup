package com.team23.mainPr.Domain.Comment.Dto.Response;

import com.team23.mainPr.Global.Dto.ParentCommonDto;
import lombok.Data;
import java.util.List;

@Data
public class CommentEntityResponseDtos extends ParentCommonDto {
    List<CommentEntityResponseDto> comments;
}
