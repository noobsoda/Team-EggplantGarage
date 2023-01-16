# Jenkins와 Docker를 활용한 CI/CD 구축

## 목표
Jenkins로 CI/CD를 환경을 구축하여 프로젝트 배포를 지속적으로 쉽게 한다.
Docker로 Jenkins를 설치하고 설정 할 수 있다.
Jenkins를 이용하여 도커라이징(컨테이너화)하여 배포 할 수 있다.

## Docker란?
Docker는 컨테이너 기반의 오픈 소스 컨테이너 관리 시스템입니다. 컨테이너는 응용 프로그램과 그에 필요한 종속성을 포함한 것으로, 컨테이너는 응용 프로그램이 실행될 수 있는 가상화된 환경을 제공합니다. Docker는 응용 프로그램을 손쉽게 실행, 관리, 배포할 수 있게 해주며, 응용 프로그램의 실행 환경을 일관되게 유지할 수 있게 해줍니다. Docker는 소프트웨어 개발, 테스트, 배포 작업을 자동화하기 위한 도구로도 사용되고 있습니다.

## 최종적 원하는 목표
<a href='https://ifh.cc/v-4Wk3Ln' target='_blank'><img src='https://ifh.cc/g/4Wk3Ln.jpg' border='0'></a>

## WebHook 이란?

Webhook은 웹 어플리케이션에서 이벤트가 발생했을 때 지정된 URL로 HTTP POST 요청을 보내는 기능입니다. 이렇게 요청을 보내는 것을 "webhook 이벤트"라고 합니다. 웹훅은 일반적으로 소프트웨어 서비스간의 연계를 위해 사용됩니다. 예를 들어 소셜 미디어 플랫폼에서 새 글이 작성될 때 지정된 URL로 알림을 전송할 수 있게 해주는 것입니다. 이렇게 알림을 받은 서버는 이벤트가 발생한 것을 인지하고 원하는 작업을 수행할 수 있게 됩니다.

도커에서 Webhooks은 일반적으로 이미지가 새로운 버전으로 업데이트되었을 때 자동으로 새 이미지를 가져오거나 컨테이너를 재시작하는 등의 작업을 수행하도록 설정할 수 있습니다. 이렇게 함으로써 이미지가 업데이트되었을 때 자동으로 새 이미지를 가져오고 컨테이너를 재시작할 수 있게 됩니다.


## 1. Docker 설치

https://docs.docker.com/get-docker/

<a href='https://ifh.cc/v-nvxXqa' target='_blank'><img src='https://ifh.cc/g/nvxXqa.png' border='0'></a>

OS 환경에 맞도록 설치를 진행한다.

Linux나 Ubuntu라면
Docker compose로 쉽게 컨테이너를 구축할 수 있다.

### Docker Compose란?

Docker Compose는 여러개의 컨테이너로 구성된 애플리케이션을 쉽게 구축, 관리할 수 있게 해주는 오픈 소스 도구입니다. 
Docker Compose를 사용하면, 애플리케이션의 전체 설정을 기술한 YAML 파일을 작성할 수 있고, 이 파일을 이용해서 애플리케이션을 시작하거나 종료할 수 있습니다. 
Docker Compose는 손쉽게 컨테이너를 재시작하거나 스케일 업/다운을 수행할 수 있게 해주는 슈팅 커맨드를 제공합니다. 
그 외에도, Docker Compose는 컨테이너 간의 네트워크 연결, 볼륨 공유 등의 기능을 제공합니다.

---------------------------------------------

### 2. Docker로 Jenkins를 설치하고 설정하기

도커 이미지를 넣기 위한 명령어


`docker run -d -p 9090:8080 -p 50000:50000 -v /var/jenkins:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock --name jenkins jenkins/jenkins:lts-jdk11`


-------

### 오류 1

#### Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?

docker를 실행하지 않아서 그렇습니다.

linux라면 sudo service docker start

window라면 docker 프로그램을 실행해야 합니다.


------

### 오류 2

#### docker: Error response from daemon: Ports are not available: exposing port TCP 0.0.0.0:9090 -> 0.0.0.0:0: listen tcp 0.0.0.0:9090: bind: An attempt was made to access a socket in a way forbidden by its access permissions.

