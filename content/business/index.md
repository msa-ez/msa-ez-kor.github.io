---
description: ''
sidebar: 'started'
---
# 12번가 쇼핑몰 예제

## Instruction

주어진 쇼핑몰 시나리오를 기반으로 이벤트스토밍을 수행한다.

## MSA-EZ 모델링 도구 접속
- (크롬) 브라우저를 실행하고 https://www.msaez.io에 접속한다.
- 우측 상단의 (사람모양) 아바타 아이콘을 클릭하여 **반드시** 깃헙(Github) 계정으로 로그인 한다.
- 'NEW' 메뉴의 서브 메뉴 중, 첫번째 'EventStorming'을 클릭한다.
![image](https://github.com/acmexii/demo/assets/35618409/d35919e8-3ff6-4a13-bccc-6935f4d87dbf)

## 기본 시나리오 - 주문 및 주문취소
- 고객 (Customer)이 상품을 선택하여 주문한다 (Place an Order)
- 주문이 되면 상품 배송을 한다.
- 배송이 완료되면 상품의 재고량이 감소한다.
- 고객이 주문을 취소할 수 있다 (Customer can cancel order)
- 주문이 취소되면 배달이 취소된다 (Whenever customer cancel an order, cook or delivery is canceled too)
- 6. 배달이 수거되면 재고량이 증가한다

## 이벤트스토밍

### Step 1. 도메인 이벤트(오렌지 색)
이벤트스토밍의 첫번째 단계는 도메인 이벤트를 붙임으로써 시작된다.

- 시나리오로부터 도메인 이벤트는 시나리오의 서술어(동사)를 기반으로 다음과 같이 추출 가능하다.
> 고객 (Customer)이 상품을 선택하여 주문한다. -> OrderPlaced (주문됨)
> 주문이 되면 상품 배송을 한다. -> DeliveryStarted (배송시작됨)
> 배송이 완료되면 상품의 재고량이 감소한다. -> StockDecreased (재고감소됨)
> 같은 맥락으로 주문취소 프로세스에 대해서도 이벤트 도출 후, 이를 모델링하면 다음과 같다.
![image](https://github.com/acmexii/demo/assets/35618409/f5270052-f6e8-4f2d-82dc-f134ad8e11d6)

### Step 2. 커맨드(하늘색)와 액터(노란색)
도메인 이벤트를 야기시키는 커맨드(하늘색)와 액터(노란색)를 이벤트 스티커 왼쪽에 추가한다.

- 커맨드는 (쉽게는) 이벤트의 현재형으로 휴먼 인터랙션인 주문하다(order), 주문취소하다(cancel order)와 같이 라벨링한다.
- 그리고, 액터를 커맨드 왼쪽에 추가해 페르소나를 식별해 모델에 추가한다.
![image](https://github.com/acmexii/demo/assets/35618409/05681759-4115-42f8-8710-ca0f8f2e1e91)

### Step 3. 폴리시(라일락색)
이벤트에 대한 Reactive한 타스크를 Policy(도메인 정책)라고 하며, 이벤트 오른쪽에 추가한다.

- 해당 이벤트에 따라 순연해서 벌어져야 하는 타스크를 스티커 라벨로 기술한다.
- 이벤트가 ~할때마다, 도메인 내에서 벌어져야 하는 업무를 지칭한다.
> '주문이 되면 상품을 배송한다.' -> Whenever Orderplaced then start Delivery. -> 여기서 'start Delivery'가 폴리시가 된다.
> 이벤트에 대한 폴리시들 추출해 이를 모델링하면 다음과 같다.
![image](https://github.com/acmexii/demo/assets/35618409/3221fabc-39d9-4d8b-ab0f-e14c4c1cb56e)

### Step 4. 어그리게이트(노란색)
커맨드가 도메인 상태변화를 야기하는 저장소로 이벤트의 출처로써, 커맨드와 이벤트 사이에 적절한 이름으로 추가한다.
- 주문(Order), 배송(Delivery), 상품(Product)의 이름으로 어그리게잇을 추가하면 다음과 같다.
> 네이밍은 주문, 또는 주문팀, 또는 주문관리 등 주문정보 저장소를 일컫는 명사형으로 기술하면 된다.
> 어그리게잇 스티커는 유사한 상태변화 스티커들에 걸쳐지도록 아래와 같이 모델링 한다.
![image](https://github.com/acmexii/demo/assets/35618409/6b66213a-f2de-48be-b3f2-5604507238bf)

### Step 5. 바운디드 컨텍스트
서브모듈 단위, 또는 팀단위의 스티커들이 그룹핑이 되도록 경계를 구분한다.

- 팔렛트의 '점선 올가미' 아이콘을 클릭하여 각 팀별 스티커를 감싸도록 확장한다.
- 각 팀별 Bounded Context가 적용된 모델은 다음과 같다.
![image](https://github.com/acmexii/demo/assets/35618409/eac4d230-0ec0-4afc-a414-39e4adbc85e3)

### Step 6. 컨텍스트 매핑
이벤트에 부착된 폴리시 스티커는, 해당 이벤트에 리액티브하게 반응해야 하는 다른 팀의 업무 프로세스이다.

- 각 폴리시를 소관부서(Owner)의 바운디드 컨텍스트로 위치 이동한다.
- 이후, 초기 attach 되어 있던 이벤트와 릴레이션으로 매핑한다.
> 도메인 이벤트를 클릭해 나타나는 화살표를 소관부서로 이동한 폴리시 스티커와 연결한다.
> 컨텍스트 매핑이 적용된 모델은 다음과 같다.
![image](https://github.com/acmexii/demo/assets/35618409/a12fd84d-2a8c-4fc8-a4aa-ddf568b3de42)

