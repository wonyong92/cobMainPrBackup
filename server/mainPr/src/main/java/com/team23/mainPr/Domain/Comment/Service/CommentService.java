package com.team23.mainPr.Domain.Comment.Service;

import static com.team23.mainPr.Global.Enum.ChildCommonDtoMsgList.*;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.team23.mainPr.Domain.Comment.Dto.Request.CreateCommentEntityDto;
import com.team23.mainPr.Domain.Comment.Dto.Request.UpdateCommentEntityDto;
import com.team23.mainPr.Domain.Comment.Dto.Response.CommentEntityResponseDto;
import com.team23.mainPr.Domain.Comment.Dto.Response.CommentEntityResponseDtos;
import com.team23.mainPr.Domain.Comment.Entity.Comment;
import com.team23.mainPr.Domain.Comment.Mapper.CommentMapper;
import com.team23.mainPr.Domain.Comment.Repository.CommentRepository;
import com.team23.mainPr.Global.DefaultTimeZone;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentService {

	private final CommentMapper commentMapper;
	private final DefaultTimeZone defaultTimeZone;
	private final CommentRepository commentRepository;

	public CommentEntityResponseDto createCommentEntity(
		CreateCommentEntityDto createCommentEntityDto) {

		Comment newComment = commentMapper.CreateCommentEntityToCommentEntity(createCommentEntityDto);

		Comment result =
			commentRepository.getReferenceById(commentRepository.save(newComment).getCommentId());

		return commentMapper.CommentEntityToCommentResponsDto(result);
	}

	public CommentEntityResponseDto getComment(Integer commentId) {

		Comment findComment = commentRepository.getReferenceById(commentId);

		return commentMapper.CommentEntityToCommentResponsDto(findComment);
	}

	public CommentEntityResponseDto updateCommentEntity(
		UpdateCommentEntityDto updateCommentEntityDto) {

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
		comments.stream()
			.forEach(
				comment ->
					commentResponses.add(commentMapper.CommentEntityToCommentResponsDto(comment)));

		CommentEntityResponseDtos result = new CommentEntityResponseDtos();
		result.setComments(commentResponses);
		// 이전 코드 : 응답하는 리스트의 크키가 0인지 if 문으로 확인해서 , 에러메세지 만들어서 응답 ==> 수정 코드 : 리스트 사이즈가 0이어도 그냥 보낸다. 실제로
		// 데이터가 0개인 거고 정상 동작이므로 200 OK가 맞음. 나머지는 프론트에서 처리해야함.
		return result;
	}
}
