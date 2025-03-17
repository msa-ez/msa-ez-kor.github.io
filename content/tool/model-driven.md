---
description: ''
sidebar: 'started'
---
# 코드 생성

이번 세션부터는 이전 과정에서 작성 이벤트스토밍 모델을 활용하여 MSAEZ의 코드 생성 기능 및 다양한 마이크로서비스 패턴들을 자동으로 생성된 코드에 추가하는 내용이 설명됩니다.

먼저, 이전 과정에서 작성된 아래 이벤트스토밍 모델에 대해 MSAEZ가 제공하는 코드 생성 기능을 활용합니다.

![](../../src/img/code1.png)

## 파일 구조

Bounded Context 에 설정한 이름별(Order, Delivery)로 프로젝트가 생성되고, 아래와 같은 구조를 가집니다.
- Event Storming modeling tool에서 아래 이미지에 보이는 Code Preview에서 확인 가능합니다.
![](../../src/img/mp0.png)
![](../../src/img/code2.png)

gateway 는 기본 제공되는 템플릿으로 spring-cloud-gateway를 설정하는 방법을 나타내고 있습니다.

정상적으로 사용시에는 gateway/src/main/resource 의 application.yaml 파일에서 routes 부분을 수정하여 사용해야 합니다.

파일 구조는 아래와 같이 스티커별로 기본 템플릿에 의하여 생성됩니다. 

이는 spring-boot 기반의 프로젝트로 maven 으로 리소스 관리를 하며, 파일 생성 위치나 파일 안의 기본 내용을 생성시마다 변경을 하려면 커스텀 템플릿을 활용하면 됩니다.

![](../../src/img/image45.png)

**application.yaml**
    
- spring-boot 의 설정 파일이며, local 환경 변수와 Docker용 환경변수를 profile 설정으로
        분리했습니다.
    
- 이벤트 기반이므로 메시지 처리를 위하여 spring-cloud-stream 라이브러리를 사용합니다. 그 중에서 브로커를 kafka 를 사용하여 설정되어 있습니다.

**Dockerfile**
    
- Docker image 를 생성할 때 필요한 파일입니다.
    
- Docker 로 build 시 "--spring.profiles.active=docker" 로 설정되어 있어서 application.yaml 파일에서 설정한 프로파일을 읽게 됩니다.

## GitPod Cloud IDE 연동

![](../../src/img/image46.png)

Code Preview의 Menu Panel에서 Push to Git 버튼을 클릭하면 나오는 다이얼로그의 Create 버튼을 클릭해 본인 GitHub 계정에 New Repository를 생성합니다.

![](../../src/img/image47.png)

![](../../src/img/image48.png)

Repository 생성이 완료되면 초록색 success 알림창이 뜨고, Repo 주소 옆에 있는 버튼을 클릭하면 해당 레포지토리로 이동해 프로젝트가 생성된 것을 확인할 수 있습니다.

![](../../src/img/image49.png)

<p align="center">생성된 Git Repository 화면</p>

![](../../src/img/image52.png)

Repository 생성 완료가 확인되면 IDE 탭으로 이동해 Open GitPod 버튼을 클릭해 GitPod Cloud IDE를 실행시킵니다.

![](../../src/img/image51.png)

GitPod에 접근하면 위와 같은 시작 페이지가 나오고, Continue 버튼을 클릭해 작업을 이어가줍니다.

![](../../src/img/image50.png)

별도의 설치 없이 웹 브라우저 기반으로 로컬 IDE를 운용할 수 있는 GitPod Cloud IDE에 이벤트스토밍을 통해 생성된 코드가 잘 넘어온 것을 확인할 수 있습니다.

해당 IDE를 활용해 구체적 비즈니스 로직을 구현하거나 서비스를 추가하는 등의 개발 작업을 진행할 수 있습니다.
