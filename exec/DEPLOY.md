# Project : 가지가라지

가리가라지 프로젝트의 배포 방식은 Docker Container에 올린 Jenkins를 활용한 CI/CD 자동화 환경으로 구성되어 있습니다.

Webhook이 설정되어 있어 Gitlab 특정 브랜치에 Push한 프로젝트를 통해 미리 설정한 Pipeline 흐름을 통해 Frontend와 Backend를 Gradle로 통합빌드하고 Dockerfile을 통해 Image를 생성한 후 다른 이미지들과 연계되어 Docker compose를 통해 배포하는 방식을 사용하고 있습니다.

## Nginx Port forwarding

| Port | Content              |
| ---- | -------------------- |
| 80   | HTTP 443 Redirect    |
| 443  | HTTPS                |
| 3306 | Mysql 5.7            |
| 3478 | TURN server          |
| 6379 | Redis for openvidu   |
| 8000 | Integrated Build     |
| 8443 | Openvidu server      |
| 8888 | Kurento media server |
| 9090 | Jenkins              |

# Configuration

## Integrated Development Build

> 리액트 통합 빌드 설정
>
> > `build.gradle`
>
> ```
> def frontendDir = "$projectDir/../frontend"
>
> sourceSets {
>    main {
>        resources {
>            srcDirs = ["$projectDir/src/main/resources"]
>        }
>    }
> }
>
> processResources { dependsOn "copyReactBuildFiles" }
>
> task installReact(type: Exec) {
>    workingDir "$frontendDir"
>    inputs.dir "$frontendDir"
>    group = BasePlugin.BUILD_GROUP
>    if (System.getProperty('os.name').toLowerCase(Locale.ROOT).contains('windows')) {
>        commandLine "npm.cmd", "audit", "fix"
>        commandLine 'npm.cmd', 'install'
>    } else {
>        commandLine "npm", "audit", "fix" commandLine 'npm', 'install'
>    }
> }
>
> task buildReact(type: Exec) {
>    dependsOn "installReact"
>    workingDir "$frontendDir"
>    inputs.dir "$frontendDir"
>    group = BasePlugin.BUILD_GROUP
>    if (System.getProperty('os.name').toLowerCase(Locale.ROOT).contains('windows')) {
>        commandLine "npm.cmd", "run-script", "build"
>    } else {
>        commandLine "npm", "run-script", "build"
>    }
> }
>
> task copyReactBuildFiles(type: Copy) {
>    dependsOn "buildReact"
>    from "$frontendDir/build"
>    into "$projectDir/src/main/resources/dist"
> }
> ```
>
> 리소스 핸들러 매핑 설정
>
> > `api.config.WebMvcConfig.java`
>
> ```java
>    registry.addResourceHandler("/**").addResourceLocations("classpath:/dist/");
> ```
>
> 리액트 url 라우팅 설정
>
> > `api.controller.WebController.java`
>
> ```java
>    @GetMapping(value = {"", "/home", "/submit", "/seller/**", "/login", "/signup", "/signupemail", "/search", "/like", "/chat/**", "/mypage", "category"
>    , "infoedit", "liveshowdetail", "writereview", "review", "liveshow/**", "/findpass"})
>    public String forward() {
>        return "forward:/index.html";
>    }
> ```

## Connect to EC2 instance using SSH.

> ```
> ssh -i [암호키].pem ubuntu@[도메인]
> ```
>
> > Example
>
> ```
> ssh -i XXXX.pem ubuntu@XXXXXX.p.XXXXX.io
> ```

## EC2 in Docker And Docker compose Install

---

> ```
> sudo apt-get update
> ```
>
> > install Docker And Docker compose
>
> ```
> sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
> ```
>
> > Docker 설치 확인
>
> ```
> docker -v
> ```
>
> > Docker compose 설치 확인
>
> ```
> docker compose -v
> ```

## How to obtain an SSL certificate with Let's Encrypt

> ```
> sudo apt-get install letsencrypt
> sudo letsencrypt certonly --standalone -d 도메인
> # 발급 경로
> cd /etc/letsencrypt/live/도메인/
> ```

## Docker-compose 설정

