package com.team23.mainPr.Domain.Picture.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.team23.mainPr.Domain.Picture.Entity.Picture;

public interface PictureRepository extends JpaRepository<Picture, Integer> {
	List<Picture> findByPostId(Integer postId);
}
