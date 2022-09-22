package com.team23.mainPr.Domain.Picture.Dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FileDto {
	private String uuid; // unique 한 파일 이름을 만들기 위한 속성
	private String fileName; // 실제 파일 이름
	private String contentType;

	public FileDto(String uuid, String fileName, String contentType) {
		this.uuid = uuid;
		this.fileName = fileName;
		this.contentType = contentType;
	}
}
