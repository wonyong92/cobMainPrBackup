package com.team23.mainPr.Config.Swagger;

import static springfox.documentation.builders.PathSelectors.regex;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.PageRequest;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger.web.DocExpansion;
import springfox.documentation.swagger.web.UiConfiguration;
import springfox.documentation.swagger.web.UiConfigurationBuilder;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

    /**
     * <pre>
     * .paths(regex("/(user|profile|RentPost)/.*")) : 스웨거에 여러 path 추가하기
     * </pre>
     */

    @Bean
    public Docket restAPI() {
        return new Docket(DocumentationType.SWAGGER_2).apiInfo(apiInfo()).useDefaultResponseMessages(false).ignoredParameterTypes(PageRequest.class).select().paths(regex("/(member|rentPost|login|rentHistory|logout|comment).*"))//스웨거에 여러 path 추가하기
            .apis(RequestHandlerSelectors.basePackage("com.team23.mainPr")).build();
    }

    /**
     * <pre>
     * 3자리 version의 의미 : 배포.개발.패치
     * </pre>
     */

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder().title("Team 23 Main Pr BackEnd Api docs").version("0.1.1").description("author : Jang won yong").build();
    }

    /*
     * ETC : 스웨거 api 전체 열기 상태를 기본값으로 설정
     * */

    @Bean
    UiConfiguration uiConfig() {
        return UiConfigurationBuilder.builder().docExpansion(DocExpansion.FULL) // or DocExpansion.NONE or DocExpansion.FULL
            .build();
    }
}
