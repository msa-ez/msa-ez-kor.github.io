---
description: ''
sidebar: 'started'
---
# K8s 배포 모델링

DDD 패턴으로 설계되어 구현된 12번가 마이크로서비스는 클라우드 네이티브한 인프라 환경에 배포되어 운영됩니다. 
'클라우드 네이티브한 인프라 환경' 이라 함은, 12번가 쇼핑몰을 구성하는 각 서비스들이 하나의 VM상에 모두 배포되는 것이 아니라 도커(Docker, <a href="https://www.docker.com" target="_blank" class="link-open-text">https://www.docker.com</a>)라고 하는 컨테이너 가상화 기술로써 각자 격리되어 독립적으로 운영되는 수준의 인프라 환경을 말합니다. 

이러한 컨테이너들을 관리하는 플랫폼을 '컨테이너 오케스트레이터'라고 부르며 쿠버네티스(Kubernetes)가 대표적입니다. 쿠버네티스는 배포된 12번가 쇼핑몰의 프로세스가 SLA를 준수하면서 운영되도록 하는 Self Healing, Auto Scale-Out, Service Mesh, Monitoring, Tracing 등의 오케스트레이션 피처들을 제공(세부 내용 <a href="http://www.kubernetes.io" target="_blank" class="link-open-text">http://www.kubernetes.io</a> 참조)합니다.

MSAEZ는 이벤트스토밍 모델을 근간으로 쿠버네티스 클러스터 배포에 필요한 배포 다이어그래밍 도구를 지원하고 있으며, 이렇게 설계된 배포 모델은 Git 형상서버에 저장되고 Git 형상과 운영환경 형상을 동기화 해주는 Argo<a href="https://argoproj.github.io/" target="_blank" class="link-open-text">https://argoproj.github.io/</a> 스택으로 자동 배포가 가능합니다.

![image](https://github.com/acmexii/demo/assets/35618409/4a51c1e3-400f-4d5b-8d0a-edb742f12e94)


## 배포 모델링 

이벤트스토밍 모델에서 쿠버네티스 배포를 위한 다이어그래밍 도구는 아래처럼 접근합니다.

![image](https://github.com/acmexii/demo/assets/35618409/07d45fce-528a-4261-a1e3-c100e068c6b0)

이벤트스토밍 도구와 마찬가지로 배포 다이어그래밍 도구는

- 쿠버네티스 객체 모델링을 위한 팔레트 영역
- 모델링 캔버스 영역
- 모델링 결과 배포 YAML Preview 영역 으로 구성되어 있으며, 

이벤트스토밍 모델에서 접근 시, 모델에 설정된 마이크로서비스 구현 패턴을 읽어서 이에 해당하는 객체들로 배포 다이어그램을 구성하여 로딩합니다. 배포 담당자는 서비스 운영에 필요한 기본 인스턴스 개수, 파일 스토리지, 등의 오케스트레이션 객체를 팔렛트로부터 추가하여 모델링함으로써 클러스터상에서의 배포 형상을 완성합니다.

![image](https://github.com/acmexii/demo/assets/35618409/ad81f353-7b71-4381-bd42-3ceb25a1a698)

세부적인 배포 모델링 방법은 모델링 실습 메뉴에서 학습할 수 있습니다.