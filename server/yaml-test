swagger: '2.0'
info:
  description: 'author : Jang won yong'
  version: 0.1.1
  title: Team 23 Main Pr BackEnd Api docs
host: 3.39.180.45
basePath: /
tags:
  - name: profile-controller
    description: Profile Controller
  - name: rent-post-controller
    description: Rent Post Controller
paths:
  /RentPost/delete:
    delete:
      tags:
        - rent-post-controller
      summary: 렌트 물품 게시글 삭제.
      description: 데이터베이스에 물품 렌트 글을 확인하여, 게시글 데이터를 삭제하고, 성공 여부를 응답.
      operationId: updateRentPostUsingDELETE
      produces:
        - '*/*'
      parameters:
        - name: postId
          in: query
          description: 게시글 식별 번호.
          required: true
          type: integer
          format: int32
      responses:
        '200':
          description: OK
          schema:
            $ref: '#/definitions/ResponseEntity'
        '204':
          description: No Content
        '401':
          description: Unauthorized
        '403':
          description: Forbidden
  /RentPost/register:
    post:
      tags:
        - rent-post-controller
      summary: 렌트 물품 게시글 등록.
      description: 데이터베이스에 물품 렌트 글을 생성하고, 생성된 게시글 데이터를 응답한다.
      operationId: createRentPostUsingPOST
      consumes:
        - application/json
      produces:
        - '*/*'
      parameters:
        - in: body
          name: CreateRentPostDto
          description: 입력한 렌트 게시글 데이터.
          required: true
          schema:
            $ref: '#/definitions/CreateRentPostDto'
      responses:
        '200':
          description: OK
          schema:
            $ref: '#/definitions/ResponseEntity'
        '201':
          description: Created
        '401':
          description: Unauthorized
        '403':
          description: Forbidden
        '404':
          description: Not Found
  /RentPost/update:
    put:
      tags:
        - rent-post-controller
      summary: 렌트 물품 게시글 업데이트.
      description: 데이터베이스에 물품 렌트 글을 확인하여, 수정 완료한 게시글 데이터를 응답한다.
      operationId: updateRentPostUsingPUT
      consumes:
        - application/json
      produces:
        - '*/*'
      parameters:
        - in: body
          name: CreateRentPostDto
          description: 입력한 게시글 데이터.
          required: true
          schema:
            $ref: '#/definitions/CreateRentPostDto'
        - name: postId
          in: query
          description: 게시글 식별 번호.
          required: true
          type: integer
          format: int32
      responses:
        '200':
          description: OK
          schema:
            $ref: '#/definitions/ResponseEntity'
        '201':
          description: Created
        '401':
          description: Unauthorized
        '403':
          description: Forbidden
        '404':
          description: Not Found
  /RentPost/{postId}:
    get:
      tags:
        - rent-post-controller
      summary: 렌트 물품 게시글 조회.
      description: 데이터베이스에 물품 렌트 글을 확인하여, 게시글 정보를 응답.
      operationId: getRentPostUsingGET
      produces:
        - '*/*'
      parameters:
        - name: postId
          in: path
          description: 게시글 식별 번호.
          required: true
          type: integer
          format: int32
      responses:
        '200':
          description: OK
          schema:
            $ref: '#/definitions/ResponseEntity'
        '401':
          description: Unauthorized
        '403':
          description: Forbidden
        '404':
          description: Not Found
  /profile/update:
    put:
      tags:
        - profile-controller
      summary: 프로필 정보 업데이트.
      description: 프로필 식별자 번호, 수정된 프로필 정보를 요청으로 받아, 해당하는 프로필의 데이터를 수정.
      operationId: updateProfileDataUsingPUT
      consumes:
        - application/json
      produces:
        - '*/*'
      parameters:
        - name: profileId
          in: query
          description: 프로필 식별 번호.
          required: true
          type: integer
          format: int32
        - in: body
          name: ProfileUpdateDto
          description: 프로필 업데이트 정보.
          required: true
          schema:
            $ref: '#/definitions/ProfileUpdateDto'
      responses:
        '200':
          description: OK
          schema:
            $ref: '#/definitions/ResponseEntity'
        '201':
          description: Created
        '401':
          description: Unauthorized
        '403':
          description: Forbidden
        '404':
          description: Not Found
  /profile/{profileId}:
    get:
      tags:
        - profile-controller
      summary: 프로필 정보 조회.
      description: 프로필 식별자 번호를 파라미터로 받아, 해당하는 프로필 정보 응답.
      operationId: getProfileDataUsingGET
      produces:
        - '*/*'
      parameters:
        - name: profileId
          in: path
          description: 프로필 식별 번호.
          required: true
          type: integer
          format: int32
      responses:
        '200':
          description: OK
          schema:
            $ref: '#/definitions/ResponseEntity'
        '401':
          description: Unauthorized
        '403':
          description: Forbidden
        '404':
          description: Not Found
