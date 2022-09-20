package com.team23.mainPr.Domain.Comment.Entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.ZonedDateTime;

@Entity
@Setter
@Getter
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer commentId;
    String commentContents;
    ZonedDateTime writeDate;
    ZonedDateTime updateDate;
    Integer writerId;
    Integer targetPostId;

}
