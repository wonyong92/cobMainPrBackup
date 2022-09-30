package com.team23.mainPr.Domain.Picture.Repository;

import com.team23.mainPr.Domain.Picture.Entity.Picture;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PictureRepository extends JpaRepository<Picture, Integer> {

    List<Picture> findByRentPostId(Integer postId);
}
