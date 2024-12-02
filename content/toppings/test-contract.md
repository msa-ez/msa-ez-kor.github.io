---
description: ''
sidebar: 'started'
---
# Contract Test (동기호출)

## Consumer Driven Contract Test
Contract Test는 분산된 마이크로서비스간 테스트를 진행할 때, Consumer측에서 상호간의 계약서를 토대로 테스트를 진행하여 API의 일관성을 유지하며 테스트를 진행하는 방법입니다. <br>

계약서를 토대로 테스트가 진행됨에 따라 분산환경에서 개발상의 통신 오류 발생이 감소하고 문서화되어 상호간 테스트에 대한 이해력이 높아진다는 장점이 있습니다.

## 적용 방법

### STEP1. 모델링
주문 서비스에서 주문(order)시, 상품 서비스로부터 인벤토리를 직접 조회하는 디펜던시(Read Model) 모델링을 아래와 같이 진행합니다.
![image](https://github.com/user-attachments/assets/7f5b1228-7167-488b-b9f6-76588a6cc618)

### STEP2. EXAMPLES
GetInventory 스티커 더블 클릭 > 'Query For Aggregate' > 'Extended GET URI' > 'getInventory' 입력 > 'Query Parameters'에 다음과 같이 inventory서비스의 조회할 값을 등록합니다.
<img width="469" alt="image" src="https://github.com/user-attachments/assets/05dcf0f8-4b06-4361-80f4-3b629caeb335">

시나리오를 토대로 Inventory(Given)에 저장된 재고 수량을 주문시(when) 성공적으로 조회(Then)해오는 예제를 아래와 같이 생성합니다.
<img width="920" alt="image" src="https://github.com/user-attachments/assets/662e26b9-61d7-461f-8da6-995a2f8c123e">

### STEP3. Topping 적용
Code > Code Preview를 클릭하여 좌측 상단에 Base: spring-boot가 선택되어 있는지 확인합니다. <br>
*spring-boot가 아닐 경우 spring-boot 클릭 > Marketplace 클릭 > Template > Spring-boot > Apply로 spring-boot를 적용합니다. <br>
우측 상단 Toppings > Marketplace를 클릭하여 아래와 같은 화면으로 진입합니다. <br>
![](https://github.com/user-attachments/assets/58b2c46c-1155-4340-bbfe-8372830bbecb)

상단의  'TOPPINGS' > 'Contract Test' > Apply 클릭을 통해 토핑을 적용합니다. <br>

적용 후, 주문 서비스 최상위루트에 생성된 getInventory.groovy를 확인하면 Provider측에 제공할 계약서가 아래와 같이 생성된것을 확인할 수 있습니다.

```
package contracts.rest

org.springframework.cloud.contract.spec.Contract.make {
    request {
        method 'GET'
        url ('/inventories/search/findByGetInventory/1') // 주문팀이 재고 확인을 위해 상품팀과 협의된 호출 API
        headers {
            contentType(applicationJson())
        }
    }
    response {
        status 200
        body(
                id: 1,
                stock: 10,
        )
        bodyMatchers {
            jsonPath('$.id', byRegex(nonEmpty()).asLong())
            jsonPath('$.stock', byRegex(nonEmpty()).asInteger())
        }
        headers {
            contentType(applicationJson())
        }
    }
}
```

## 실행 방법

### STEP1. 계약 체결 및 테스트 실행

order서비스에 위치한 GetInventory.groovy를 Provider측에 제공하기 위해, 파일을 복사해, inventory 서비스의 test/resources/contracts/rest 폴더에 복사를 진행합니다. <br>

복사 후, Provider측에서 다음과 같이 명령어를 입력하여 배포를 위한 빌드 테스트를 진행합니다.

```
mvn clean package
```

테스트가 성공되면 아래와 같은 화면이 나타나고 jar파일이 생성되는 것을 확인할 수 있습니다.
<img width="687" alt="image" src="https://github.com/user-attachments/assets/ac90df2f-eeb0-434d-9265-300052567ff2">

Test가 성공이라는 것은 주문팀과 상품팀이 계약한 Contract를 Provider인 상품팀이 API를 준수하고 있음을 의미합니다.

테스트 후, stub 파일을 제공하기 위해 inventory서비스에서 다음과 같은 명령어를 입력하여 stub 파일을 Local(.m2 folder)이나 Remote(mvn deploy) 리파지토리에 저장합니다.
```
mvn install
```

### STEP2. Consumer 테스트 실행
order서비스에서는 inventory서비스에서 만들어진 stub 파일(Mock Server)을 바라보며 테스트를 진행하며, test/java/com.example.template/InventoryContractTest.java를 확인하면 생성된 stub을 로컬에서 Mock 서버로 8090포트로 실행하여 테스트를 진행합니다. 실행을 위해 다음과 같이 입력합니다.

```
cd order
mvn clean test
```	
Test 로그를 보면, Mock Server에 대해 Request와 Response가 성공적으로 실행되었고,
<img width="402" alt="image" src="https://github.com/user-attachments/assets/33d0a14e-1d46-4996-a4cd-aa9f1e54d29c">

아래와 같이 전체 Contract 테스트도 성공적으로 실행된 것을 확인할 수 있습니다.
<img width="585" alt="image" src="https://github.com/user-attachments/assets/09494aa8-d87b-410a-8c4b-96f4765242d4">

이와 같이 주문서비스가 참조하는 상품 Mock서버가 현행화되어 Consumer인 주문서비스에서도 API가 준수되고 있음을 확인할 수 있습니다.