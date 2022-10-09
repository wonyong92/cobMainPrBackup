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

  <details>
      <summary>컨벤션</summary>

  - ## 컨벤션
  - 네이밍
    - 대문자 카멜 케이스로 클래스명
    - 소문자 카멜 케이스로 필드(클래스랑 구별이 되도록), 함수, 파라미터, 내부 지역변수 

  - 개행
    - 임포트 아래 두줄
    - 메소드 시그니쳐 아래 한줄
    - 클래스 이름 아래 한줄
    - 필드 선언 부분은 한번에, 아래에 로직 부분 들어가기 전에 한줄
    - 필드랑 로직이 합쳐져 있으면 한개의 블럭으로 만들고 한줄 return 부분 분리
    - return 아래에는 개행 없이, 단독 사용시 가능한 위아래 개행 없이 작성
    - 필드 블록 위아래 개행
    - 가능하면 연관있는 것들끼리(같은 지역변수 공유, 반복문 등) 하나의 블록으로 구성, 위아래 개행 넣기
    - EOF에 NewLine 추가하기

  - 주석 컨벤션(JavaDoc 형식 사용)
    - 일반적인 문자열(설명문)은 html 형식으로 작성
    - @exception : 발생 가능한 예외 정의
    - @throws	코드에서 throw 할 수 있는 예외상황 정의	
    - @param	메소드의 매개변수 / 인자값 설명	
    - @return	반환값	 
    - @deprecated	해당 구현체가 곧 삭제, 업데이트 중단을 의미	
    - @see ```<a href="외부링크 주소">링크 타이틀</a>``` 외부링크 연결 ```See Also: 링크 타이틀 ``` 로 렌더링

  - 클래스 어노테이션
    - 빈설정 어노테이션이 제일 위
    - 경로 맵핑
    - 생성자관련 어노테이션
    - 게터/세터/데이터
    - 스웨거 설정
    - 필드위에 스웨거 설정
    - 개행 없이 바로 붙여서

  - 메소드 파라미터 어노테이션
    - 스웨거 설정 - 한줄로, 설명은 간단히!
    - 맵핑
    - 개행 없이 바로 붙여서

  - 파라미터 어노테이션
    - 파라미터 유형
    - 스웨거 설정(dto의 경우 클래스명을 사용, Integer 와 같은 경우에는 파라미터 변수 이름을 사용)

  - 커밋 말머리
    - feat : 새로운 기능 추가
    - fix : 버그 수정
    - docs : 문서 관련
    - refactor : 코드 리팩토링(고려요소)
    - test : 테스트 관련 코드
    - etc : 사소한 수정(주석 같은)  
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

- ## 기능

  http://3.35.90.143:54130/swagger-ui/index.html#

    - ### COMMENT
      - 댓글 관리 API
      ![image](https://user-images.githubusercontent.com/80381715/194749648-c4b6e789-c158-49a8-9a6e-e86ade905340.png)

    <details>
    <summary>DETAIL</summary>

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

     
  </details>



- ## 데이터베이스 스키마

    https://dbdiagram.io/d/6342a0e3f0018a1c5fc4bfef
    
    ![image](https://user-images.githubusercontent.com/80381715/194754114-40574617-9c10-4af2-8f80-1c3444accf19.png)


    ### 1. RENT POST TABLE
     ![image](https://user-images.githubusercontent.com/80381715/194748475-88bd95cc-21dd-4840-ae41-6a4a9e3d8842.png)
  
    ### 2. COMMENT TABLE
     ![image](https://user-images.githubusercontent.com/80381715/194751082-808e7927-f846-4d10-b9c2-09a01eb2b2d0.png)
    
    ### 3. MEMBER TABLE
     ![image](https://user-images.githubusercontent.com/80381715/194751096-a928d68a-a253-41fc-a9ae-72bb88d8b1ff.png)
      
    ### 4. LOGIN TABLE
     ![image](https://user-images.githubusercontent.com/80381715/194751112-b67247e0-50c9-42a6-a47c-7adf81a2b48f.png)
    ### 5. PICTURE TABLE
     ![image](https://user-images.githubusercontent.com/80381715/194751452-1aed9dda-48f8-4e41-94b1-74eec1af0ebf.png)


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


    
 
     