definitions:
  CreateRentPostDto:
    type: object
    properties:
      contents:
        type: string
        example: 삼성 노트북 **** 노트북 렌트 합니다.
        description: Contents
      name:
        type: string
        example: 노트북 렌트 합니다.
        description: Name
    title: CreateRentPostDto
    description: 게시글 생성에 필요한 데이터를 한번에 모아서 요청
  ProfileUpdateDto:
    type: object
    properties:
      about:
        type: string
        example: hello world!
        description: 소개글 변경시
      nickname:
        type: string
        example: nickName5566
        description: 닉네임 변경시
    title: ProfileUpdateDto
    description: 수정할 프로필 데이터를 dto 객체로 한번에 요청 받기
  ResponseEntity:
    type: object
    properties:
      body:
        type: object
      statusCode:
        type: string
        enum:
          - ACCEPTED
          - ALREADY_REPORTED
          - BAD_GATEWAY
          - BAD_REQUEST
          - BANDWIDTH_LIMIT_EXCEEDED
          - CHECKPOINT
          - CONFLICT
          - CONTINUE
          - CREATED
          - DESTINATION_LOCKED
          - EXPECTATION_FAILED
          - FAILED_DEPENDENCY
          - FORBIDDEN
          - FOUND
          - GATEWAY_TIMEOUT
          - GONE
          - HTTP_VERSION_NOT_SUPPORTED
          - IM_USED
          - INSUFFICIENT_SPACE_ON_RESOURCE
          - INSUFFICIENT_STORAGE
          - INTERNAL_SERVER_ERROR
          - I_AM_A_TEAPOT
          - LENGTH_REQUIRED
          - LOCKED
          - LOOP_DETECTED
          - METHOD_FAILURE
          - METHOD_NOT_ALLOWED
          - MOVED_PERMANENTLY
          - MOVED_TEMPORARILY
          - MULTIPLE_CHOICES
          - MULTI_STATUS
          - NETWORK_AUTHENTICATION_REQUIRED
          - NON_AUTHORITATIVE_INFORMATION
          - NOT_ACCEPTABLE
          - NOT_EXTENDED
          - NOT_FOUND
          - NOT_IMPLEMENTED
          - NOT_MODIFIED
          - NO_CONTENT
          - OK
          - PARTIAL_CONTENT
          - PAYLOAD_TOO_LARGE
          - PAYMENT_REQUIRED
          - PERMANENT_REDIRECT
          - PRECONDITION_FAILED
          - PRECONDITION_REQUIRED
          - PROCESSING
          - PROXY_AUTHENTICATION_REQUIRED
          - REQUESTED_RANGE_NOT_SATISFIABLE
          - REQUEST_ENTITY_TOO_LARGE
          - REQUEST_HEADER_FIELDS_TOO_LARGE
          - REQUEST_TIMEOUT
          - REQUEST_URI_TOO_LONG
          - RESET_CONTENT
          - SEE_OTHER
          - SERVICE_UNAVAILABLE
          - SWITCHING_PROTOCOLS
          - TEMPORARY_REDIRECT
          - TOO_EARLY
          - TOO_MANY_REQUESTS
          - UNAUTHORIZED
          - UNAVAILABLE_FOR_LEGAL_REASONS
          - UNPROCESSABLE_ENTITY
          - UNSUPPORTED_MEDIA_TYPE
          - UPGRADE_REQUIRED
          - URI_TOO_LONG
          - USE_PROXY
          - VARIANT_ALSO_NEGOTIATES
      statusCodeValue:
        type: integer
        format: int32
    title: ResponseEntity
