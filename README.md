# 가지Garage

- happycoding

## 0116 작업한 내용

- jira 스프린트 작성
- 개발 컨벤션 작성

## 0117 작업 내용

- 현대자동차 코딩테스트

  - 1번 Hash문제, 2번 간단한 조합문제, 3번 입력 10^18 수학 문제

- JPA Repository 사용법

  - **JpaRepository의 메소드 명명 규칙**

    JpaRepository는 메소드 이름 작성 방법만 알다면, 필요한 메소드를 빠르게 쓰고 추가할 수 있다. 처리는 코드 일체 필요 없다. 단지, 메소드 선언문만 있으면 된다. 단지, 미리 정해진 룰에 따라 제대로 메소드 이름을 붙이기만 하면 된다. 적당히 이름을 붙이는 것만으로 메소드가 자동 생성이 되는 것이다.

    그럼, 어떤 형태로 메소드 이름을 붙이면 되는지 대해, 여기에 그 이름 지정 규칙에 대해 간략하게 정리하면 아래와 같다

  - **findByXX**

    기본은 이것입니다. "findBy" 이후에 엔티티의 속성 이름을 붙이다. 이 속성 이름은 첫 글자는 대문자로 한다. 예를 들어, name 검색한다면 "findByName"이며, mail에서 찾는다면 "findByMail"가 된다.

    이 다음에는 기본형인 'findByXX" 이후에 계속 이어서 쓰면 된다.

  - **Like / NotLike**

    "퍼지 검색"에 관한 것이다. Like를 붙이면, 인수에 지정된 텍스트를 포함하는 엔티티를 검색한다. 또한 NotLike을 쓰면 인수의 텍스트를 포함하지 않는 것을 검색한다. "findByNameLike"이라면, name에서 인수의 텍스트를 퍼지 검색한다.

  - **StartingWith / EndingWith**

    텍스트 값에서 인수에 지정된 텍스트로 시작하거나 끝나는 것을 검색하기 위한 것이다. findByNameStartingWith("A")이라면, name의 값이 "A"로 시작하는 항목을 검색한다.

  - **IsNull / IsNotNull**

    값이 null이 거나, 혹은 null이 아닌 것을 검색한다. 인수는 필요없다. "findByNameIsNull()"이라면, name의 값이 null의 것만 검색한다.

  - **True / False**

    부울 값으로 true 인 것, 혹은 false 인 것을 검색한다. 인수는 필요없다. "findByCheckTrue()"이라면, check라는 항목이 true 인 것만을 검색한다.

  - **Before / After**

    시간 값으로 사용한다. 인수에 지정한 값보다 이전의 것, 혹은 이후 것을 검색한다. "findByCreateBefore(new Date())"라고 하면, create라는 항목의 값이 현재보다 이전의 것만을 찾는다 (create가 Date 인 경우).

  - **LessThan / GreaterThan**

    숫자 값으로 사용한다. 그 항목의 값이 인수보다 작거나 큰 것을 검색한다. "findByAgeLessThan(20)"이라면, age의 값이 20보다 작은 것을 찾는다.

  - **Between**

    두 값을 인수로 가지고 그 두 값 사이의 것을 검색한다. 예를 들어, "findByAgeBetween(10, 20)"라고 한다면 age 값이 10 이상 20 이하인 것을 검색한다. 수치뿐만 아니라 시간의 항목 등에도 사용할 수 있다.

  - **Example**

    ```java
    package com.devkuma.spring.db;

    import java.util.List;

    import org.springframework.data.jpa.repository.JpaRepository;
    import org.springframework.stereotype.Repository;

    @Repository
    public interface SampleEntityRepository
            extends JpaRepository<SampleEntity, Long> {

        // Name의 값이 "String"인 값을 검색한다.
        public List<SampleEntity> findByNameLike(String name);
        // Mail의 값이 "String"로 끝나는 항목을 검색한다.
        public List<SampleEntity> findByMailEndingWith(String mail);
    }

    ```

    **name으로 검색**

    ```java
    List list1 = repository.findByNameLike("%ko");
    ```

    **검색 결과 :**

    ```java
    SampleEntity [id=2, name=hanako, mail=hanako@flower.uk]
    SampleEntity [id=4, name=sachiko, mail=sachico@happy.com]
    ```

    **mail로 검색**

    ```java
    List list2 = repository.findByMailEndingWith(".com");
    ```

    **검색 결과 :**

    ```java
    SampleEntity [id=1, name=tuyano, mail=syoda@tuyano.com]
    SampleEntity [id=4, name=sachiko, mail=sachico@happy.com]
    ```

## 0118 작업내용

