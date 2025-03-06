---
description: ''
sidebar: 'started'
---

# 컴포저블 엔터프라이즈 구현을 위한 PBCs(Packaged Business Capabilities)

## 개요

<!-- 마이크로서비스 아키텍처에서 비즈니스 기능의 재사용과 효율적인 통합은 중요한 과제입니다. 특히 자주 사용되는 비즈니스 기능을 매번 새롭게 구현하는 것은 시간과 리소스의 낭비를 초래하는데, 이러한 문제를 해결하기 위해 Packaged Business Capabilities(PBC) 기능을 추가하였습니다. -->

**PBC**는 이미 구현된 특정 비즈니스 기능을 독립적인 모듈로 패키징하여 제공하는 개념으로, 마치 비즈니스 기능을 조립할 수 있는 블록처럼 모듈화한 것으로 볼 수 있습니다.

**MSAEZ**는 도메인 중심 설계 모델링(이벤트스토밍, Eventstorming)에 PBC 마켓플레이스를 추가해 마이크로서비스를 더욱 효과적으로 구성하고, 비즈니스 로직을 유연하게 조합할 수 있게 되었습니다. 분석/설계 단계에서 선택된 PBC는 이미 비즈니스 로직과 UI 구현이 완료된 상태로 제공되어, 개발자는 별도의 코딩 없이도 즉시 사용 가능한 완성된 기능 모듈을 조합하여 서비스를 구축할 수 있습니다.

이를 통해 알림 시스템, 사용자 리뷰 관리, 결제 처리와 같은 복잡한 기능도 검증된 방식으로 빠르게 구현할 수 있어 개발 품질 향상과 업무 효율화를 동시에 달성할 수 있습니다.

## 수행 방법
복잡한 결제 처리 기능도 검증된 모듈로 쉽게 적용할 수 있는 방법을 **결제 PBC 적용 예시**를 통해 설명하겠습니다. 특히 차량호출 서비스에서 운행이 완료되었을 때 사용자가 요금을 토대로 결제를 진행할 수 있도록 하는 분석/설계, 구현 방법을 상세히 살펴보겠습니다.

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