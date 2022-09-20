package com.team23.mainPr.Domain.Picture.Repository;

import com.team23.mainPr.Domain.Picture.Entity.Picture;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PictureRepository extends JpaRepository<Picture, Integer> {
    List<Picture> findByPostId(Integer postId);
}
