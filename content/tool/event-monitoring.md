---
description: ''
sidebar: 'started'
---

# 이벤트 모니터링

<div style="position: relative; padding-bottom: 56.25%; padding-top: 0px; height: 0; overflow: hidden;">
	<iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
        src="https://www.youtube.com/embed/Y3Si5eMNgTM" 
        frameborder="0" crolling="no" frameborder="none" allowfullscreen="">
    </iframe>
</div>
<br>

이벤트 모니터링 기능은 사용자가 이벤트스토밍 모델을 기반으로 만든 애플리케이션의 이벤트 로그를 수집하여 현재 이벤트들의 진행 상황을 모니터링 할 수 있는 기능입니다.

## 이벤트 모니터링 기능의 주요 특징

- 실시간으로 업무 단계를 추적할 수 있어 문제 발생 지점을 즉시 파악하여 해결이 훨씬 수월해집니다.
- 새로운 기능을 추가하거나 시스템 수정 후에도 의도한 대로 작동하는지 쉽게 확인할 수 있습니다. 
- 고유 식별 번호(예: 주문번호)를 기준으로 특정 업무에 대한 모든 처리 단계를 한눈에 파악할 수 있습니다. 
- 이벤트 타입, 발생 시간, 상세 내용 등 각 단계별 상세 정보 확인이 가능합니다.

## 수행 방법

### 데모 - 음식 주문 서비스
- 우측 화면은 좌측의 이벤트스토밍 모델로 구현된 화면으로 모니터링 내용은 좌측 화면에서 담당합니다.

#### Order(사용자의 주문 관리)
1. Order 관리 -> ORDER 등록 버튼을 눌러서 주문 관리에 관한 정보를 입력하여 등록합니다.

![](../../src/img/monitor-01.jpg)

![](../../src/img/monitor-02.jpg)

2. 화면 상단의 모니터 아이콘을 눌러 모니터링 기능을 실행시킵니다.

![](../../src/img/monitor-03.jpg)

3. 고유식별번호인 Correlation Key를 기준으로 필터링된 이벤트들은 이벤트스토밍 도면에서 진행 상태가 표시됩니다.(도면의 번호는 전체 이벤트의 진행 순서를 표시)

![](../../src/img/monitor-04.jpg)

4. 이벤트 목록에서는 이벤트 타입, 이벤트 발생 시간, 이벤트 상세 내용 등을 확인할 수 있습니다.

![](../../src/img/monitor-05.jpg)

#### OrderMgmt(주문 내역 상태 관리)
- 동일한 방법으로 등록되는 모든 이벤트들에 대해 추적, 관리가 가능합니다.
<br><br>

- **Process Order**
  <!-- - 모니터링 페이지에서 주문 내역을 입력한 후 **Process Order** 버튼을 클릭하면 해당 커맨드가 실행되고 OrderPlaced, OrderAccepted 이벤트가 차례로 실행되는 것이 확인됩니다. -->
  <!-- - 우측 구현 화면에서 **Process Order** 버튼을 클릭하면 OrderAccepted 이벤트가 실행됩니다.  -->
  - Order 에서 사용자가 주문하면 OrderPlaced 이벤트가 실행되고, Order info transfer 라는 Policy 로 해당 주문 내역이 OrderMgmt 에 등록됩니다. 
  - 등록된 주문에 대해 **Process Order** 버튼을 클릭하면 process order 라는 커맨드가 OrderAccepted 이벤트를 발생시켜 주문이 처리됩니다.

![](../../src/img/monitor-06.jpg)

![](../../src/img/monitor-07.jpg)

![](../../src/img/monitor-08.jpg)
<br><br>

- **Start Cook**
  - Start Cook 커맨드는 수락된 주문에 대해 조리시 요청 메세지를 입력하고 Start Cook 버튼을 클릭하면 CookStarted 이벤트가 실행되어 주문된 음식 조리가 시작됩니다.

![](../../src/img/monitor-09.jpg)

![](../../src/img/monitor-10.jpg)

![](../../src/img/monitor-11.jpg)
<br><br>

- **Finish Cook**
  - Finish Cook 커맨드는 조리 중인 주문에 대해 조리 완료 메세지를 입력하고 Finish Cook 버튼을 클릭하면 CookFinished 이벤트가 실행되어 주문된 음식 조리가 완료됩니다.

![](../../src/img/monitor-12.jpg)

![](../../src/img/monitor-13.jpg)
