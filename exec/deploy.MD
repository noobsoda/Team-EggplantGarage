# Project : 가지가라지

This project demonstrates how to port a web application stack consisting of nginx, openvidu, mysql, and myapp using Jenkins and Docker Compose.

## Port Number

---

표 넣기

# Configuration

## Integrated Development Build

---

> > 리액트 통합 빌드 설정

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
> > `api.config.WebMvcConfig.java`
>
> 리소스 핸들러 매핑 설정
>
> ```java
>    registry.addResourceHandler("/**").addResourceLocations("classpath:/dist/");
> ```
>
> > `api.controller.WebController.java`
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

## 도커로 젠킨스 설치

> `docker run -d -p 9090:8080 -u root -p 50000:50000 -v /var/jenkins:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock --name jenkins jenkins/jenkins:lts-jdk11`

> 설치 완료 후
> gitlab과 docker를 검색해서 플러그인을 설치후 재시작
>
> Jenkins 컨테이너안에서 도커 설치
>
> `docker exec -it jenkins bash`
>
> [EC2 도커 설치와 비슷하게 설치](#ec2-in-docker-and-docker-compose-install)

# Jenkins 설정

## Jenkins gitlab Webhook 설정

---

1. Secret Token에서 토큰을 받기

   ![SecretToken얻기](https://lab.ssafy.com/s08-webmobile1-sub2/S08P12B105/uploads/9ff55f96503b986c6d0c702020143f4e/image.png)

2. 빌드 웹훅 체크하고 URL 받기

   ![빌드웹훅URL](https://lab.ssafy.com/s08-webmobile1-sub2/S08P12B105/uploads/5b6bc13765cb4da547b6ceea308bbe2c/image.png)

3. 어떤 브랜치에서 받아올지 설정하기

- Example `*/release*` release라는 이름이 붙은 모든 브랜치에 웹훅을 설정 release-1, release-2...

  ![웹훅브랜치설정](https://lab.ssafy.com/s08-webmobile1-sub2/S08P12B105/uploads/1f217f4bbe170da43011f0b0f43c4945/image.png)

4. 깃랩 웹훅 설정

   ![Webhook설정](https://lab.ssafy.com/s08-webmobile1-sub2/S08P12B105/uploads/2e5c30d8eb910ab3466bebe2690546c4/image.png)

5. URL과 Secret Token 설정 후 만약 Push 이벤트가 일어났을 때 어떤 브랜치에서 이벤트가 일어났을 때 보내는지 설정

   ![SSL설정](https://lab.ssafy.com/s08-webmobile1-sub2/S08P12B105/uploads/uploads/e90b5f53cc3ec4e2426e19c72283ca3f/image.png)

6. Enable SSL verification을 설정한다면 Jenkins에서도 CSRF 설정을 해야한다.

- Jenkins관리 -> Configure Global Security -> CSRF 설정

  ![CSRF 설정](https://lab.ssafy.com/s08-webmobile1-sub2/S08P12B105/uploads/998a34441469e9fcc7903ae7d92fa7e7/image.png)

## Jenkins Build 설정

---

1. Jenkins NodeJs 설정

   ![Nodejs설정](https://lab.ssafy.com/s08-webmobile1-sub2/S08P12B105/uploads/95f1ba21f9ddd3881bbda935dcc4cf5a/image.png)

2. Jenkins Gradle 설정

   ![gradle설정](https://lab.ssafy.com/s08-webmobile1-sub2/S08P12B105/uploads/a9520b2a224d5680cf949d51b4009a6c/image.png)

3. Jenkins가 NodeJS build중 Eslint에서 뜨는 warning을 오류로 받아들이지 않게 CI 설정

   ![CI설정](https://lab.ssafy.com/s08-webmobile1-sub2/S08P12B105/uploads/0f066fa0e65a3db0874660a93879a6d9/image.png)

# Setup

## Install

cd ./backend/

---

## EC2에 SSL 인증서 발급

---

## docker-compose

---

## Prerequisites

- Docker
- Docker Compose
- Jenkins
- Git

## Getting Started

1. Clone this repository to your local machine.
2. Open a terminal in the project root directory and run docker-compose up -d to start the application stack.
3. Open your web browser and go to http://localhost:80 to access the application.
4. To shut down the application stack, run docker-compose down in the terminal.

## Jenkins Pipeline

This project includes a Jenkins pipeline that automates the build and deployment of the application stack. The pipeline is defined in the Jenkinsfile and consists of the following stages:

1. Checkout: Checks out the source code from the Git repository.
2. Build: Builds the Docker images for nginx, openvidu, mysql, and myapp.
3. Test: Runs unit tests on the myapp container.
4. Deploy: Deploys the application stack using Docker Compose.

To run the Jenkins pipeline, create a new pipeline job in Jenkins and configure it to use the Jenkinsfile in the project root directory.

## Configuration

The application stack can be configured using the docker-compose.yml file in the project root directory. This file defines the services that make up the application stack and their configurations.

## Contributing

If you would like to contribute to this project, feel free to submit a pull request. Contributions are always welcome!

## License

This project is licensed under the MIT License.
