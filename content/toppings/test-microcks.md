---
description: ''
sidebar: 'started'
---
# API Mock Server

## Local Microservice Development Dependencies
Local Microservice Development Dependencies는 마이크로 서비스간 API 호출을 통해 테스트를 진행할 때, 대상 서비스가 실행되지 않을 때에도 Mock서버를 통해 API 호출을 가능하게 하여 테스트 작업을 수행할 때 사용할 수 있습니다.<br>

외부 서비스가 아닌 Mock 서버를 활용하기에 개발 초기단계에 서비스의 불안정한 상황에 영향 받지않고 테스트가 가능하며, 실제 API 호출보다 빠른 응답처리로 테스트 작업 속도가 향상되는 장점이 있습니다.

## 적용 방법

### STEP1. 모델링
재고팀에 설정된 상품이 주문팀에서 발생된 주문의 수량에 따라 재고가 감소하는 시나리오를 토대로 아래와 같이 모델링을 진행합니다.
![image](https://github.com/kyusooK/lab-shop-microcks/assets/123912988/f9ee56fa-5eb0-449f-bd87-da2945e8ae53)

### STEP2. EXAMPLES
Command(decreaseStock)스티커를 더블 클릭 > 우측 패널 'EXAMPLES' 클릭하면 Given-When-Then 패턴의 예제를 작성할 수 있는 다이얼로그가 나타나는 것을 확인할 수 있습니다.

시나리오를 토대로 Inventory(Given)의 stock이 decreaseStock(When)에 의해서 StockDecreased(Then) 이벤트로 발행되는 예제를 아래와 같이 생성합니다.
![image](https://github.com/kyusooK/lab-shop-microcks/assets/123912988/ee5e615e-7c16-4a5e-af4e-8672dde411a8)

### STEP3. Topping 적용
Code > Code Preview를 클릭하여 좌측 상단에 Base: spring-boot가 선택되어 있는지 확인합니다. <br>
*spring-boot가 아닐 경우 spring-boot 클릭 > Marketplace 클릭 > Template > Spring-boot > Apply로 spring-boot를 적용합니다. <br>
우측 상단 Toppings > Marketplace를 클릭하여 아래와 같은 화면으로 진입합니다. <br>
![](https://github.com/user-attachments/assets/58b2c46c-1155-4340-bbfe-8372830bbecb)

상단의  'TOPPINGS' > 'Local Microservice Development Dependencies' > Apply 클릭을 통해 토핑을 적용합니다. <br>

적용 후, order/infra/api를 확인하면 'openai.yaml'파일이 생성되며 'EXAMPLES'에서 작성한 given, when, then에 따른 코드가 아래와 같이 생성된것을 확인할 수 있습니다.

```
paths:
  '/inventories/{id}/decreasestock':
    summary: decrease stock operation on inventories
    put:
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                id:
                  description: id of this DecreaseStock
                  type: integer
                qty:
                  description: qty of this DecreaseStock
                  type: integer
            examples:
              Example 0:
                value:
                  id: 1
                  qty: 5
              Example 1:
                value:
                  id: 2
                  qty: 13
      parameters:
        - name: id
          description: DecreaseStock name
          schema:
            type: integer
          in: path
          required: true
          examples:
            Example 0:
              value: 1
            Example 1:
              value: 2
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Inventory'
              examples:
                Example 0:
                  value:
                    id: 1
                    stock: 5
                Example 1:
                  value:
                    id: 2
                    stock: 12
          description: DecreaseStock Operation
      operationId: DecreaseStock
      summary: DecreaseStock
      description: DecreaseStock
```

## 실행 방법

### STEP1. Mock서버 기동하기

order서비스에서 가상의 inventory서비스를 띄운 상태로 작성한 Examples에 대한 테스트를 진행하기 위해서는 터미널에 다음과 같이 입력하여 inventory Mock 서버를 실행합니다.

```
cd order
cd infra
docker-compose up
```

infra 폴더에 위치한 docker-compose.yml이 실행되면서 아래와 같이 8080포트의 Mock서버가 실행되는 것을 확인할 수 있습니다.

![image](https://github.com/kyusooK/lab-shop-microcks/assets/123912988/d16962ce-b34b-40a1-974f-c79cf7e3eeeb)


### STEP2. Mocking Test
Mock서버의 'APIs | Services'를 클릭하면 가상의 Mock서버가 바라보는 Inventory가 생성되어있으며, 클릭하면 아래와 같이 Inventory 서비스에서 처리하는 작업에 대해 5개의 API가 제공된 것을 확인할 수 있습니다.
![image](https://github.com/kyusooK/lab-shop-microcks/assets/123912988/61fc5428-66ad-4c96-992a-63d612914a21)

- 사전에 ExtendVerb로 정의한 'PUT/inventories/{id}/decreasestock'를 클릭하면 아래와 같이 생성했던 Examples에 대한 Mock URL과 Response 결과를 확인할 수 있습니다.
![image](https://github.com/kyusooK/lab-shop-microcks/assets/123912988/3bed6c79-7cc2-4d1d-bbe3-e062d50a3082)

- 예시에 있는 MockURL을 토대로 테스트를 진행하기 위해 PORTS > 8080포트 자물쇠를 Public으로 설정을 변경한 후, 아래와 같이 터미널에 입력합니다.

```
http PUT <Example`s MockURL> qty=5
```
응답결과 Mock서버에 나타난 Response결과와 동일하게 나오면서 예시에 대한 API 테스트가 정상적으로 이루어진 것을 확인할 수 있습니다.
![image](https://github.com/kyusooK/lab-shop-microcks/assets/123912988/7e495f52-c231-4a63-a76a-48dee42b7754)