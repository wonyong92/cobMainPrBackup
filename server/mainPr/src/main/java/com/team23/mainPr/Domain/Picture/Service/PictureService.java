package com.team23.mainPr.Domain.Picture.Service;

import org.springframework.stereotype.Service;

import com.team23.mainPr.Domain.Picture.Entity.Picture;
import com.team23.mainPr.Domain.Picture.Repository.PictureRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PictureService {

	private final PictureRepository pictureRepository;

	public void setDefaultImage() {
		Picture defaultImage = new Picture();
		defaultImage.setFileName("defaultProfileImage.png");
		pictureRepository.save(defaultImage);
	}
}
