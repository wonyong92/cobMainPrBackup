package com.team23.mainPr.Domain.Picture.Service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.team23.mainPr.Domain.Picture.Dto.S3ResponseDto;
import com.team23.mainPr.Domain.Picture.Entity.Picture;
import com.team23.mainPr.Domain.Picture.Repository.PictureRepository;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@Transactional
@RequiredArgsConstructor
public class PictureService {

    private final PictureRepository pictureRepository;
    private final AmazonS3 amazonS3;
    @Value("${multipart.upload.path}") String uploadPath;
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

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




    public List<S3ResponseDto> upload(List<MultipartFile> files) throws IOException {
        String s3FileName = "";
        ObjectMetadata objMeta = new ObjectMetadata();
        Picture pic = new Picture();
        List<S3ResponseDto> dtos = new ArrayList<>();
        for(MultipartFile multipartFile:files)
        {
            s3FileName = UUID.randomUUID() + "-" + multipartFile.getOriginalFilename();
            objMeta.setContentType(multipartFile.getContentType());
            objMeta.setContentLength(multipartFile.getInputStream().available());
            amazonS3.putObject(bucket, s3FileName, multipartFile.getInputStream(), objMeta);
            pic.setFileName(amazonS3.getUrl(bucket, s3FileName).toString());
            pic.setRentPostId(2);
            dtos.add(new S3ResponseDto(pictureRepository.save(pic).getPictureId(),amazonS3.getUrl(bucket, s3FileName).toString()));
            pic = new Picture();

        }
        return dtos;
    }

}
