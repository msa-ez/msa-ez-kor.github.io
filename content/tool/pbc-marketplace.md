---
description: ''
sidebar: 'started'
---

# PBC(Packaged Business Capability)

## 개요

마이크로서비스 아키텍처에서 비즈니스 기능의 재사용과 효율적인 통합은 중요한 과제입니다. 특히 자주 사용되는 비즈니스 기능을 매번 새롭게 구현하는 것은 시간과 리소스의 낭비를 초래할 수 있습니다.

**PBC**는 사전에 구현된 비즈니스 기능을 캡슐화하여 재사용 가능한 형태로 제공함으로써, 개발 생산성을 높이고 일관된 비즈니스 로직 구현을 가능하게 합니다.

분석/설계 단계에서 선택된 PBC는 구현 단계에서 자동으로 코드로 변환되며, 생성된 폴더의 ReadMe 파일에서 제공하는 가이드라인을 따라 손쉽게 구현을 완료할 수 있습니다. 이를 통해 개발자는 핵심 비즈니스 로직 구현에 더 집중할 수 있으며, 검증된 기능을 재사용함으로써 개발 품질도 향상시킬 수 있습니다.

## 적용 방법

### 분석/설계
<img src="https://github.com/user-attachments/assets/65776833-d7c3-4b85-907c-3be91150ff9e">
<br>
<img src="https://github.com/user-attachments/assets/3d1d97e4-8a22-48db-b387-3b8e9d9a547a">
<br>
1. 이벤트스토밍 모델 캔버스의 좌측 팔레트에서 PBC를 Drag&Drop하여 MSAEZ에서 제공하는 기존 PBC 리스트에서 원하는 기능을 선택하고 적용할 수 있습니다. 

<br><br>
<img src="https://github.com/user-attachments/assets/d1d490c7-31f9-4f86-b381-944ea7b1d5b1">
<br>
2. 빈 화면으로 나오는 PBC모델을 더블 클릭합니다.

<br><br>
<img src="https://github.com/user-attachments/assets/734cfc8e-4f9b-4c04-bf63-910ac1729a44">
<br>
<img src="https://github.com/user-attachments/assets/549ce424-3a48-41ce-8517-e8c59b3a197c">
<br>
3. 옵션으로 읽기, 커맨드, 이벤트 요소를 선택할 수 있는데, 각각의 옵션들은 이벤트스토밍에서 ReadModel, Command, Event을 뜻합니다.

<br><br>
<img src="https://github.com/user-attachments/assets/9b8499b7-158d-4776-a966-2450792f7f8e">
<br>
4. 옵션 창을 닫으면 선택한 옵션들에 대한 모델들이 나오는 것을 확인할 수 있습니다.

### 구현
<img src="https://github.com/user-attachments/assets/876e2ee9-16c6-43d5-8bef-fd3f62979c2e">
<br>
1. 코드뷰어를 열면 Review라는 폴더가 생성되고, 생성된 폴더에 있는 ReadMe파일의 instruction대로 따라하시면 구현레벨까지 생성이 됩니다. 

<br><br>
<img src="https://github.com/user-attachments/assets/7024c1e0-5deb-42ca-8e90-5fc3b7567488">
<br>
2. 이렇게 구현된 화면을 확인할 수 있습니다.