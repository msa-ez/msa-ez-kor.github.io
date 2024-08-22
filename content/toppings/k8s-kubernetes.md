---
description: ''
sidebar: 'started'
---
# Kubernetes

Kubernetes는 컨테이너화된 애플리케이션의 배포, 확장 및 관리를 자동화하는 오픈소스 컨테이너 오케스트레이션 플랫폼이며, 자동 배포 및 롤백, 서비스 디스커버리와 로드 밸런싱, 자동 스케일링 및 치유 등의 기능을 사용할 수 있습니다.

중단 없는 운영을 통한 높은 가용성과 확장성을 지니며 확장 및 축소에 용이하고 효율적인 리소스 사용에 이점을 보이고 있습니다.

## 적용 방법

### STEP1. Kubernetes 모델링 확인

모델링 상단의 kubernetes아이콘을 클릭하여 모델링 페이지로 진입합니다.
![image](https://github.com/user-attachments/assets/5595603d-3983-41fe-91eb-0211afc2baf1)

진입하면 아래와 같이 좌측에는 모델링을 통해 생성된 Kubernetes 배포 모델링이, 우측에는 특정 모델 스티커에 선언된 배포스펙을 확인할 수 있으며 수정 및 삭제를 통해 배포스펙을 수정할 수 있습니다. 
<img width="800" alt="image" src="https://github.com/user-attachments/assets/0f410e0e-1a71-41ef-a4e4-448fb810fc17">

### STEP2. Topping 적용
Code > Code Preview를 클릭하여 코드 프리뷰 화면에 진입합니다. <br>
우측 상단 Toppings > Marketplace를 클릭하여 아래와 같은 화면으로 진입합니다. <br>
![](https://github.com/user-attachments/assets/58b2c46c-1155-4340-bbfe-8372830bbecb)

상단의  'TOPPINGS' > 'IsVanillaK8s' > Apply 클릭을 통해 토핑을 적용합니다. <br>

적용 후 최상위 루트에 위치한 'kubernetes/template'에 'template.yml'파일이 생성되며 아래와 같이 진행한 모델링에 대한 베포 스펙을 확인할 수 있습니다.
```
apiVersion: "apps/v1"
kind: "Deployment"
metadata: 
  name: "order"
  labels: 
    app: "order"
  namespace: ""
  annotations: 
    msaez.io/x: "775"
    msaez.io/y: "556"
spec: 
  selector: 
    matchLabels: 
      app: "order"
  replicas: 1
  template: 
    metadata: 
      labels: 
        app: "order"
    spec: 
      containers: 
        - 
          name: "order"
          image: "ghcr.io/undefined"
          ports: 
            - 
              containerPort: 8080
          readinessProbe: 
            httpGet: 
              path: "/actuator/health"
              port: 8080
            initialDelaySeconds: 10
            timeoutSeconds: 2
            periodSeconds: 5
            failureThreshold: 10
          livenessProbe: 
            httpGet: 
              path: "/actuator/health"
              port: 8080
            initialDelaySeconds: 120
            timeoutSeconds: 2
            periodSeconds: 5
            failureThreshold: 5
---

apiVersion: "apps/v1"
kind: "Deployment"
metadata: 
  name: "inventory"
  labels: 
    app: "inventory"
  namespace: ""
  annotations: 
    msaez.io/x: "775"
    msaez.io/y: "556"
spec: 
  selector: 
    matchLabels: 
      app: "inventory"
  replicas: 1
  template: 
    metadata: 
      labels: 
        app: "inventory"
    spec: 
      containers: 
        - 
          name: "inventory"
          image: "ghcr.io/undefined"
          ports: 
            - 
              containerPort: 8080
          readinessProbe: 
            httpGet: 
              path: "/actuator/health"
              port: 8080
            initialDelaySeconds: 10
            timeoutSeconds: 2
            periodSeconds: 5
            failureThreshold: 10
          livenessProbe: 
            httpGet: 
              path: "/actuator/health"
              port: 8080
            initialDelaySeconds: 120
            timeoutSeconds: 2
            periodSeconds: 5
            failureThreshold: 5
---

apiVersion: "v1"
kind: "Service"
metadata: 
  name: "order"
  labels: 
    app: "order"
  namespace: ""
  annotations: 
    msaez.io/x: "775"
    msaez.io/y: "356"
spec: 
  ports: 
    - 
      port: 8080
      targetPort: 8080
  selector: 
    app: "order"
---

apiVersion: "v1"
kind: "Service"
metadata: 
  name: "inventory"
  labels: 
    app: "inventory"
  namespace: ""
  annotations: 
    msaez.io/x: "775"
    msaez.io/y: "356"
spec: 
  ports: 
    - 
      port: 8080
      targetPort: 8080
  selector: 
    app: "inventory"
```

## 사용 방법

### STEP1. 패키징
클러스터에 배포할 이미지를 생성하기 위해 다음의 명령어를 입력하여 각 마이크로서비스에 대한 패키지 파일을 생성합니다.
```
cd <microservice>
mvn package -B -Dmaven.test.skip=true
```

### STEP2. 도커라이징
완료된 패키지 파일과 각 마이크로서비스에 생성된 Dokerfile을 통해 도커로 이미지를 생성이 가능하며 다음의 명령어로 이미지를 생성할 수 있습니다.

```
docker login # 최초, 한번만 실행해도 됨
docker build -t [dockerhub ID]/[마이크로서비스 이름]:[태그명] .     
docker image ls
docker push [dockerhub ID]/[마이크로서비스 이름]:[태그명]  
```

### STEP3. 배포
도커에 Build & Push한 이미지를 kubernetes cluster에 배포하기 위해 다음과 같이 진행합니다.

1. 이미지명 변경
template.yml의 스펙에 image명을 다음과 같이 수정합니다.
```
spec: 
      containers: 
        - 
          name: "order"
          image: "[dockerhub ID]/[마이크로서비스 이름]:[태그명]"
          ports: 
```

2. 클러스터 배포
image명 변경 후, 클러스터 배포를 위해 다음의 명령어를 입력하여 template.yml 배포를 진행합니다.
```
kubectl apply -f kubernetes/template/template.yml
```

이후 클러스터를 조회하면 생성한 이미지에 대한 배포스펙에 따라 pod, svc, deploy가 생성된 것을 확인할 수 있습니다.
