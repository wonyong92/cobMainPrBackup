# CODESTATES MAIN PROJECT TEAM 23 BackEnd


- ## 기술 스택

<img src="https://user-images.githubusercontent.com/80381715/194749237-0e0e8117-da2f-4436-950d-fdec443336de.png" width="500" height="300">

  <details>
      <summary>개발 일정</summary>

  - ## 메인 프로젝트 일정

  1. 개발 기간 09/14~09/30
  2. 테스팅, 버그 픽스 10/01~10/05
  3. 전체 테스트 10/05~10/07
  4. 배포 10/07

  - ## 백엔드 개발 일정

  ### 1 주차 ~09/17   
    - ToDo :  
        1. 프로젝트 주제 선정
        2. 도메인 계획
        3. DB 스키마 작성
        4. 리소스 응답용 REST 메소드 작성    
        5. side 기능 확인 및 정의
  ### 2 주차 ~09/24  
    - ToDo :  
      1. 요구 사항 정의서에 따른 컨트롤러 작성 및 서비스 로직 작성

  ### 3 주차 ~10/01  
    - ToDo :  
      1. 리팩토링 및 코드 가독성 최적화 작업

  ### 4 주차 ~10/07
    - ToDo :  
      1. EC2, S3, RDS, DNS, HTTPS 적용 및 배포
  ### 5 주차 ~10/9
    - ToDo :  
      1. 전체 테스팅 및 발표 자료 준비

  </details>

- ## 컨벤션 
  - 네이버 코딩 컨벤션을 적용하였습니다.
    <details>
      <summary>레퍼런스</summary>
      
    - ref : https://nuli.navercorp.com/data/convention/NHN_Coding_Conventions_for_Markup_Languages.pdf
    - ref : https://naver.github.io/hackday-conventions-java/
    </details>

- ## 사용된 프레임워크/라이브러리

  - Spring Boot 2.7.3
  - Azule Open JDK 11
  - OpenApi 3.0.0
  - MySQL 8.0.30
  <details>
      <summary>more</summary>

  - auth0 JWT 4.0.0    
  - Mapstruct 1.4.2
  - assertJ 3.23.1
</details>

- ## 컨트롤러 구현

  http://3.35.90.143:54130/swagger-ui/index.html#
  
    
    - ### COMMENT
      - 댓글 관리 API
     ![image](https://user-images.githubusercontent.com/80381715/194749648-c4b6e789-c158-49a8-9a6e-e86ade905340.png)

    <details>
    <summary>기능 설명</summary>

     ![image](https://user-images.githubusercontent.com/80381715/194750421-8a2328dd-b0bb-4c23-b36a-95ad1b7608f3.png)

    </details>

    - ### LOGIN
      - 로그인 API
      ![image](https://user-images.githubusercontent.com/80381715/194749642-92ac9505-1172-41bc-98a6-31e6b8d16622.png)


  <details>
      <summary>기능 설명</summary>

     ![image](https://user-images.githubusercontent.com/80381715/194750497-32ceaaff-5282-4065-93eb-2eb0f0ce0d29.png)

  </details>

    - ### LOGOUT
      - 로그아웃 API
      ![image](https://user-images.githubusercontent.com/80381715/194749662-e62a0fdc-6f31-4a3d-b95b-5fcc866214d0.png)

  <details>
    <summary>MORE</summary>
    
  <details>
      <summary>기능 설명</summary>

     ![image](https://user-images.githubusercontent.com/80381715/194750503-de9881ca-68e0-4211-9a5e-6b1f50bb5926.png)
  </details>


    - ### MEMBER
      - 회원 정보 관리 API
      ![image](https://user-images.githubusercontent.com/80381715/194749681-1a8e5123-1e4c-4f89-a706-01649fbf9a4b.png)


  <details>
      <summary>기능 설명</summary>

     ![image](https://user-images.githubusercontent.com/80381715/194750581-24f16443-210e-4057-84cd-990a35f47cdc.png)

  </details>


    - ### RENT POST
      - 게시글 관리 API
      ![image](https://user-images.githubusercontent.com/80381715/194749709-c4eaa13f-1bf4-4ed6-9d94-ff4a02d9cb88.png)


  <details>
      <summary>기능 설명</summary>

     ![image](https://user-images.githubusercontent.com/80381715/194765095-2444f17c-0e3a-4d17-83bc-c00c0f094e37.png)

  </details>
</details>


- ## 데이터베이스 스키마

    https://dbdiagram.io/d/6342a0e3f0018a1c5fc4bfef
    
    ![FIINAL_MAIN_PROJECT_DB_SCHEMA](https://user-images.githubusercontent.com/80381715/194764802-3d63c05c-9c9f-4882-b6ff-76e5755b573a.png)



- ## 설계 컨셉
    1. 기초적인 REST API 설계
    3. 불필요한 프레임워크 의존 줄이기(Spring security)
    4. 개발 기간에 맞추어 필요한 기능을 먼저 빠르게 구현 -> 기능 추가 -> 반복
    5. MODEL DRIVEN DESIGN의 적용
    
    
        <img src="https://user-images.githubusercontent.com/80381715/194752666-d1ca5dc8-4b5c-4138-83ee-9b0fd9166929.png" width="450" height="350">
        
        
        ![image](https://user-images.githubusercontent.com/80381715/194753719-57a9ad3f-bca8-4c9e-b296-2a4c04644fca.png)
        
        

    6. 기초적인 레이어드 아키텍쳐 적용
        
        
        <img src="https://user-images.githubusercontent.com/80381715/194753320-01aa6b70-9af9-4619-ae4a-d1fa237bdbfb.png" width="350" height="450">

    7. 컨트롤러 중심의 예외 처리 코드 구현
    
        ![image](https://user-images.githubusercontent.com/80381715/194753873-bd044517-972d-4980-8489-320d7ea24b6c.png)

    8. Spring Validator를 활용한 dto 검증 - 프론트 서버의 요청 검증 후에도 간단한 DTO 검증 필요하다고 판단.
    
        ![image](https://user-images.githubusercontent.com/80381715/194753983-d4e78258-ac41-4bbd-9988-4c8e9ef28958.png) 


    9. JWT에 TTL 설정으로 토큰 탈취에 대하여 최소한의 대비책 마련 - 인터셉터에 토큰 만료 확인 코드 작성
         ![image](https://user-images.githubusercontent.com/80381715/194765018-b2ee2118-230c-42e0-8e63-d78bbd44e412.png)

        
 
     


