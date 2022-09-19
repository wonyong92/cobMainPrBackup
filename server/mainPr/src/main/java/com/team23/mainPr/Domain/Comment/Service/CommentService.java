package com.team23.mainPr.Domain.Comment.Service;

import com.team23.mainPr.Domain.Comment.Dto.Request.CreateCommentEntityDto;
import com.team23.mainPr.Domain.Comment.Dto.Request.UpdateCommentEntityDto;
import com.team23.mainPr.Domain.Comment.Dto.Response.CommentEntityResponseDto;
import com.team23.mainPr.Domain.Comment.Entity.Comment;
import com.team23.mainPr.Domain.Comment.Mapper.CommentMapper;
import com.team23.mainPr.Domain.Comment.Repository.CommentRepository;
import com.team23.mainPr.Global.DefaultTimeZone;
import com.team23.mainPr.Global.Dto.ChildCommonDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static com.team23.mainPr.Global.Enum.ChildCommonDtoMsgList.FAIL;
import static com.team23.mainPr.Global.Enum.ChildCommonDtoMsgList.SUCCESS;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentMapper commentMapper;
    private final DefaultTimeZone defaultTimeZone;
    private final CommentRepository commentRepository;

    public ChildCommonDto<CommentEntityResponseDto> createCommentEntity(CreateCommentEntityDto createCommentEntityDto) {
        if(createCommentEntityDto.getCommentContents()==null || createCommentEntityDto.getCommentContents().length()==0||createCommentEntityDto.getWriterId()==null||createCommentEntityDto.getTargetPostId()==null)
            return new ChildCommonDto<>(FAIL.getMsg(), null, null);
        Comment newComment = commentMapper.CreateCommentEntityToCommentEntity(createCommentEntityDto);
        newComment.setWriteDate(defaultTimeZone.getNow());
        newComment.setUpdateDate(defaultTimeZone.getNow());

        Comment result = commentRepository.save(newComment);

        if (result.getCommentId() != null) {
            return new ChildCommonDto<>(SUCCESS.getMsg(), null, commentMapper.CommentEntityToCommentResponsDto(result));
        } else
            return new ChildCommonDto<>(FAIL.getMsg(), null, null);
    }

    public ChildCommonDto<CommentEntityResponseDto> getComment(Integer commentId) {
        Comment findComment = commentRepository.getReferenceById(commentId);

        return new ChildCommonDto<>(SUCCESS.getMsg(), null, commentMapper.CommentEntityToCommentResponsDto(findComment));
    }

    public ChildCommonDto<CommentEntityResponseDto> updateCommentEntity(UpdateCommentEntityDto updateCommentEntityDto) {

        if (updateCommentEntityDto.getCommentContents().equals("") || updateCommentEntityDto.getCommentId() == null)
            return new ChildCommonDto<>(FAIL.getMsg(), null, null);

        Comment findComment = commentRepository.getReferenceById(updateCommentEntityDto.getCommentId());
        findComment.setCommentContents(updateCommentEntityDto.getCommentContents());
        commentRepository.flush();

        return new ChildCommonDto<>(SUCCESS.getMsg(), null, commentMapper.CommentEntityToCommentResponsDto(findComment));
    }

    public ChildCommonDto<CommentEntityResponseDto> deleteCommentEntity(Integer commentId) {

        Comment findComment = commentRepository.getReferenceById(commentId);

        commentRepository.delete(findComment);

        return new ChildCommonDto<>(SUCCESS.getMsg(), null, null);
    }
}
