package com.team23.mainPr.Domain.Comment.Repository;

import com.team23.mainPr.Domain.Comment.Entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    List<Comment> findAllByTargetPostId(Integer targetPostId);
}
