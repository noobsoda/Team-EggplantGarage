# Project : 가지가라지

This project demonstrates how to port a web application stack consisting of nginx, openvidu, mysql, and myapp using Jenkins and Docker Compose.

## Port Number

---

표 넣기

# Configuration

## Integrated Development Build

---

> 리액트 통합 빌드 설정
>
> `build.gradle`
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
> > `api.config.WebMvcConfig.java`
>
> 리소스 핸들러 매핑 설정
>
> ```java
>    registry.addResourceHandler("/**").addResourceLocations("classpath:/dist/");
> ```
>
> `api.controller.WebController.java`
>
> 리액트 url 라우팅 설정
>
> ```java
>    @GetMapping(value = {"", "/home", "/submit", "/seller/**", "/login", "/signup", "/signupemail", "/search", "/like", "/chat/**", "/mypage", "category"
>    , "infoedit", "liveshowdetail", "writereview", "review", "liveshow/**", "/findpass"})
>    public String forward() {
>        return "forward:/index.html";
>    }
> ```

## Connect to EC2 instance using SSH.

---

> ```
> ssh -i [암호키].pem ubuntu@[도메인]
> ```
>
> Example
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

---

> ```
> sudo apt-get install letsencrypt
> sudo letsencrypt certonly --standalone -d 도메인
> # 발급 경로
> cd /etc/letsencrypt/live/도메인/
> ```

## Docker-compose 설정

---

- Mysql, Integrated Build App, Nginx을 docker compose로 묶어서 배포
  - networks를 사용하여 컨테이너 간의 네트워크를 연결
  - volumes를 통해 컨테이너와 파일 공유

```
version: '3'

services:
  database-mysql:
    container_name: database-mysql
    image: mysql/mysql-server:5.7

    environment:
      MYSQL_ROOT_PASSWORD: 'root'
      MYSQL_ROOT_HOST: '%'
      MYSQL_DATABASE: 'ssafy_web_db'
      TZ: Asia/Seoul

    volumes:
      - ./mysql-init.d:/docker-entrypoint-initdb.d

    ports:
      - '13306:3306'

    command:
      - --character-set-server=utf8
      - --collation-server=utf8_general_ci
    networks:
      - eggplant_network

  application:
    build:
      context: ./backend
      dockerfile: Dockerfile
    restart: always
    container_name: eggplant_app
    ports:
      - 8000:8000
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://database-mysql:3306/ssafy_web_db?useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Seoul&zeroDateTimeBehavior=convertToNull&rewriteBatchedStatements=true
      SPRING_DATASOURCE_USERNAME: root
      SPRING_DATASOURCE_PASSWORD: root
    volumes:
      - ./pictures:/root/pictures
    depends_on:
      - database-mysql
    networks:
      - eggplant_network

  web:
    container_name: nginx
    image: nginx
    ports:
      - "443:443"
    volumes:
      - ./nginx/conf.d:/etc/nginx/conf.d
      - /etc/letsencrypt:/etc/letsencrypt
    depends_on:
      - application
    networks:
      - eggplant_network

networks:
  eggplant_network:

```

## Nginx 설정

---

80포트로 들어오면 443으로 리다이렉트

443포트에 SSL 적용

proxy set_header설정 적용해서 socket통신 에러없이 통신

```


server {
    listen 80;
    server_name i8b105.p.ssafy.io;
    return 301 https://$server_name$request_uri;
}
server {
    listen 443 ssl;
    server_name i8b105.p.ssafy.io;

    ssl_certificate /etc/letsencrypt/live/i8b105.p.ssafy.io/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/i8b105.p.ssafy.io/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;

    location / {
        proxy_pass https://i8b105.p.ssafy.io:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
            proxy_set_header Origin "";

            proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
    }
    location /openlive {
        proxy_pass https://i8b105.p.ssafy.io:8443;

    }

}
```

## Dockerfile

---

openjdk8로 빌드

build/libe안에 있는 jar파일을 app.jar로 복사

