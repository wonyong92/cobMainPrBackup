package com.team23.mainPr.Member.Entity;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

/*
 * study : timetolive 속성 응용
 * @RedisHash(value = "member")
 * hash : redis colletion 중 하나 - 내부에 여러 key-value를 가진다 - 객체와 가장 유사한 구조
 * convention - 필드명 upper camel case 사용 - application.properties_back 설정 참고
 * RedisHash : 특정 해쉬값을 키, 해당 클래스의 인스턴스를 값으로 적재
 */

@Entity
@Data
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String loginId;
    private String password;
    private String nickname;
    private String email;
    private String phone;
    @CreationTimestamp
    private LocalDateTime createdAt;
    private Integer profileId;

}