Docker 컨테이너가 사용하려고 시도하는 포트가 이미 사용 중이라는 오류 메시지입니다. 이는 이미 실행 중인 프로그램이나 서비스가 해당 포트를 사용 중이기 때문입니다. 이 오류가 발생하면 포트를 사용하는 프로그램을 종료하거나 설정 파일을 수정해 포트를 변경할 수 있습니다.

`docker run -d -p 8080:8080 -p 50000:50000 -v /var/jenkins:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock --name jenkins jenkins/jenkins:lts-jdk11`
포트를 8080로 변경해주었습니다.

------

### 오류 3

#### docker: Error response from daemon: Conflict. The container name "/jenkins" is already in use by container "67f428b28f5ee37ac9ee9f2a79dcb61005c5ec240f19c5b9c3fbde9db71a2bac". You have to remove (or rename) that container to be able to reuse that name.

포트로 인해 넣지 못했지만 이미지는 들어갔으므로 다시 지우고 하라는 뜻입니다

Docker 프로그램에서 컨테이너와 이미지를 지우고 다시 명령어 실행했습니다

------


### 오류 4

<a href='https://ifh.cc/v-hVmAmw' target='_blank'><img src='https://ifh.cc/g/hVmAmw.png' border='0'></a>


permission 에러가 나면서 실행이 안됩니다
권한이 없습니다

`docker run -d -p 8080:8080 -u root -p 50000:50000 -v /var/jenkins:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock --name jenkins jenkins/jenkins:lts-jdk11`

명령어에서 -u root를 추가해서 권한을 줬습니다.

-----------




http://localhost:8080/


이제 모든 오류를 해결하고 사이트를 들어가면

<a href='https://ifh.cc/v-cX1lVR' target='_blank'><img src='https://ifh.cc/g/cX1lVR.png' border='0'></a>

젠킨스 이미지가 뜨면서 비밀번호를 입력하라고 합니다.

docker logs jenkins
명령어를 사용해 로그를 확인해서 

<a href='https://ifh.cc/v-b1OOn9' target='_blank'><img src='https://ifh.cc/g/b1OOn9.png' border='0'></a>

암호를 구한뒤 입력합니다

<a href='https://ifh.cc/v-Dbw7kA' target='_blank'><img src='https://ifh.cc/g/Dbw7kA.png' border='0'></a>

기본으로 설치 하라는 플러그인을 설치하여 


<a href='https://ifh.cc/v-MHb3jv' target='_blank'><img src='https://ifh.cc/g/MHb3jv.png' border='0'></a>

기본 설정할 어드민 유저 정보를 세팅해줍니다.

## 2. Jenkins 플러그인 설치

http://localhost:8080/manage/pluginManager/available

gitlab과 docker를 검색해서 플러그인을 설치해줍니다.

<a href='https://ifh.cc/v-OjfPh4' target='_blank'><img src='https://ifh.cc/g/OjfPh4.png' border='0'></a>

설치 후 재시작을 해줍니다.


## 3. Jenkins 컨테이너안 도커 설치

`docker exec -it jenkins bash`

쉘을 실행하여 명령어를 통해 컨테이너 안으로 접근합니다.

<a href='https://ifh.cc/v-X4oSd1' target='_blank'><img src='https://ifh.cc/g/X4oSd1.png' border='0'></a>


`apt-get update`

`apt install docker.io`

명령어를 통해 도커를 설치합니다

<a href='https://ifh.cc/v-nW9m4F' target='_blank'><img src='https://ifh.cc/g/nW9m4F.png' border='0'></a>

잘 설치됬으면 도커 버전이 잘 나올것입니다.


## 4. 도커라이징 및 배포 설정

https://lab.ssafy.com/fedora.ssafy/test_deploy

해당 주소를 포크하고 clone 합니다

https://lab.ssafy.com/sodamito3/test_deploy.git

<a href='https://ifh.cc/v-fH1br9' target='_blank'><img src='https://ifh.cc/g/fH1br9.png' border='0'></a>

새로운 Item을 클릭하고

<a href='https://ifh.cc/v-mRXd8J' target='_blank'><img src='https://ifh.cc/g/mRXd8J.png' border='0'></a>

item name을 입력한뒤 Freestytle project를 누릅니다.

<a href='https://ifh.cc/v-3dJnGb' target='_blank'><img src='https://ifh.cc/g/3dJnGb.png' border='0'></a>

