---
description: ''
sidebar: 'started'
---
# Contract Test (비동기호출)

## Consumer Driven Contract Test
Contract Test는 분산된 마이크로서비스간 테스트를 진행할 때, Consumer측에서 상호간의 계약서를 토대로 테스트를 진행하여 API의 일관성을 유지하며 테스트를 진행하는 방법입니다. <br>

계약서를 토대로 테스트가 진행됨에 따라 분산환경에서 개발상의 통신 오류 발생이 감소하고 문서화되어 상호간 테스트에 대한 이해력이 높아진다는 장점이 있습니다.

## 적용 방법

### STEP1. 모델링
Provider의 Biz 로직이 Message Broker에 이벤트를 제대로 Pubish하는지 테스트 하기 위해 아래와 같이 모델링을 진행합니다.
<img width="823" alt="image" src="https://github.com/user-attachments/assets/fadc46cf-6105-41d0-8402-6eaeb8d824e3">

### STEP2. EXAMPLES

시나리오를 토대로 Inventory(Given) stock이 OrderPlaced(When)에 의해서 StockDecreased(Then) 이벤트로 발행되는 예제를 아래와 같이 생성합니다.
![image](https://github.com/msa-ez/topping-cdc-test/assets/123912988/e25607cd-f232-4cde-bda8-bbaa7db5286b)

### STEP3. Topping 적용
Code > Code Preview를 클릭하여 좌측 상단에 Base: spring-boot가 선택되어 있는지 확인합니다. <br>
*spring-boot가 아닐 경우 spring-boot 클릭 > Marketplace 클릭 > Template > Spring-boot > Apply로 spring-boot를 적용합니다. <br>
우측 상단 Toppings > Marketplace를 클릭하여 아래와 같은 화면으로 진입합니다. <br>
![](https://github.com/user-attachments/assets/58b2c46c-1155-4340-bbfe-8372830bbecb)

상단의  'TOPPINGS' > 'Contract Test' > Apply 클릭을 통해 토핑을 적용합니다. <br>

적용 후, 주문 서비스 최상위루트에 생성된 getInventory.groovy를 확인하면 Provider측에 제공할 계약서가 아래와 같이 생성된것을 확인할 수 있습니다.

```
package contracts.messaging
import org.springframework.cloud.contract.spec.Contract

Contract.make {
    // The Identifier which can be used to identify it later.
    label 'OrderPlaced'
    input {
        // Contract will be triggered by the following method.
        triggeredBy('orderPlaced()')
    }
    outputMessage {
        sentTo 'eventTopic'
        // Consumer Expected Payload spec. that a JSON message must have, 
        // If the Producer-side test is OK, then send the following msg to event-out channel.
        body(
            eventType: "OrderPlaced",
                id: 1,
                customerId: "1",
                productId: "1",
                productName: "TV",
                qty: 5,
        )
        bodyMatchers {
            jsonPath('$.id', byRegex(nonEmpty()).asLong())
            jsonPath('$.customerId', byRegex(nonEmpty()).asString())
            jsonPath('$.productId', byRegex(nonEmpty()).asString())
            jsonPath('$.productName', byRegex(nonEmpty()).asString())
            jsonPath('$.qty', byRegex(nonEmpty()).asInteger())
        }
        headers {
            messagingContentType(applicationJson())
        }
    }
}
```

## 실행 방법

### STEP1. 계약 체결 및 테스트 실행

Consumer인 inventory에 생성된 contract계약서를 Provider인 order에 제공하기 위해, order 서비스의 test/resources/contracts/messaging 폴더에 복사를 진행합니다. <br>

복사 후, Provider측에서 다음과 같이 명령어를 입력하여 배포를 위한 빌드 테스트를 진행합니다.

```
cd order
mvn clean test
```

주문서비스 로직실행 결과 도메인 이벤트가 정상적으로 퍼블리쉬하면서 테스트가 성공적으로 실행된다.
![image](https://github.com/msa-ez/topping-cdc-test/assets/123912988/a95ac124-3055-442c-b38c-f1c6ab73f5d7)

Test가 성공하여 주문팀과 상품팀이 계약한 Contract를 Provider인 주문팀이 Contract를 준수하고 있음을 확인할 수 있습니다.

테스트 후, stub 파일을 제공하기 위해 order서비스에서 다음과 같은 명령어를 입력하여 stub 파일을 Maven 라이브러리에 배포합니다.
```
mvn install
```

### STEP2. Consumer 테스트 실행
order 서비스의 테스트를 통해 생성된 stub 파일을 갖고 상품 컨슈머의 최종 테스트를 수행합니다.

```
cd inventory
mvn clean test
```	
테스트가 성공적으로 수행되었음을 확인할 수 있습니다.
![image](https://github.com/msa-ez/topping-cdc-test/assets/123912988/5cb3539e-5981-48ee-93de-66f8de1713a8)


이와 같이 상품서비스가 참조하는 주문 서버가 현행화되어 Consumer인 상품서비스에서도 Contract를 준수하고 있음을 확인할 수 있습니다.