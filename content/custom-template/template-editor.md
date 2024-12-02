---
description: ''
sidebar: 'started'
---
# Template Editor

[커스텀 템플릿 생성](/custom-template/template-editor-custom-template/)을 통해 Template Editor를 활용하는 방법에 대해서 설명하였습니다.

이번에는 MSAEZ에 내장된 템플릿을 활용하여 Template Editor 기능을 사용하는 방법입니다.


![](https://github.com/msa-ez/platform/assets/123912988/cc4af1ed-58eb-4829-b571-8fd11fbe1dc0)

먼저 모델링을 완료한 모델의 코드 프리뷰를 열어 좌측의 'Base'버튼을 클릭하여 MSAEZ에 내장된 Template을 선택할 수 있으며, 예시에서는 spring-boot 템플릿을 선택하였습니다.

![](https://github.com/msa-ez/platform/assets/123912988/5d2ff91f-2992-474f-9104-094e6aa9dd68)

이후 좌측 상단에 위치한 Edit Template 아이콘을 클릭하면 Template Editor 화면에 접근하여 기능을 사용할 수 있습니다.

## 템플릿 파일 선택

선택한 템플릿의 코드를 수정하기 위해서는 우선 템플릿 파일을 선택해야 합니다.

![](https://github.com/msa-ez/platform/assets/123912988/d9680e6b-6a13-4f18-be78-6cf12320b442)

위의 사진처럼 Template Editor 화면 좌측에 위치한 'Template Explorer' 목록에서 선택한 템플릿에 대한 폴더 및 파일을 확인할 수 있습니다.

여기서 수정할 템플릿 파일이 존재하는 경로로 이동하여 템플릿 파일을 선택할 경우 'EDIT TEMPLATE' 영역에 선택한 템플릿 파일의 코드가 변경되어 화면에 노출되는 것을 확인할 수 있습니다.

## 템플릿 코드 수정

![](https://github.com/msa-ez/platform/assets/123912988/f77e8e08-fa7c-4ce6-bf23-acc59c2a703c)

이전 템플릿 파일 선택 단계에서 선택한 Aggregate.java의 템플릿 코드가 'EDIT TEMPLATE' 영역에 노출된 것을 확인할 수 있습니다.

이제 해당 영역에서 템플릿 코드를 원하는 대로 수정 가능합니다.

이제 좌측의 'Model Explorer'를 참조하여 클래스 내부에 {{keyFieldDescriptor.name}} 데이터가 생성되도록 추가해보겠습니다.

![](https://github.com/msa-ez/platform/assets/123912988/bd096c0e-d7b9-473d-bd90-21ab2b34b8b8)

위의 사진처럼 클래스 내부에 데이터를 추가한 후 우측 상단의 실행 버튼을 클릭하면 'EDIT TEMPLATE' 영역에 선언된 코드를 기준으로 변경된 결과값을 확인할 수 있습니다.

## 변환된 파일 확인

'EDIT TEMPLATE'에서 코드를 수정하여 변환을 진행하면 아래의 예시처럼 우측 영역에 변환된 결과값이 나타나는 것을 확인할 수 있습니다.

![](https://github.com/msa-ez/platform/assets/123912988/7ef625b5-511e-41c9-8ab7-2c4172f03edc)

여기서 우측 상단의 'selected file'을 확인할 수 있는데, 'selected file'은 모델링한 스티커별 변환된 파일의 종류를 확인할 수 있습니다.

![](https://github.com/msa-ez/platform/assets/123912988/b327bc57-3d63-49f2-a906-a111b3c73f4d)

예시에서는 모델링 단계에서 생성한 Aggregate 스티커 Order와 Delivery에 대한 파일이 생성되었습니다.

여기서 파일을 선택하면 선택한 파일의 변환된 코드를 확인할 수 있어 각 파일별 생성된 결과값에 대해서 확인할 수 있습니다.

## 수정된 파일 변경

이전 단계들을 거쳐 수정된 템플릿을 통해 새로운 템플릿 repository를 생성하거나 혹은 기존의 템플릿 repository를 수정할 수 있습니다.

![](https://github.com/msa-ez/platform/assets/123912988/45263853-6e02-42ce-a8f2-103547102032)

먼저, 좌측 하단에 위치한 Edited Template Files에 자신이 수정한 Template을 선택합니다.

이후, 우측으로 스크롤을 이동하면 'open git Menu' 아이콘을 확인할 수 있습니다.

![](https://github.com/msa-ez/platform/assets/123912988/c099e3ee-10b5-4016-9cbf-168ecb5f90ac)

위의 사진처럼 아이콘을 클릭하면 github 본인 계정의 repository에 생성할 수 있습니다.

repository의 이름을 위의 예시처럼 목적에 맞게 이름을 변경한 후, 'Create' 버튼을 클릭하면 github repository에 설정한 이름으로 생성된 것을 확인할 수 있습니다.