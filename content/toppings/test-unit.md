---
description: ''
sidebar: 'started'
---
# Unit-Test

## Unit Test
Unit Test(단위 테스트)는 소프트웨어 개발 과정에서 개별 함수 단위의 기능을 검증하는 테스트 방법입니다. 함수가 수행됨에 따라 생성되는 결과에 대하여 Given-When-Then 패턴을 사용하여 특정 함수에 대한 테스트를 효율적으로 수행할 수 있습니다. <br>

Unit Test를 활용하여 코드 품질을 향상할 수 있으며, 테스트 작성 과정에서 코드의 구조와 인터페이스를 개선할 수 있다는 장점이 있습니다.

## 적용 방법

### STEP1. 모델링
재고팀에 설정된 상품이 주문팀에서 발생된 주문의 수량에 따라 재고가 감소하는 시나리오를 토대로 아래와 같이 모델링을 진행합니다.
![](https://github.com/kyusooK/lab-shop-unit-test/assets/123912988/b5a52c0a-916b-4f60-8bb4-43524ddf033c)

### STEP2. EXAMPLES
Policy(decrease stock)스티커를 더블 클릭 > 우측 패널 'EXAMPLES' 클릭하면 Given-When-Then 패턴의 예제를 작성할 수 있는 다이얼로그가 나타나는 것을 확인할 수 있습니다.

시나리오를 토대로 Inventory(Given)의 stock이 OrderPlaced(When)에 의해서 StockDecreased(Then) 이벤트로 발행되는 예제를 아래와 같이 생성합니다.
![](https://github.com/kyusooK/lab-shop-unit-test/assets/123912988/7382fa38-1902-4471-a4ec-782789f54367)

### STEP3. Topping 적용
Code > Code Preview를 클릭하여 좌측 상단에 Base: spring-boot가 선택되어 있는지 확인합니다. <br>
*spring-boot가 아닐 경우 spring-boot 클릭 > Marketplace 클릭 > Template > Spring-boot > Apply로 spring-boot를 적용합니다. <br>
우측 상단 Toppings > Marketplace를 클릭하여 아래와 같은 화면으로 진입합니다. <br>
![](https://github.com/user-attachments/assets/58b2c46c-1155-4340-bbfe-8372830bbecb)

상단의 'TOPPINGS' > 'Unit Test for Microservices' > Apply로  Unit test 토핑을 적용합니다. <br>

적용 후, inventory/src/test를 확인하면 'DecreaseStockTest.java'파일이 생성되며 'EXAMPLES'에서 작성한 given, when, then에 따른 코드가 아래와 같이 생성된것을 확인할 수 있습니다.

```
public void test0() {
        //given:
        Inventory entity = new Inventory();

        entity.setId(1L);
        entity.setStock(10);

        repository.save(entity);

        //when:

        OrderPlaced event = new OrderPlaced();

        event.setId(1L);
        event.setProductId("1");
        event.setQty(5);
        event.setCustomerId("Customer1");

        InventoryApplication.applicationContext = applicationContext;

        ObjectMapper objectMapper = new ObjectMapper();
        try {
            String msg = objectMapper.writeValueAsString(event);

            processor
                .inboundTopic()
                .send(
                    MessageBuilder
                        .withPayload(msg)
                        .setHeader(
                            MessageHeaders.CONTENT_TYPE,
                            MimeTypeUtils.APPLICATION_JSON
                        )
                        .setHeader("type", event.getEventType())
                        .build()
                );

            //then:

            Message<String> received = (Message<String>) messageCollector
                .forChannel(processor.outboundTopic())
                .poll();

            assertNotNull("Resulted event must be published", received);

            StockDecreased outputEvent = objectMapper.readValue(
                received.getPayload(),
                StockDecreased.class
            );
            LOGGER.info("Response received: {}", received.getPayload());

            assertEquals(String.valueOf(outputEvent.getId()), "1");
            assertEquals(String.valueOf(outputEvent.getStock()), "5");
        } catch (JsonProcessingException e) {
            // TODO Auto-generated catch block
            assertTrue("exception", false);
        }
    }
```

## 실행 방법

### STEP1. 테스트 로직 생성
생성된 'DecreaseStockTest.java'의 테스트를 진행하기 위해서는 inventory서비스에 테스트가 이루어질 로직이 존재해야 합니다. <br>

Inventory.java' > decreaseStock()의 로직을 다음과 같이 수정합니다. <br>

```
repository().findById(Long.valueOf(orderPlaced.getProductId().substring(orderPlaced.getProductId().length() - 1))).ifPresent(inventory->{
        inventory.setStock(inventory.getStock() - orderPlaced.getQty()); // do something
        repository().save(inventory);

        StockDecreased stockDecreased = new StockDecreased(inventory);
        stockDecreased.publishAfterCommit();
});
```

### STEP2. 서비스 테스트
DecreaseStockTest파일과 inventory서비스에 생성한 로직을 통해 테스트를 진행하기 위해 터미널에 다음과 같은 명령어를 입력합니다.

```
cd inventory
mvn test
```

테스트가 실행되면 생성한 로직을 토대로 테스트 파일의 given, when, then이 정상 처리 되는지 검증하며, 테스트가 성공되면 아래와 같이 Build Success가 출력된 것을 확인할 수 있습니다. <br>

![](https://github.com/kyusooK/lab-shop-unit-test/assets/123912988/414f2a38-3bf9-4323-b721-a6d47dcb5fe1)