- API 명세서 작성(유저, 방)
- 유저 CRUD
- jpa db 테이블에 맞춰서 Entity 작성
  유저 Create 테스트
  ![Jpa DB](https://lab.ssafy.com/s08-webmobile1-sub2/S08P12B105/uploads/ad95aa10da16508c511ba227e6ec79d9/image.png)
- JPA Auditing 적용 및 UserController에 Logger 적용

- **JPA Auditing으로 생성/수정 시간 자동 저장하기 적용**
  https://cceeun.tistory.com/162

## 0119 작업내용

- API 명세서 수정
- 회원관리 email, nickname 중복 체크 Rest APi 추가
- React 통합 빌드 테스트 성공
- 웹 소켓 참고할 곳
  https://learnote-dev.com/java/Spring-%EA%B2%8C%EC%8B%9C%ED%8C%90-API-%EB%A7%8C%EB%93%A4%EA%B8%B0-webSocket%EC%9C%BC%EB%A1%9C-%EC%B1%84%ED%8C%85%EC%84%9C%EB%B2%84-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0/

## 0120 작업내용

- 통합 빌드 수정 완료 및 리소스 참조 수정
- 회원 정보 Patch 추가
- jwt refresh token 알아보기

## 0123 작업내용

- Kurento 미디어 서버 개인 ec2에 올리기 성공
- WebRTC 튜토리얼 코드 실행 성공
  ![성공](https://lab.ssafy.com/s08-webmobile1-sub2/S08P12B105/uploads/1d70f5cd2cce6139b41d901b3145b388/image.png)
  - 참고 URL https://scshim.tistory.com/6

## 0125 작업내용

- 중간발표 PPT 작성(기술 스택, 피드백)
- Docker에 OpenVidu 설치 및 튜토리얼 소스 실행

## 0126 작업내용

- JPA DB Entity 작성
  - @ManyOne 등 사용하여 1대N 구성
  - 복합키는 어려워서 아직 미 진행
- WebRTC API 구현중 QueryDSL 동적쿼리 때문에 공부하고 진행중
- 중간 발표 피드백

## 0127 작업내용

- 젠킨스 빌드 성공
- docker-compose 작성해서 mysql, adminer, project 도커 실행 성공
  - project -> mysql 연결 중 에러 발생
    - 2002 connection confused 아직 미해결

## 0128 작업내용

- 깃랩 웹훅 연결 성공
- jenkins shell 사용해서 자동으로 docker-compose down, up 성공
- 프론트 백엔드 통합빌드 배포 성공
- 순서
  - 깃 푸시 ->(웹훅) jenkins ->(npm 설치, gradle 빌드 /var/jenkins/workspace/Eggplantgarage에서 build/libs/\*.jar파일 생성, shell에서 docker compose down, up 진행) 도커에 이미지 올라가서 배포
- Nginx docker-compose에 추가
  - 프록시 설정 완료
  - 80 -> 8000 포트 포워딩 완료

## 0129 작업내용

- Nginx에 letsencrypt SSL 적용
  - docker-compoise로 작업 완료
  - https 인증 적용 확인
- Spring boot, key 생성해서 ssl 적용
  - Nginx 443 포트포워딩해서 연결되는거 확인
  - 나중에 spring 컨테이너 ports 닫고 expose로만 사용하기
  - openvidu ssl 발급받고 똑같이 적용하기

## 0130 작업내용

- WebRTC Rest-api 방 생성 추가
- 도커 컴포즈 수정

## 0131 작업내용

- 방 정보 상세보기 기능 구현
  - 방 생성에서 이미지 올리기 기능 구현

## 0201 작업내용

- Live API 방 생성에서 카테고리, 이미지 분리하여 구현
  - 방 상세보기에서 상품 상세보기도 추가해야 함
  - 빌더 패턴 적용
- jenkins docker-compose up 문제점 확인 완료 -> 젠킨스에서 값은 그대로 있지만 docker-dompose up 하면 적용이 안됨

## 0203 작업내용

- 배포 Openvidu SSL 추가
- 방 상세보기 변경, 위치 수정

  방 상세보기 상품리스트 추가, [live] location -> 위도, 경도 수정,
  방 상세보기 API url->sessionId 검색
  이미지 불러오기 아직 미완

## 0206 작업 내용

- 라이브 전체보기에 검색기능 추가
  - 카테고리, 제목, (위도, 경도) 5km 이내로 검색하기 추가
  - 카테고리 sql문 생성
- 젠킨스 폴더 제거후 docker-compose test 해보기

## 0207 작업 내용

찜 추가 - 완료
url 중복체크 -> 세션 중복 체크 - 완료
찜 조회 - 완료
찜 삭제 - 완료
라이브 끝나면 찜도 삭제 - 완료
카카오 키 설정하기 - 완료
방 생성할 때 liveId return하기 - 완료
유저인포에 long id 추가 - 완료
방 생성 세션 아디로 변경 - 완료
방 썸네일 이미지 세션 아디로 변경 - 완료
방 카테고리 세션 아디로 변경 - 완료

시청자별, 거리별 정렬
[]
