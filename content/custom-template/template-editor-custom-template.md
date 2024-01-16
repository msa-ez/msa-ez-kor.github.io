---
description: ''
sidebar: 'started'
---
# 커스텀 템플릿 생성 방법

MSAEZ 모델을 기반으로 커스텀 템플릿을 개발하는 과정을 설명드리겠습니다.

## 1. Repository 생성

커스텀 템플릿을 개발하기 위해서는 저장소를 생성해야합니다.

https://github.com/ 에 접속 후, 템플릿 파일을 만들 repository를 생성합니다.

![](https://github.com/msa-ez/platform/assets/123912988/b6f49e7b-4674-47a5-8ed9-69caf94fac64)

예시에서는 사용할 템플릿 언어를 제목에 포함하여 'custom-spring-boot'로 생성하였습니다.

## 2. 템플릿 선택

생성한 repository의 url을 기반으로 코드 프리뷰 화면에서 템플릿을 등록해야 합니다.

![](https://github.com/msa-ez/platform/assets/123912988/0d2651bd-2082-413b-8536-2f8f08b9aeb1)

위의 예시처럼 먼저 코드 프리뷰 좌측 상단에 위치한 template chip을 클릭해서 템플릿 선택 화면으로 이동해야합니다.

이후 목록에서 Custom Template 우측에 위치한 'select'버튼을 클릭하면 git repository url을 입력할 수 있는 화면이 나타납니다.

여기에 이전 단계에서 생성한 repository의 url을 입력 후, 'APPLY' 버튼을 클릭하여 적용할 수 있습니다.

적용이 완료되었다면 'Edit Template' 아이콘을 클릭하여 Template Editor 화면으로 진입합니다.

Template Editor란 MSAEZ내에 내장되어 있는 템플릿 편집기능으로 선택한 템플릿 파일의 코드를 변경하였을 때, 변환된 결과값을 즉각적으로 확인할 수 있는 기능을 제공하고 있습니다.

## 3. 폴더 생성 및 파일 생성

Template Editor 화면에 진입한 후 좌측 하단의 Template Explorer를 확인하면 폴더와 파일이 아무것도 생성되어있지 않은 것을 확인할 수 있습니다.

템플릿은 각 개발 언어에서 요구하는 폴더 구 및 파일이 있기 때문에 템플릿 파일과, 템플릿 파일을 구성할 폴더를 생성하여 구조를 구성해야합니다.

![](https://github.com/msa-ez/platform/assets/123912988/1f82fd51-e869-4437-9059-b9615111da36)

기본적인 구조를 잡기 위해 폴더를 생성하도록 하겠습니다. 위의 예시처럼 좌측의 Template Explorer에서 선택한 템플릿 이름의 우측에 위치한 폴더 생성 아이콘을 클릭하여 폴더를 생성할 수 있습니다.

![](https://github.com/msa-ez/platform/assets/123912988/13e15099-475b-4fd7-8a26-cce064ee3b31)

예시에서는 spring-boot의 폴더 구조를 참고하여 생성하였습니다.

이후 domain 폴더 하위에 템플릿 파일을 생성해보겠습니다. 

폴더 하위에 파일을 생성하기 위해 폴더의 이름을 클릭한 후, 우측의 파일 생성 아이콘을 클릭하여 파일을 생성할 수 있으며 아래와 같이 Aggregate.java 파일을 생성할 수 있습니다.

![](https://github.com/msa-ez/platform/assets/123912988/0d277770-5dcd-44c0-b2eb-334077e25a67)

## 4. 템플릿 데이터 확인

MSAEZ에서 모델링을 진행하면 그에 따른 참조할 수 있는 데이터가 생성되고, 데이터를 통해 템플릿 파일의 코드를 구성하는데 활용할 수 있습니다.

아래의 예시처럼 Template Editor 좌측 상단 영역의 'MODEL EXPLORER'에서 모델링을 통해 생성된 데이터를 확인할 수 있습니다.

![](https://github.com/msa-ez/platform/assets/123912988/1181c8a3-636f-4777-9552-ce7d9670ea30)