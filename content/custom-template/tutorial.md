---
description: ''
sidebar: 'started'
---
# 커스텀 템플릿 개념

## 커스텀 템플릿이란
커스텀 템플릿은 원하는 템플릿을 제공된 기본 템플릿에 추가하여 이벤트스토밍 모델의 결과에 따라 원하는 템플릿으로 코드를 생성합니다.

이벤트스토밍 결과를 원하는 템플릿으로 사용하려면 커스텀 템플릿을 생성해야 합니다. 템플릿 파일은 크게 생성 관련 메타데이터와 소스 코드로 나누어지며, 메타데이터와 소스 코드는 "---"으로 구분됩니다.

템플릿 생성은 기본적으로 {{ Mustache }} 엔진을 사용하며, Mustache는 {{ }} 안의 값을 키 값으로 가져오는 엔진입니다.

템플릿이 적용된 속성이 어떻게 생성되는지에 대한 정보는 다음 링크에서 확인할 수 있습니다: https://intro-kor.msaez.io/custom-template/custom-template/#custom-template

다음은 Aggregate에 spring-boot 템플릿을 적용한 간단한 예시입니다.

> AggregateRoot.java
![스크린샷 2023-03-28 오후 5 09 46](https://user-images.githubusercontent.com/113568664/228171561-6d6ca9dc-2c5d-420d-9216-4604aee2ed0c.png)

그리고 아래 소스 코드는 위의 템플릿을 적용하여 생성된 결과물입니다.

> File.java
![스크린샷 2023-03-28 오후 5 17 06](https://user-images.githubusercontent.com/113568664/228173493-2adfa72d-ea88-4dba-bce3-9af28e82d930.png)

위의 이미지에서 보여지는 대로, Mustache 엔진을 사용한 값들은 실제 소스 코드로 변환됩니다.

Spring Boot를 포함한 다양한 언어와 프레임워크에 대한 예제 템플릿들은 다음 링크에서 확인하실 수 있습니다:
https://github.com/orgs/msa-ez/repositories?q=template&type=all&language=&sort= 

### 템플릿 변경하기 

다른 언어/프레임워크의 템플릿으로 변경하려면 코드 미리보기 창 상단에서 간단히 선택할 수 있습니다.

![스크린샷 2023-05-16 오후 4 51 55](https://github.com/kykim97/factory-pattern/assets/113568664/452ddc05-9e5d-44e6-84fc-27a38842973a)

예를 들어, 기존의 Spring Boot 템플릿을 Axon Framework 템플릿으로 변경한 후에는 Aggregate 파일에서 변경 사항이 발생합니다.

> Axon 템플릿이 적용된 AggregateRoot.java
![스크린샷 2023-05-16 오후 5 17 09](https://github.com/kykim97/factory-pattern/assets/113568664/a969cc29-1612-4900-b42a-524ba3ceb5ac)

>FileAggregate.java
![스크린샷 2023-05-16 오후 5 17 54](https://github.com/kykim97/factory-pattern/assets/113568664/f3454a75-15e1-45c7-918c-55f70cfc3b6e)

이렇게 하나의 파일 내에서 각 언어/프레임워크의 특성에 따라 적용할 어노테이션 및 가져올 디펜던시들의 종류가 변경되어, 결과적으로 선택한 언어/프레임워크에 맞게 전체 프로젝트가 변경됩니다.