> - Mysql, Integrated Build App, Nginx을 docker compose로 묶어서 배포
> - networks를 사용하여 컨테이너 간의 네트워크를 연결
> - volumes를 통해 컨테이너와 파일 공유
>
> ```
> version: '3'
>
> services:
>  database-mysql:
>    container_name: database-mysql
>    image: mysql/mysql-server:5.7
>
>    environment:
>      MYSQL_ROOT_PASSWORD: 'root'
>      MYSQL_ROOT_HOST: '%'
>      MYSQL_DATABASE: 'ssafy_web_db'
>      TZ: Asia/Seoul
>
>    volumes:
>      - ./db/mysql-init.d:/docker-entrypoint-initdb.d
>
>    ports:
>      - '13306:3306'
>
>    command:
>      - --character-set-server=utf8mb4
>      - --collation-server=utf8mb4_unicode_ci
>    networks:
>      - eggplant_network
>
>  application:
>    build:
>      context: ./backend
>      dockerfile: Dockerfile
>    restart: always
>    container_name: eggplant_app
>    ports:
>      - 8000:8000
>    environment:
>      SPRING_DATASOURCE_URL: jdbc:mysql://database-mysql:3306/ssafy_web_db?useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Seoul&zeroDateTimeBehavior=convertToNull&rewriteBatchedStatements=true
>      SPRING_DATASOURCE_USERNAME: root
>      SPRING_DATASOURCE_PASSWORD: root
>      TZ: Asia/Seoul
>    volumes:
>      - ./pictures:/root/pictures
>    depends_on:
>      - database-mysql
>    networks:
>      - eggplant_network
>
>  web:
>    container_name: nginx
>    image: nginx
>    ports:
>      - "80:80"
>      - "443:443"
>    volumes:
>      - ./nginx/conf.d:/etc/nginx/conf.d
>      - /etc/letsencrypt:/etc/letsencrypt
>    depends_on:
>      - application
>    networks:
>      - eggplant_network
>
> networks:
>  eggplant_network:
> ```

> ```
>
> ```

## Nginx 설정

> 80포트로 들어오면 443으로 리다이렉트
>
> 443포트에 SSL 적용
>
> proxy set_header설정 적용해서 socket통신 에러없이 통신
>
> ```
>
>
> server{
>    listen 80;
>    listen [::]:80;
>    server_name i8b105.p.ssafy.io;
>    server_tokens off;
>
>    location / {
>        proxy_pass https://i8b105.p.ssafy.io:8000;
>    }
> }
> server {
>    listen 443 ssl;
>    server_name i8b105.p.ssafy.io;
>
>    ssl_certificate /etc/letsencrypt/live/i8b105.p.ssafy.io/fullchain.pem;
>    ssl_certificate_key /etc/letsencrypt/live/i8b105.p.ssafy.io/privkey.pem;
>    include /etc/letsencrypt/options-ssl-nginx.conf;
>
>    location / {
>        proxy_pass https://i8b105.p.ssafy.io:8000;
>        proxy_http_version 1.1;
>        proxy_set_header Upgrade $http_upgrade;
>        proxy_set_header Connection "upgrade";
>            proxy_set_header Origin "";
>
>            proxy_set_header X-Real-IP $remote_addr;
>        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
>        proxy_set_header Host $http_host;
>    }
>    location /openlive {
>        proxy_pass https://i8b105.p.ssafy.io:8443;
>
>    }
>
> }
> ```

## Dockerfile

> openjdk8로 빌드
>
> build/libe안에 있는 jar파일을 app.jar로 복사
>
> ENTRYPOINT에 있는 명령어 실행
>
> ```
> FROM    openjdk:8-jdk-alpine
> ARG     JAR_FILE=build/libs/*.jar
> COPY    ${JAR_FILE} app.jar
> ENTRYPOINT ["java", "-jar", "/app.jar"]
> ```

## Openvidu Deployment

> openvidu on premises 설정

> openvidu on premises를 사용하면 OpenVidu를 Docker Compose로 관리하는 Docker 컨테이너로 쉽게 배포할 수 있습니다. 설치되는 항목은 다음과 같습니다
>
> - OpenVidu Server (openvidu-server): OpenVidu 플랫폼의 뇌 역할을 합니다. 시그널링 플레인을 담당합니다.
> - Kurento Media Server (kms): OpenVidu 플랫폼의 핵심 역할을 합니다. 미디어 플레인을 담당합니다.
> - Coturn (coturn): 특정 특별한 네트워크에서 브라우저와 미디어 통신을 허용하는 데 사용되는 서버입니다.
> - Redis (redis): Coturn 서버에서 사용자를 관리하는 데 사용되는 데이터베이스입니다.
> - Nginx (nginx): SSL 인증서를 구성하고 OpenVidu Server와 Application을 표준 HTTPS 포트 (443)에서 모두 제공할 수 있도록 하는 리버스 프록시입니다.
> - Videoconference Application (app): OpenVidu Call 애플리케이션 또는 다른 애플리케이션입니다. 선택적으로 사용 가능합니다.
>
> OpenVidu를 배포하려면 루트 권한 필요 EC2에서
>
> ```
> sudo su
> ```
>
> OpenVidu 설치 권장 폴더는 /opt
>
> ```
> cd /opt
> ```
>
> 다음 명령어를 통해 설치 스크립트 다운
>
> ```
> curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_latest.sh | bash
> ```
>
> OpenVidu 폴더로 이동
>
> ```
> cd openvidu
> ```
>
> env 파일 설정
>
> ```
> nano .env
> ```
>
> ```
>
> #DOMAIN_OR_PUBLIC_IP=[도메인]
> Example : xxxxxx.x.xxxxx.io
>
> #OPENVIDU_SECRET=[암호]
> OPENVIDU_SECRET=MY_SECRET
>
>
> #암호화 방식 설정
> CERTIFICATE_TYPE=letsencrypt
>
> #LETSENCRYPT_EMAIL=[이메일]
> LETSENCRYPT_EMAIL=11111@ssafy.edu
>
>
> #80포트를 사용하고 있기 때문에 다른 포트로 설정 포트 충돌 안나게
> HTTP_PORT=100
>
> #openvidu 포트를 8443으로 설정 443은 사용중
> HTTPS_PORT=8443
> ```

