---
description: ''
sidebar: 'started'
---
# Open API 3.0 기반 목 서버 생성 토핑(New)

## 개요
마이크로서비스 간의 연동에 있어서 디펜던시 마이크로서비스에 대한 실제 서비스가 올라가있지 않더라도 병렬 개발이 가능하도록 하기 위해 해당 서버의 mock 서버를 만들어 테스트할 수 있는 개발 디펜던시를 자동으로 생성해주고 Open API 3.0 버전을 통해 example까지 만들어주는 토핑이 추가되었습니다.

## 세부 스펙
![image](https://github.com/msa-ez/msaschool.github.io/assets/113568664/ffaa62b4-e480-4a18-8e2d-dd228744685c)

마켓플레이스로 이동해서 토핑 쪽에 있는 Local microservice development dependencies의 세부 역할을 살펴보면

1. Open API 3.0 api를 자동으로 모델에서 생성한다.
2. yml 형태의 api를 생성하고 오픈소스인 마이크록스를 통해 목 서버를 생성한다.
3. api 다큐멘테이션을 생성한다.
4. 이와 관련해서 비동기 연동을 위한 카프카 서버를 함께 실행시켜주는 역할을 한다.

Open API 3.0의 장점은 example 스펙이 추가되어 여러가지 입력에 대한 기댓값을 작성할 수 있게 되고, 그것을 바탕으로 이벤트스토밍 모델에서 example을 함께 작성이 가능하다는 것입니다.

이 토핑을 적용하면 각 마이크로서비스에 대한 infra 폴더가 생성되어 그 안에 openapi.yaml 파일이 생성되고 docker-compose를 실행시킴으로써 디펜던시들이 목 서버와 함께 자동으로 생성 및 실행됩니다.

## 실제 적용
![스크린샷 2023-10-31 오후 4 36 54](https://github.com/msa-ez/msaschool.github.io/assets/113568664/c8ab2295-4311-4b70-954c-4a63781febd4)

실제로 마켓플레이스에서 가져온 local-dep 토핑을 코드에 적용해보면 order 마이크로서비스 내에 infra 폴더가 생성되고, 그 내부 api 폴더에 openapi.yaml 파일이 생성된 것을 확인할 수 있습니다. 여기에 작성된 스펙을 통해 mock 서버를 직접 만들어나갈 수 있습니다.

![스크린샷 2023-10-31 오후 4 39 28](https://github.com/msa-ez/msaschool.github.io/assets/113568664/c7ee0127-a6d9-4591-9247-1e798ee40278)

해당 스펙에 명시된 example을 통해 각 제품에 대한 주문 액션이 취해지면 재고량이 줄어드는 리턴값이 주어집니다.

![스크린샷 2023-10-31 오후 4 58 09](https://github.com/msa-ez/msaschool.github.io/assets/113568664/eb61ae67-423a-44b5-a643-5fdae703c57b)

커맨드를 설정할 때 예시 데이터를 입력할 수 있는 ui가 추가되어 위 ui에서 example의 결과값을 직접 입력해 편집이 가능합니다. 

여기서 Given, When, Then은 각각 Aggregate의 기존 상태, 호출된 api, 그로 인해 발행된 도메인 이벤트에서 담고 있는 데이터를 의미합니다. 테스트를 위해 입력한 데이터 값을 그대로 받아서 open api 스펙에서 생성이 가능합니다.