package com.team23.mainPr.Swagger;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger.web.DocExpansion;
import springfox.documentation.swagger.web.UiConfiguration;
import springfox.documentation.swagger.web.UiConfigurationBuilder;
import springfox.documentation.swagger2.annotations.EnableSwagger2;
import static springfox.documentation.builders.PathSelectors.regex;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

    /*
    * description : .paths(regex("/(user|profile|RentPost)/.*")) : 스웨거에 여러 path 추가하기
    * */

    @Bean
    public Docket restAPI() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .useDefaultResponseMessages(false)
                .select()
                .apis(RequestHandlerSelectors.any())
                .paths(regex("/(member|profile|RentPost)/.*"))//스웨거에 여러 path 추가하기
                .apis(RequestHandlerSelectors.withClassAnnotation(RestController.class))
                .build();
    }

    /*
    * ETC : 3자리 version의 의미 : 배포.개발.패치
    * */

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("Team 23 Main Pr BackEnd Api docs")
                .version("0.1.1")
                .description("author : Jang won yong")
                .build();
    }

    @Bean
    UiConfiguration uiConfig() {
        return UiConfigurationBuilder.builder()
                .docExpansion(DocExpansion.FULL) // or DocExpansion.NONE or DocExpansion.FULL
                .build();
    }

}
