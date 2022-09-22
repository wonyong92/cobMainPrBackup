package com.team23.mainPr.Domain.Comment.Entity;

import java.time.ZonedDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
public class Comment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Integer commentId;

	String commentContents;
	@CreationTimestamp
	ZonedDateTime writeDate;
	@UpdateTimestamp
	ZonedDateTime updateDate;
	Integer writerId;
	Integer targetPostId;
}
