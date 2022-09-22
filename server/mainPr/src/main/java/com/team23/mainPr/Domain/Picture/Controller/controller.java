package com.team23.mainPr.Domain.Picture.Controller;

import java.io.IOException;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.team23.mainPr.Domain.Picture.Service.PictureService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/image")
@RequiredArgsConstructor
public class controller {

	private final PictureService pictureService;

	@GetMapping
	public void download() throws IOException {
		pictureService.setDefaultImage();
	}
}
