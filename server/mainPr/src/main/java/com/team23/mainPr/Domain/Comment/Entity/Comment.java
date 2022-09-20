package com.team23.mainPr.Domain.Comment.Entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

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
    //어노테이션을 이용해서 생성할 때 바로 값이 입력되도록 하였다. 중복 코드를 줄일 수 있었다.
    @CreationTimestamp
    ZonedDateTime writeDate;
    @UpdateTimestamp
    ZonedDateTime updateDate;
    Integer writerId;
    Integer targetPostId;

}
