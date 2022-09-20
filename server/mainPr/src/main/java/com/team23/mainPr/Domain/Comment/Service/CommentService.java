package com.team23.mainPr.Domain.Comment.Service;

import com.team23.mainPr.Domain.Comment.Dto.Request.CreateCommentEntityDto;
import com.team23.mainPr.Domain.Comment.Dto.Request.UpdateCommentEntityDto;
import com.team23.mainPr.Domain.Comment.Dto.Response.CommentEntityResponseDto;
import com.team23.mainPr.Domain.Comment.Dto.Response.CommentEntityResponseDtos;
import com.team23.mainPr.Domain.Comment.Entity.Comment;
import com.team23.mainPr.Domain.Comment.Mapper.CommentMapper;
import com.team23.mainPr.Domain.Comment.Repository.CommentRepository;
import com.team23.mainPr.Global.DefaultTimeZone;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.team23.mainPr.Global.Enum.ChildCommonDtoMsgList.SUCCESS;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentMapper commentMapper;
    private final DefaultTimeZone defaultTimeZone;
    private final CommentRepository commentRepository;

    public CommentEntityResponseDto createCommentEntity(CreateCommentEntityDto createCommentEntityDto) {

        Comment newComment = commentMapper.CreateCommentEntityToCommentEntity(createCommentEntityDto);
        newComment.setWriteDate(defaultTimeZone.getNow());
        newComment.setUpdateDate(defaultTimeZone.getNow());

        Comment result = commentRepository.getReferenceById(commentRepository.save(newComment).getCommentId());

        return commentMapper.CommentEntityToCommentResponsDto(result);
    }

    public CommentEntityResponseDto getComment(Integer commentId) {

        Comment findComment = commentRepository.getReferenceById(commentId);

        return commentMapper.CommentEntityToCommentResponsDto(findComment);
    }

    public CommentEntityResponseDto updateCommentEntity(UpdateCommentEntityDto updateCommentEntityDto) {

        Comment findComment = commentRepository.getReferenceById(updateCommentEntityDto.getCommentId());
        findComment.setCommentContents(updateCommentEntityDto.getCommentContents());
        commentRepository.flush();

        return commentMapper.CommentEntityToCommentResponsDto(findComment);
    }

    public String deleteCommentEntity(Integer commentId) {

        Comment findComment = commentRepository.getReferenceById(commentId);

        commentRepository.delete(findComment);

        return SUCCESS.getMsg();
    }

    public CommentEntityResponseDtos getComments(Integer targetPostId) {

        List<Comment> comments = commentRepository.findAllByTargetPostId(targetPostId);

        List<CommentEntityResponseDto> commentResponses = new ArrayList<>();
        comments.stream().forEach(comment -> commentResponses.add(commentMapper.CommentEntityToCommentResponsDto(comment)));

        CommentEntityResponseDtos result = new CommentEntityResponseDtos();
        result.setComments(commentResponses);

        return result;
    }
}
