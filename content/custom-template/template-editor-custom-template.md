---
description: ''
sidebar: 'started'
---
# 커스텀 템플릿 생성 방법

MSAEZ 모델을 기반으로 커스텀 템플릿을 개발하는 과정입니다.

## 1. Repository 생성

커스텀 템플릿을 개발하기 위해서는 저장소를 생성해야합니다.
<a href="https://github.com/" target="_blank" class="link-open-text">https://github.com/</a> 에 접속 후, 템플릿 파일을 만들 repository를 생성합니다.

![](https://github.com/msa-ez/platform/assets/123912988/b6f49e7b-4674-47a5-8ed9-69caf94fac64)

예시에서는 사용할 템플릿 언어를 제목에 포함하여 'custom-spring-boot'로 생성하였습니다.

## 2. 템플릿 선택

생성한 repository의 url을 기반으로 코드 프리뷰 화면에서 템플릿을 등록하는 방법은 다음과 같습니다.

![](https://github.com/msa-ez/platform/assets/123912988/8c74d617-3af6-495d-aed8-a055f582513c)

1. template chip 클릭

2. 템플릿 목록중 Cutsom Template 우측의 select chip 클릭

3. Git Repo URL 영역에 git repository url을 입력 후, APPLY 클릭

적용이 완료되었다면 코드 프리뷰 상단의 메뉴인 'Edit Template' 아이콘({})을 클릭하여 Template Editor 화면으로 진입합니다.

Template Editor란 MSAEZ내에 내장되어 있는 템플릿 편집기능으로 선택한 템플릿 파일의 코드를 변경하였을 때, 변환된 결과값을 즉각적으로 확인할 수 있는 기능을 제공하고 있습니다.

## 3. 폴더 생성 및 파일 생성

Template Editor 화면에 진입한 후 좌측 하단의 Template Explorer를 확인하면 폴더와 파일이 아무것도 생성되어있지 않은 것을 확인할 수 있습니다.

템플릿은 각 개발 언어에서 요구하는 폴더 구조 및 파일이 있기 때문에 템플릿 파일과, 템플릿 파일을 구성할 폴더를 생성하여 구조를 구성해야합니다.

Spring-boot 폴더 구조를 참고하여 폴더와 domain폴더 하위에 생성될 파일 Aggregate.java를 github에서 생성하는 방법은 다음과 같습니다.

![](https://github.com/msa-ez/platform/assets/123912988/2c01c3b4-27d8-45bc-bb2e-0ac601c0034c)

1. Add File 클릭 > Create New File 선택.

2. 'Name your file' 입력창에 Spring-boot의 폴더 구조인 '/src/main/java/com/example/domain'을 입력 > domain하위에 생성할 파일 이름 Aggregate.java 입력.

3. 'Commit Changes...' 클릭하여 폴더 및 파일 저장.

위의 단계를 진행하면 입력한 폴더구조와 domain하위의 Aggregate.java가 생성된 것을 확인할 수 있습니다.


## 4. 템플릿 객체 속성 확인

MSAEZ에서 모델링을 진행하면 그에 따른 참조할 수 있는 속성들이 생성되고, 이를 통해 템플릿 파일의 코드를 구성하는데 활용할 수 있습니다.

아래의 예시처럼 Template Editor 좌측 상단 영역의 'Model Explorer'에서 모델링을 통해 스티커별 생성된 속성에 대해 확인할 수 있습니다.

![](https://github.com/msa-ez/platform/assets/123912988/8ab41ce8-7ee0-4d25-ab1b-c2d4021ff19a)

## 5. 템플릿 파일 수정

Template Editor 중앙의 영역에 위치한 'EDIT TEMPLATE'에는 생성한 파일에 선언한 코드가 나타나며 아래와 같이 확인할 수 있습니다.

![](https://github.com/kyusooK/custom-spring-boot/assets/123912988/5e62a6b3-0d18-4b84-a5dd-f14f44835f81)

이 위치에 Model Explorer에서 참조한 속성들을 이용하여 템플릿 코드를 선언한 뒤, 상단의 재생버튼을 클릭하면 우측 영역에 변환된 코드들을 확인할 수 있으며,
이를 이용하여 변환된 결과값을 실시간으로 확인하며 수정할 수 있습니다.