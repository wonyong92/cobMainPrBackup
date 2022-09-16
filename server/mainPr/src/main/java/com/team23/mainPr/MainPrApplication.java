package com.team23.mainPr;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.ZoneId;

import static com.team23.mainPr.Enum.TimeZone.ASIA_SEOUL;

@SpringBootApplication
public class MainPrApplication {
    public static void main(String[] args) {

        SpringApplication.run(MainPrApplication.class, args);
    }    public static final ZoneId DEFAULT_TIME_ZONE = ASIA_SEOUL.getZoneId();


}
