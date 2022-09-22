package com.team23.mainPr;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.team23.mainPr.Domain.RentPost.Repository.RentPostRepository;

@SpringBootApplication
public class MainPrApplication {
	public static void main(String[] args) {
		SpringApplication.run(MainPrApplication.class, args);
	}

	@Bean
	public CommandLineRunner test(RentPostRepository rentPostRepository) {
		return args -> {
			rentPostRepository.ftInit();
		};
	}
}