ENTRYPOINT에 있는 명령어 실행

```
FROM    openjdk:8-jdk-alpine
ARG     JAR_FILE=build/libs/*.jar
COPY    ${JAR_FILE} app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

## Openvidu 설정

---

## Prerequisites

- Docker
  - Jenkins
- Docker Compose
  - Nginx, Mysql, MyApp, OpenVidu
- Git

## Getting Started

1. Clone this repository to your local machine.
2. Open a terminal in the project root directory and run docker-compose up -d to start the application stack.
3. Open your web browser and go to http://localhost:8000 to access the application.
4. To shut down the application stack, run docker-compose down in the terminal.

## Jenkins Pipeline

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

> 1.  Secret Token에서 토큰을 받기
>
>   <img src = "https://lab.ssafy.com/s08-webmobile1-sub2/S08P12B105/uploads/9ff55f96503b986c6d0c702020143f4e/image.png" width="50%" height="50%"/>
>
> 2.  빌드 웹훅 체크하고 URL 받기
>
>   <img src = "https://lab.ssafy.com/s08-webmobile1-sub2/S08P12B105/uploads/5b6bc13765cb4da547b6ceea308bbe2c/image.png" width="50%" height="50%"/>
>
> 3.  어떤 브랜치에서 받아올지 설정하기
>
> - Example `*/release*` release라는 이름이 붙은 모든 브랜치에 웹훅을 설정 release-1, release-2...
>
>  <img src = "https://lab.ssafy.com/s08-webmobile1-sub2/S08P12B105/uploads/1f217f4bbe170da43011f0b0f43c4945/image.png" width="50%" height="50%"/>
>
> 4.  깃랩 웹훅 설정
>
>   <img src = "https://lab.ssafy.com/s08-webmobile1-sub2/S08P12B105/uploads/2e5c30d8eb910ab3466bebe2690546c4/image.png" width="50%" height="50%"/>
>
> 5.  URL과 Secret Token 설정 후 만약 Push 이벤트가 일어났을 때 어떤 브랜치에서 이벤트가 일어났을 때 보내는지 설정
>
>   <img src = "https://lab.ssafy.com/s08-webmobile1-sub2/S08P12B105/uploads/e90b5f53cc3ec4e2426e19c72283ca3f/image.png" width="50%" height="50%"/>
>
> 6.  Enable SSL verification을 설정한다면 Jenkins에서도 CSRF 설정을 해야한다.
>
> - Jenkins관리 -> Configure Global Security -> CSRF 설정
>
>  <img src = "https://lab.ssafy.com/s08-webmobile1-sub2/S08P12B105/uploads/998a34441469e9fcc7903ae7d92fa7e7/image.png" width="50%" height="50%"/>

## Jenkins Build 설정

> ---
>
> 1.  Jenkins NodeJs 설정
>
>   <img src = "https://lab.ssafy.com/s08-webmobile1-sub2/S08P12B105/uploads/95f1ba21f9ddd3881bbda935dcc4cf5a/image.png" width="25%" height="25%"/>
>
> 2.  Jenkins Gradle 설정
>
>   <img src = "https://lab.ssafy.com/s08-webmobile1-sub2/S08P12B105/uploads/a9520b2a224d5680cf949d51b4009a6c/image.png" width="25%" height="25%"/>
>
> 3.  Jenkins가 NodeJS build중 Eslint에서 뜨는 warning을 오류로 받아들이지 않게 CI 설정
>
>   <img src = "https://lab.ssafy.com/s08-webmobile1-sub2/S08P12B105/uploads/0f066fa0e65a3db0874660a93879a6d9/image.png" width="50%" height="50%"/>

## Configuration

The application stack can be configured using the docker-compose.yml file in the project root directory. This file defines the services that make up the application stack and their configurations.

## Contributing

If you would like to contribute to this project, feel free to submit a pull request. Contributions are always welcome!

## License

This project is licensed under the MIT License.
