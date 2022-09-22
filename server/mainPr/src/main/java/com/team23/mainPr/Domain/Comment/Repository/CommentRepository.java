package com.team23.mainPr.Domain.Comment.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.team23.mainPr.Domain.Comment.Entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
	List<Comment> findAllByTargetPostId(Integer targetPostId);
}
