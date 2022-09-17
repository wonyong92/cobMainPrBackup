package com.team23.mainPr.Login.Entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.ZonedDateTime;

@Entity
public class Login {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer loginId;
    Integer memberId;
    String token;
    ZonedDateTime lastLoginDt;
    ZonedDateTime logoutDt;
    Boolean logouted;
    
}
