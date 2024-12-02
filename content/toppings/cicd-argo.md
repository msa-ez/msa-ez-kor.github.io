---
description: ''
sidebar: 'started'
---
# Argo

## CD - Argo
Argo CD는 Kubernetes를 위한 선언적이고 GitOps 기반의 지속적 배포(CD) 도구입니다. Git 저장소에 정의된 애플리케이션의 원하는 상태를 Kubernetes 클러스터의 실제 상태와 자동으로 동기화합니다.


Argo CD는 Git 저장소의 변경사항을 감지하고 자동으로 클러스터에 적용하며 롤백 및 배포 이력 추적에 용이하다는 이점이 있습니다.

## 적용 방법

Code > Code Preview를 클릭 > 우측 상단 Toppings > Marketplace를 클릭하여 아래와 같은 화면으로 진입합니다. <br>
![](https://github.com/user-attachments/assets/58b2c46c-1155-4340-bbfe-8372830bbecb)

상단의  'TOPPINGS' > 'Argo' > Apply 클릭을 통해 토핑을 적용합니다. <br>

적용 후 최상위 루트의 'kubernetes/template'를 확인하면 Argo 자동 배포를 위한 'istom.yml'파일이 생성된 것을 확인할 수 있습니다.
```

apiVersion: "networking.istio.io/v1alpha3"
kind: "Gateway"
metadata: 
  name: untitled
spec: 
  selector: 
    istio: "ingressgateway"
  servers: 
    - 
      port: 
        number: 80
        name: "http"
        protocol: "HTTP"
      hosts: 
        - "*"
---
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: rollout-order
spec:
  replicas: 5
  strategy:
    canary:
      trafficRouting:
        istio:
          virtualService: 
            name: vsvc-order        # required
            routes:
            - primary                 # required
          destinationRule:
            name: destrule-order    # required
            canarySubsetName: canary  # required
            stableSubsetName: stable  # required
      steps:
      - setWeight: 5
      - pause:
          duration: 10s
      - setWeight: 20
      - pause:
          duration: 10s
      - setWeight: 40
      - pause:
          duration: 10s
      - setWeight: 60
      - pause:
          duration: 10s
      - setWeight: 80
      - pause:
          duration: 10s
  revisionHistoryLimit: 2
  selector:
    matchLabels:
      app: order
  template:
    metadata:
      labels:
        app: order
    spec:
      containers:
      - name: order
        image: "userid/order:version"
        ports:
        - name: http
          containerPort: 80
          protocol: TCP
        resources:
          requests:
            memory: 32Mi
            cpu: 5m
---
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: vsvc-order
spec:
  gateways:
  - untitled
  hosts:
  - "*"
  http:
  - name: primary       # referenced in canary.trafficRouting.istio.virtualService.routes
    match: 
    - uri: 
        exact: "/orders"
    rewrite:
      uri: "/"
    route:
    - destination:
        host: order
        subset: stable  # referenced in canary.trafficRouting.istio.destinationRule.stableSubsetName
      weight: 100
    - destination:
        host: order
        subset: canary  # referenced in canary.trafficRouting.istio.destinationRule.canarySubsetName
      weight: 0
```

## 실행 방법

### STEP1. Agro CD 설치 및 접속

터미널에 입력하여 Argo CD를 클러스터에 설치합니다.

```
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

Agro CD UI에 접속하기 위해 LoadBalancer로 전환합니다.
```
kubectl patch svc argocd-server -n argocd -p '{"spec": {"type": "LoadBalancer"}}'
kubectl get svc argocd-server -n argocd
<External IP>:80로 접속
```

Secret password를 얻기 위해 다음의 명령어를 입력한 후, 결과값을 pwd에 입력하여 로그인을 진행합니다. <br>
(id: admin / pwd: secret password)
```
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
```

- 로그인에 성공하면 아래와 같은 화면을 확인할 수 있습니다.
![argo-main](https://github.com/acmexii/demo/assets/35618409/00719984-5f28-4aab-adc7-11af7769099b)

### STEP2. Argo CD GitOps 설정

상단에 보여지는 'NEW APP'을 클릭하여 애플리케이션을 등록합니다.

![](https://argo-cd.readthedocs.io/en/stable/assets/new-app.png)

Guestbook 어플리케이션을 아래처럼 생성합니다.
- Application Name에는 'argocd'을, Project에는 'default'를 입력. 
- SYNC Option에서 'AUTO-CREATE NAMESPACE'에 체크.
<img width="1046" alt="image" src="https://github.com/user-attachments/assets/72bdc714-d7d7-48a9-8394-9105da477ad8">


- 내 계정으로 복제된 application 의 Git 주소를 argo 에 등록합니다.
- Repository URL에는 Git repo url을, Path에는 istio.yml의 파일 경로를 입력합니다.

<img width="1030" alt="image" src="https://github.com/user-attachments/assets/6e90054e-27f9-4021-a2ea-b4cca4734468">

배포될 타겟 클러스터를 지정한 후, CREATE를 클릭하여 설정을 저장합니다.

![](https://argo-cd.readthedocs.io/en/stable/assets/destination.png)

이후, 생성된 Application 상단의 'SYNC' 버튼을 눌러 istio.yml에 있는 배포스펙과 함께 배포 및 모니터링을 진행할 수 있습니다.