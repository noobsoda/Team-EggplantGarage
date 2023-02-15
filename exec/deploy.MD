# Project : 가지가라지

This project demonstrates how to port a web application stack consisting of nginx, openvidu, mysql, and myapp using Jenkins and Docker Compose.

## Port Number

---

표 넣기

# Configuration

## Integrated Development Build

> `build.gradle`

```
def frontendDir = "$projectDir/../frontend"

sourceSets {
    main {
        resources {
            srcDirs = ["$projectDir/src/main/resources"]
        }
    }
}

processResources { dependsOn "copyReactBuildFiles" }

task installReact(type: Exec) {
    workingDir "$frontendDir"
    inputs.dir "$frontendDir"
    group = BasePlugin.BUILD_GROUP
    if (System.getProperty('os.name').toLowerCase(Locale.ROOT).contains('windows')) {
        commandLine "npm.cmd", "audit", "fix"
        commandLine 'npm.cmd', 'install'
    } else {
        commandLine "npm", "audit", "fix" commandLine 'npm', 'install'
    }
}

task buildReact(type: Exec) {
    dependsOn "installReact"
    workingDir "$frontendDir"
    inputs.dir "$frontendDir"
    group = BasePlugin.BUILD_GROUP
    if (System.getProperty('os.name').toLowerCase(Locale.ROOT).contains('windows')) {
        commandLine "npm.cmd", "run-script", "build"
    } else {
        commandLine "npm", "run-script", "build"
    }
}

task copyReactBuildFiles(type: Copy) {
    dependsOn "buildReact"
    from "$frontendDir/build"
    into "$projectDir/src/main/resources/dist"
}
```

> `api.config.WebMvcConfig.java`

리소스 핸들러 매핑 설정

```java
    registry.addResourceHandler("/**").addResourceLocations("classpath:/dist/");
```

> `api.controller.WebController.java`

리액트 url 라우팅 설정

```java
    @GetMapping(value = {"", "/home", "/submit", "/seller/**", "/login", "/signup", "/signupemail", "/search", "/like", "/chat/**", "/mypage", "category"
    , "infoedit", "liveshowdetail", "writereview", "review", "liveshow/**", "/findpass"})
    public String forward() {
        return "forward:/index.html";
    }
```

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
