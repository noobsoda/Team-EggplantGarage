- Intellij 초기 설정

  - 자동 빌드 설정

    1. build.gradle(또는 pom.xml)에 spring-boot-devtools 의존성 추가
       spring.devtools.livereload.enabled는 기본적으로 true로 설정됩니다.

    2. Preferences - Build, Execution, Deployment - Compiler"에서 "Build project automatically" 체크
       ![오토](https://lab.ssafy.com/s08-webmobile1-sub1/S08P11B105/uploads/c4397f72a15221b86d0e0186c78466aa/image.png)

    3. "Preferences - Advanced Settings"에서 Compiler - "Allow auto-make to start even if deployed application is currently running" 체크
       (이전 버전까지는 registry - "compiler.automake.allow.when.app.running"을 수정해야 했습니다)
       ![오토](https://lab.ssafy.com/s08-webmobile1-sub1/S08P11B105/uploads/41b2c854904f062aecab009a82e4e2f3/image.png)

    4. 브라우저에서 새로고침할 때 캐시 지우고 새로 고치기 (크롬이면 cmd + shift + R)
       이렇게하면 저장할 시 자동으로 빌드

    5. ![인텔리 자동 빌드](https://lab.ssafy.com/s08-webmobile1-sub2/S08P12B105/uploads/6a5e5ccb07ba71d26fa785b309c110c9/image.png)

    - JWT Post 보내는법

![JWT](https://lab.ssafy.com/s08-webmobile1-sub1/S08P11B105/uploads/29f724bdb93b39241daee025ed5a3ca4/image.png)

Key : AUTHORIZATION

VALUE : Bearer JWT Token

헤더 이름은 AUTHORIZATION이여야 하고
VALUE 앞에 Bearer 를 붙여야 한다.
