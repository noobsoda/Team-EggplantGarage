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
