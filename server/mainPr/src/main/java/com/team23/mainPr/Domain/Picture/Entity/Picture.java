package com.team23.mainPr.Domain.Picture.Entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Picture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer imageId;

    String fileName;
    Integer postId;

    public Picture(String fileName) {
        this.fileName = fileName;
    }

    public Picture(String fileName, Integer postId) {

        this.fileName = fileName;
        this.postId = postId;
    }
}