# Prerequisites

> - Docker
> - Docker Compose
> - GitLab

### Jenkins Pipeline

> ```
> docker run -d -p 9090:8080 -u root -p 50000:50000 -v /var/jenkins:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock --name jenkins jenkins/jenkins:lts-jdk11
> ```

> 설치 완료 후
> gitlab과 docker를 검색해서 플러그인을 설치후 재시작
>
> Jenkins 컨테이너안에서 도커 설치
>
> ```
> docker exec -it jenkins bash
> ```

> [EC2 도커 설치와 비슷하게 설치](#ec2-in-docker-and-docker-compose-install)

## Jenkins gitlab Webhook

---

> **1. Secret Token에서 토큰을 받기**
>
>   <img src = "https://user-images.githubusercontent.com/76441040/219575983-e4fbdf2b-3601-43c1-8341-e5a20c9d7d9a.png" width="50%" height="50%"/>
>
> **2. 빌드 웹훅 체크하고 URL 받기**
>
>   <img src = "https://user-images.githubusercontent.com/76441040/219576759-fdfc3686-313d-40c7-8c92-97331c0c71b1.png" width="50%" height="50%"/>
>
> **3. 어떤 브랜치에서 받아올지 설정하기**
>
> - Example `*/release*` release라는 이름이 붙은 모든 브랜치에 웹훅을 설정 release-1, release-2...
>
>  <img src = "https://user-images.githubusercontent.com/76441040/219576858-4a391824-393e-444e-8961-abe28ac6ba2d.png" width="50%" height="50%"/>
> **4. 깃랩 웹훅 설정**
>
>   <img src = "https://user-images.githubusercontent.com/76441040/219576968-1d31872c-db87-4851-bcd2-b58c1c3f3da6.png" width="50%" height="50%"/>
>
> **5. URL과 Secret Token 설정 후 만약 Push 이벤트가 일어났을 때 어떤 브랜치에서 이벤트가 일어났을 때 보내는지 설정**
>
>   <img src = "https://user-images.githubusercontent.com/76441040/219577092-d2709dbd-d989-4bcb-afa5-35b735df5751.png" width="50%" height="50%"/>
>
> **6. Enable SSL verification을 설정한다면 Jenkins에서도 CSRF 설정을 해야한다.**
>
> - Jenkins관리 -> Configure Global Security -> CSRF 설정
>
>  <img src = "https://user-images.githubusercontent.com/76441040/219577206-68fdc931-5763-4173-9e1c-095efa703f25.png" width="50%" height="50%"/>

## Jenkins Build 설정

> ---
>
> **1. Jenkins NodeJs 설정**
>
>   <img src = "https://user-images.githubusercontent.com/76441040/219577301-e2775e81-401f-439e-8a62-a455f980244d.png" width="25%" height="25%"/>
>
> **2. Jenkins Gradle 설정**
>
>   <img src = "https://user-images.githubusercontent.com/76441040/219577448-e4d54756-ed8a-47d0-8837-6fb3c2e7c840.png" width="25%" height="25%"/>
>
> **3. Jenkins가 NodeJS build중 Eslint에서 뜨는 warning을 오류로 받아들이지 않게 CI 설정**
>
>   <img src = "https://user-images.githubusercontent.com/76441040/219577571-0feeefc8-21d6-4ce5-8d24-a1afb8ac24f4.png" width="50%" height="50%"/>

## Jenkins shell 설정

> docker-compose down -v
> docker-compose up --build -d

# Getting Started

> 1.  Clone this repository to your local machine.
> 2.  Open a terminal in the project root directory and run docker-compose up -d to start the application stack.
> 3.  Open your web browser and go to http://localhost:8000 to access the application.
> 4.  To shut down the application stack, run docker-compose down in the terminal.
