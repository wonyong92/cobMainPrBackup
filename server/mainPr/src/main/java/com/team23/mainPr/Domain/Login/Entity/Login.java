package com.team23.mainPr.Domain.Login.Entity;

import java.time.ZonedDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
public class Login {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer loginId;

    Integer memberId;
    @Column(columnDefinition="varchar(1000)")
    String token;
    @UpdateTimestamp ZonedDateTime lastLoginDate;
    ZonedDateTime logoutDate;
    Boolean logouted;
}
