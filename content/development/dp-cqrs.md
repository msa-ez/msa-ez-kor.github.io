---
description: ''
sidebar: 'started'
prev: ''
next: ''
---

# Data Projection with CQRS

<div style="position: relative; padding-bottom: 56.25%; padding-top: 0px; height: 0; overflow: hidden;">
	<iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
        src="https://www.youtube.com/embed/ZJpTEeKsbF4" 
        frameborder="0" crolling="no" frameborder="none" allowfullscreen="">
    </iframe>
</div>
<br>

주문서비스와 배송서비스의 상세 모델을 참조하여 Query 모델(Materialized View)을 설계합니다.

## 이벤트스토밍 모델 준비

- 아래 모델을 새 탭에서 로딩합니다.
[모델 링크](https://www.msaez.io/#/storming/labcqrs-231022)
- 브라우져에 모델이 로딩되지 않으면, 우측 상단의 (사람모양) 아바타 아이콘을 클릭하여 **깃헙(Github)** 계정으로 로그인 후 리로드하면 아래처럼 랩에 필요한 이벤트스토밍 기본 모델이 출력됩니다. 
- 로딩된 모델은 우측 팔레트 영역에 스티커 목록이 나타나지 않습니다. 상단 메뉴영역에서 포크 아이콘(FORK)을 클릭해 주어진 모델을 복제합니다. 

![image](https://github.com/acmexii/demo/assets/35618409/c9a4575c-d8e2-424b-9587-7ca789dca2e1)
- 우측 팔레트 영역에 스티커 목록들이 나타나는 것이 확인됩니다.

## CQRS 모델링 

- 고객센터팀이 신설되어 '마이페이지' 서비스를 런칭합니다고 가정합니다.
- 주문서비스와 배송서비스의 상세 모델을 참조하여 Query 모델(Materialized View)을 설계합니다.

### MODELING
- customercenter BC 를 추가
- Read Model 녹색 스티커 추가('MyPage')
- Read Model 속성 Define

> Long orderId 

> String productId

> String deliveryStatus

> String orderStatus

<img width="982" alt="image" src="https://user-images.githubusercontent.com/487999/191055790-5d6a529f-e2f7-49ab-8ee0-74d371f06090.png">

- Read Model CRUD 상세설계

<img width="434" alt="image" src="https://user-images.githubusercontent.com/487999/191056403-fbdec62b-42ea-4261-8e4e-b631c6c6779a.png">

### Code Preview 
- 상세 설계가 끝난 View Model 코드를 리뷰합니다.
- 내 Github으로 Push 하고, GitPod 환경에 로딩합니다.

### Complete Service codes
- 배송 마이크로서비스의 도메인 코드를 완성합니다.
- Delivery.java > addToDeliveryList Port method
```
Delivery delivery = new Delivery();
delivery.setAddress(orderPlaced.getAddress());
delivery.setQuantity(orderPlaced.getQty());
delivery.setCustomerId(orderPlaced.getCustomerId());
repository().save(delivery);
```

- 고객 마이크로서비스의 MyPage.java의 Id 자동생성을 설정합니다.
```
 @GeneratedValue(strategy=GenerationType.AUTO)  // 주석해제
```

### 마이크로서비스 실행
- 주문, 배송, 고객센터 마이크로서비스를 각각 실행합니다.
```
mvn spring-boot:run
```
- customer-center 에 오류가 발생합니다면 다음 ViewHandler.java 부분의 구현체를 확인합니다 : (findByOrderId --> findById)
```
    @StreamListener(KafkaProcessor.INPUT)
    public void whenDeliveryStarted_then_UPDATE_1(@Payload DeliveryStarted deliveryStarted) {
        try {
            if (!deliveryStarted.validate()) return;
                // view 객체 조회
            Optional<MyPage> myPageOptional = myPageRepository.findById(deliveryStarted.getOrderId());

            if( myPageOptional.isPresent()) {
                 MyPage myPage = myPageOptional.get();
            // view 객체에 이벤트의 eventDirectValue 를 set 함
                myPage.setDeliveryStatus("Started");    
                // view Repository에 save
                 myPageRepository.save(myPage);
                }


        }catch (Exception e){
            e.printStackTrace();
        }
    }

```
- 주문 1건을 등록한 후, MyPage 의 내용을 확인합니다
```
http :8082/orders productId=1 qty=1
http :8085/myPages
```
- 배송서비스(8084)를 다운시킨 다음, MyPage 의 내용을 확인하여도 서비스가 안정적임을 확인합니다. 