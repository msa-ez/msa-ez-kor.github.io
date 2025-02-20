---
description: ''
sidebar: 'started'
---

# PBC(Packaged Business Capability)

## 개요

마이크로서비스 아키텍처에서 비즈니스 기능의 재사용과 효율적인 통합은 중요한 과제입니다. 특히 자주 사용되는 비즈니스 기능을 매번 새롭게 구현하는 것은 시간과 리소스의 낭비를 초래할 수 있습니다.

**PBC**는 사전에 구현된 비즈니스 기능들을 재사용 가능한 패키지로 제공하여, 개발 생산성을 높이고 일관된 비즈니스 로직 구현을 가능하게 합니다.

분석/설계 단계에서 선택된 PBC는 구현 단계에서 자동으로 코드로 변환되며, 생성된 폴더의 ReadMe 파일에서 제공하는 가이드라인을 따라 손쉽게 구현을 완료할 수 있습니다. 이를 통해 개발자는 핵심 비즈니스 로직 구현에 더 집중할 수 있으며, 검증된 기능을 재사용함으로써 개발 품질도 향상시킬 수 있습니다.

특히 복잡한 알림 시스템, 사용자 리뷰 관리, 안전한 결제 처리와 같은 기능들을 PBC를 통해 빠르고 안정적으로 구현할 수 있어 개발자의 부담을 크게 줄여줍니다.

## 수행 방법

**결제 PBC 적용을 통한 차량호출 서비스에서 운행이 완료되었을 때 사용자가 요금을 토대로 결제를 진행할 수 있도록 하는 분석/설계, 구현파트의 구현방법은 다음과 같습니다.**

### 분석/설계
<img src="https://github.com/user-attachments/assets/ca1c696d-5966-4e0f-96e7-b01290aa9580">
<br>
<img src="https://github.com/user-attachments/assets/37e2cf82-d288-4dc5-a15b-55eeaaab1cb8">
<br>
1. 이벤트스토밍 모델 캔버스의 좌측 팔레트에서 PBC를 Drag&Drop하여 MSAEZ에서 제공하는 기존 PBC 리스트에서 원하는 기능을 선택하고 적용할 수 있습니다.
<br>(결제시스템이 필요한 상황이니 marketplace에서 payment-system을 적용)

<br><br>
<img src="https://github.com/user-attachments/assets/9488fafe-6a75-4d21-82bc-e2cbffe4b28f">
<br>
2. 배차 boundedContext 하단에 PaymentSystem이라는 PBC 초안이 생성되면, 빈 화면으로 나오는 PBC모델을 더블 클릭합니다.

<br><br>
<img src="https://github.com/user-attachments/assets/afa80621-332a-4091-83a5-db6a8e6c941f">
<br>
3. PBC 패널에서 PBC 모델에 구현된 기능과 관련된 ReadModel, Command, Event 스티커를 선택할 수 있는데, 이 중 해당 서비스에 사용될 기능과 관련된 스티커를 선택합니다.

<br><br>
<img src="https://github.com/user-attachments/assets/a73d5064-99ac-42fa-9bde-a3985128ed8a">
<br>
4. PBC 패널 창을 닫으면 선택된 스티커만 가져온 것을 확인할 수 있고, 위 화면과 같이 PaymentSystem에 대한 PBC모델 생성이 완료되는 것을 확인할 수 있습니다.

<br><br>
<img src="https://github.com/user-attachments/assets/21b45119-386c-4abe-9632-9a1106fb395c">
<br>
5. 이후, 기존 마이크로서비스와 PBC간의 통신이 가능하도록 relation을 연결하여 결제가 완료되면 운행정보에서 결제상태와 결제 ID에 대한 정보를 업데이트하고 추후 영수증 조회가 가능하도록 처리합니다.

<br><br>
<img src="https://github.com/user-attachments/assets/17a1fdce-2bd4-4162-914c-5c1c6b2b1fed">
<br>
<차량호출 서비스에 결제시스템 PBC를 적용한 전체 모델 화면>

### 구현
<img src="https://github.com/user-attachments/assets/30785661-a184-429f-97a9-a07b6afbe6a7">
<br>
1. 코드뷰어를 열면 PaymentSystem이라는 폴더가 생성되고, 생성된 폴더에 있는 ReadMe파일의 instruction대로 따라하시면 구현레벨까지 생성이 됩니다. 

<br><br>
<img src="https://github.com/user-attachments/assets/67902de5-0f50-446c-b758-f04ae6e07779">
<br>
2. 구현된 UI에서 좌측 하단 결제 버튼을 클릭하면 결제 세부 페이지가 뜨고, 다시 결제를 누르면 PG사에서 제공하는 결제 UI가 나옵니다.

<br><br>
<img src="https://github.com/user-attachments/assets/0e1daf81-7f71-405d-b30d-693a52882ddc">
<br>
3. 결제 완료시 paymentId와 paymentStatus가 등록되며 영수증조회 버튼이 생성되고, 영수증 조회를 클릭한 후 조회 주문번호 입력에 paymentId를 입력 및 조회버튼 클릭시, 결제정보를 확인할 수 있습니다.