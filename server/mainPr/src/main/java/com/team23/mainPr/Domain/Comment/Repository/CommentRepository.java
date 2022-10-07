package com.team23.mainPr.Domain.Comment.Repository;

import com.team23.mainPr.Domain.Comment.Entity.Comment;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

    List<Comment> findAllByTargetPostId(Integer targetPostId);

    List<Comment> findByWriterId(Integer memberId);
}
