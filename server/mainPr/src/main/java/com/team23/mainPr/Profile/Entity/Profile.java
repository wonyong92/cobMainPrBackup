package com.team23.mainPr.Profile.Entity;

import lombok.*;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/*
* refactor : @GeneratedValue(strategy = GenerationType.IDENTITY)는 적절하지 않다. - 불필요한 DB 엑세스 발생, 이후 해시값 사용 등 정말 유니크한 값을 만드는 방식을 취해야 한다.
 * */

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    String nickname;

}