소스 코드 관리에서 git을 누릅니다.


<a href='https://ifh.cc/v-4cjRbO' target='_blank'><img src='https://ifh.cc/g/4cjRbO.png' border='0'></a>

해당 Repository URL에 clone한 주소를 넣고

Credentials에다가 Add 누릅니다

<a href='https://ifh.cc/v-n8qC32' target='_blank'><img src='https://ifh.cc/g/n8qC32.png' border='0'></a>

gitlab에 로그인하는 ID와 PASSWORD를 넣고 식별할 ID를 넣어줍니다.


<a href='https://ifh.cc/v-DqSG8B' target='_blank'><img src='https://ifh.cc/g/DqSG8B.png' border='0'></a>

이렇게 빨간색으로 뜨면 비밀번호를 잘못 입력한거니 수정하시길 바랍니다.


<a href='https://ifh.cc/v-yJT20q' target='_blank'><img src='https://ifh.cc/g/yJT20q.png' border='0'></a>


변경사항이 있으면 빌드를 체크하여 git 레포지토리에 새로운 푸쉬가 들어오면 자동으로 빌드가 진행되게 합니다.

<a href='https://ifh.cc/v-VRJTvn' target='_blank'><img src='https://ifh.cc/g/VRJTvn.png' border='0'></a>



`docker build -t hello_ssafy:latest .`

이미지를 생성하기 위해 "docker build" 명령어를 사용합니다. 이미지 이름은 "hello_ssafy"이고, 최신 버전인 "latest"로 지정합니다. 이미지가 생성되는 과정에서 현재 디렉토리에 있는 Dockerfile이 사용됩니다.

`docker run -d -p 80:80 hello_ssafy`

생성된 이미지를 컨테이너로 실행하기 위해 "docker run" 명령어를 사용합니다. 컨테이너는 백그라운드에서 실행되도록 "-d" 옵션을 지정합니다. 컨테이너의 80번 포트는 외부에서 접근할 수 있도록 호스트의 80번 포트와 연결되도록 "-p" 옵션을 지정합니다.

Build Step에 Execute shell로 설정하고
스크립트를 넣고 SAVE를 하고 나와줍니다.


## 5. 빌드 및 배포

이제 배포를 할 시간입니다.

<a href='https://ifh.cc/v-zwXgRm' target='_blank'><img src='https://ifh.cc/g/zwXgRm.png' border='0'></a>

지금 빌드(Build Now)를 눌러서 배포를 합니다.

<a href='https://ifh.cc/v-ymBNjw' target='_blank'><img src='https://ifh.cc/g/ymBNjw.png' border='0'></a>

다음과 같이 나오면 정상 빌드 완료 입니다.

<a href='https://ifh.cc/v-WRFLAf' target='_blank'><img src='https://ifh.cc/g/WRFLAf.png' border='0'></a>

<a href='https://ifh.cc/v-B5ntp6' target='_blank'><img src='https://ifh.cc/g/B5ntp6.png' border='0'></a>

배포를 성공적으로 완료하였습니다.


## 오류

### docker.sock 문제
<a href='https://ifh.cc/v-LdANoM' target='_blank'><img src='https://ifh.cc/g/LdANoM.png' border='0'></a>

만약에 이런식으로 빌드가 되지 않는다면 도커가 실행을 못하고 있는것입니다.

<a href='https://ifh.cc/v-yNhQ6h' target='_blank'><img src='https://ifh.cc/g/yNhQ6h.png' border='0'></a>

`service docker start`

`docker ps`

명령어를 통해 docker가 컨테이너안에서 실행중인지 확인하세요

그럼에도 도커가 실행되지 않는다면

`docker run -d -p 8080:8080 -u root -p 50000:50000 -v /var/jenkins:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock --name jenkins jenkins/jenkins:lts-jdk11`

docker.sock이 없을 가능성이 있습니다.

-------------------------

### Docker Desktop - Access denied
<a href='https://ifh.cc/v-ym5bo1' target='_blank'><img src='https://ifh.cc/g/ym5bo1.png' border='0'></a>

갑자기 Window에서 Docker를 사용하고 있다가 다음과 같은 경고 문구가 뜨면서 실행이 안될 수 있다.

해결법
https://goddaehee.tistory.com/280