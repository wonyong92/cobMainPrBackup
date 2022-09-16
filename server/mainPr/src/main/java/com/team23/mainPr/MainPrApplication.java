package com.team23.mainPr;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationProperties;

@SpringBootApplication
@ConfigurationProperties(prefix = "timeZone.location")
public class MainPrApplication {

    public static void main(String[] args) {
        SpringApplication.run(MainPrApplication.class, args);
    }
}
