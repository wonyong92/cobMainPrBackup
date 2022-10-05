package com.team23.mainPr.Domain.Picture.Service;

import com.team23.mainPr.Domain.Picture.Entity.Picture;
import com.team23.mainPr.Domain.Picture.Repository.PictureRepository;
import java.io.File;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class PictureService {

    private final PictureRepository pictureRepository;
    @Value("${multipart.upload.path}") String uploadPath;

    public void setDefaultImage() throws Exception {
        File f = new File(System.getProperty("user.home") + uploadPath + "defaultProfileImage.png");
        if (!f.exists()) {
            throw new Exception("기본 프로필 이미지 파일이 존재하지 않습니다.");
        }
        if (pictureRepository.count() == 0) {
            Picture defaultImage = new Picture();
            defaultImage.setFileName("defaultProfileImage.png");
            pictureRepository.save(defaultImage);
        }
    }
}
