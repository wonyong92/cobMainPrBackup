package com.team23.mainPr.Domain.Comment.Mapper;

import com.team23.mainPr.Domain.Comment.Dto.Request.CreateCommentEntityDto;
import com.team23.mainPr.Domain.Comment.Dto.Response.CommentEntityResponseDto;
import com.team23.mainPr.Domain.Comment.Entity.Comment;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CommentMapper {

    Comment CreateCommentEntityToCommentEntity(CreateCommentEntityDto createCommentEntityDto);

    CommentEntityResponseDto CommentEntityToCommentResponsDto(Comment comment);
}
