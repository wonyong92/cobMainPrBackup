package com.team23.mainPr;

import com.team23.mainPr.Domain.Picture.Service.PictureService;
import com.team23.mainPr.Domain.RentPost.Repository.RentPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class MainPrApplication {

    @Autowired PictureService pictureService;

    public static void main(String[] args) {
        SpringApplication.run(MainPrApplication.class, args);
    }

    @Bean
    public CommandLineRunner test(RentPostRepository rentPostRepository) {

        return args -> {
            //rentPostRepository.ftInit();
            pictureService.setDefaultImage();
        };
    }
}
