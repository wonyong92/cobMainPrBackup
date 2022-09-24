package com.team23.mainPr.Domain.Comment.Entity;

import java.time.ZonedDateTime;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

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
