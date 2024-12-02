---
description: ''
sidebar: 'started'
---
# Global Helper

Global Helper란 MSAEZ가 사전 정의하여 내장하고 있는 helper function으로 템플릿 전역에서 사용가능한 Helper를 의미합니다.

## 1. 스티커 관계에 따른 정보 조회

템플릿 파일에서 forEach로 지정한 스티커의 정보 뿐만이 아니라 다른 스티커의 정보를 필요로 할 때가 있습니다. 

모델링을 기준으로 각 스티커간의 관계는 다음과 같습니다.

![](https://github.com/msa-ez/platform/assets/123912988/f5c505b1-4e38-426b-a5e6-27aac19db6d2)

위의 예시에서 설명된 스티커간의 관계를 이용하여 Global Helper를 사용하는 방법은 다음과 같습니다.

### 1.1 attached
'attached'는 기준이 되는 스티커에 부착된 다른 스티커의 정보를 불러올 때 사용할 수 있습니다.

모델링 단계에서 서로다른 부착된 스티커가 있을때 사용가능하며

Aggregate 스티커 'Order'에서 부착된 Event 스티커 'OrderPlaced'의 정보를 필요로 한다고 가정했을 때, 아래와 같이 사용할 수 있습니다.

Template
```
{{#attached 'Event' this}}
    {{name}}
{{/attached}}
```

Template Result
```
OrderPlaced 
```

예시처럼 'attached' helper를 사용하기 위해서는 인자값으로 부착된 스티커의 타입을 보내야 합니다.

여기서는 Event 스티커의 타입 Event를 인자값으로 보냈습니다.

이때, 'attached'를 통해 부착된 스티커의 타입을 판별하고, Event가 존재함으로써 OrderPlaced 스티커의 정보를 불러올 수 있게 됩니다.

### 1.2 outgoing

'outgoing'은 기준이 되는 스티커와 outgoingRelation 관게가 형성된 다른 스티커의 정보를 가져올 때 사용합니다.

모델링 단계에서 스티커간 outgoingRelation관계가 형성되어있다면 아래와 같이 사용가능합니다.

Template
```
{{#outgoing 'Event' this}}
    {{#camelCase name}}
{{/outgoing}}
```

Template Result
```
orderPlaced
```

예시처럼 'outgoing' helper를 사용하기 위해서는 인자값으로 연결된 스티커의 타입을 보내야 합니다.

여기서는 커맨드 스티커 'order'와 이벤트 스티커 'OrderPlaced'가 outgoingRelation관계가 형성되어 있어 이벤트 스티커의 유형을 인자값으로 보냈습니다.

이때, 'outgoing'를 통해 outgoingRelation관계가 형성 되어 있는지를 판별한 후, 형성된 스티커의 정보를 불러오기 때문에 연결된 Event 스티커 'OrderPlaced'의 정보를 가져오게 됩니다.

### 1.3 incoming
'incoming'은 'outgoing'과 반대로 기준이 되는 스티커와 incomingRelation관게가 형성된 스티커의 정보를 가져올 때 사용합니다.

이번에는 이벤트 스티커 'OrderPlaced'기준 incomingRelation관게를 형성하고 있는 커맨드 스티커 'order'의 정보를 조회해보겠습니다.

Template
```
{{#incoming 'Command' this}}
    {{#pascalCase name}}
{{/incoming}}
```

Template Result
```
Order
```

예시처럼 'incoming' helper를 사용하기 위해서는 인자값으로 연결된 스티커의 타입을 보내야 합니다.

이때, incomingRelation관계가 형성 되어 있는지를 판별한 후 형성된 스티커의 정보를 불러오기 때문에 연결된 Command 스티커 'order'의 정보를 가져오게 됩니다.

### 1.4 reaching

'reaching'은 기준이 되는 스티커와 relation 관계가 형성된 다른 스티커들의 마지막에 위치한 스티커의 정보를 불러올 때 사용할 수 있습니다.

모델링에서 서로 다른 스티커에 하나 이상의 relation 관계가 형성되어 있다면 사용가능합니다.

위의 그림처럼 Command 스티커 'order'에서 Event 스티커 'OrderPlaced'로 관계가 형성되었고, 이어서 Policy 스티커 'start delivery'를 지나 이벤트 스티커 'DeliveryStarted'로 relation 관계가 형성되어있을 때, 'order'에서 'DeliveryStarted'스티커의 정보를 아래와 같이 가져올 수 있습니다. 

Template
```
{{#reaching 'Event' this}}
    {{#camelCase name}}
{{/incoming}}
```

Template Result
```
deliveryStarted
```
'reaching'을 사용하기 위해서는 인자값으로 정보를 가져올 스티커의 타입을 보내야 하며

커맨드 스티커 'order'와 형성된 relation 관계의 마지막에 위치하는 'DeliveryStarted'의 스티커 타입을 인자값으로 보냈습니다. 

여기서 'reaching' helper function을 통해 스티커간 형성된 관계에 대해 판별하고 마지막에 위치한 이벤트 스티커 'DeliveryStarted'의 정보를 가져올 수 있게 됩니다.

## 2. 속성 평가

속성에 대하여 평가하여 상황에 맞게 결과값을 반환할 수 있는 Global Helper에 대하여 소개드리겠습니다.

### 2.1 ifNotNull

'ifNotNull'은  displayName을 출력할 때 사용합니다.

Order Aggregate 스티커의 displayName을 '주문정보'로 설정했다고 가정하였을 때, 아래와 같이 사용할 수 있습니다.

Template
```
{{#ifNotNull displayName name}}{{/ifNotNull}}
```
Template Result
```
주문정보
```

ifNotNull의 인자값으로 displayName과 name을 보내 displayName의 존재여부를 판단하고있습니다.

여기서는 displayName이 '주문정보'로 존재하고 있기 때문에 결과값으로 '주문정보'가 출력되는 것을 확인할 수 있습니다.

### 2.2 ifEquals

ifEquals는 필드내에 속한 속성을 평가하여 조건에 부합되는 경우 코드 블록을 실행할 때 사용할 수 있습니다.

필드내에 평가할 속성이 존재한다면 아래와 같이 사용할 수 있습니다.

Template
```
public class {{#pascalCase name}} {

{{#aggregates.fieldDescriptors}}
{{#ifEquals isKey "true"}}
    @Id
    private {{className}} {{#camelCase name}}
{{/ifEquals}}
{{/aggregates.fieldDescriptors}}

}
```
Template Result
```
public class Order {

@Id
private Long id;

}

```
ifEquals의 인자값으로는 평가할 속성과 평가할 내용을 보내야 합니다.

예시에서는 aggregates.fieldDescriptors에 존재하는 필드들의 속성중 isKey를 평가할 속성으로 보내고 평가할 내용으로 "true"를 보내었고, 필드 중 id필드에 한해서 코드블록이 실행된 것을 확인할 수 있습니다.

### 2.3 checkVO

'checkVO'는 VO의 존재여부를 파악하여 VO에 한해서만 특정 코드 블록을 실행할 때 사용할 수 있습니다.

VO란 ValueObject의 약자를 의미합니다.

필드에 사전에 지정한 VO가 존재할 경우 사용할 수 있으며, VO중 하나인 Address가 있다고 가정하였을 때, 다음과 같이 사용할 수 있습니다. 

Template
```
public class {{#pascalCase name}} {

    {{#aggregates.fieldDescriptors}}
        {{#checkVO className}}
        @embedded
        private {{className}} {{#camelCase name}};
        {{/checkVO}}
    {{/aggregates.fieldDescriptors}}
}
```
Template Result
```
public class Order {
    @embedded
    private Address address;

}
```
checkVO의 인자값으로 className을 보내고 있습니다.

이후 사전에 VO로 지정한 이름과 일치한 className이 존재할 경우 하단의 코드블록을 실행됩니다.

사전에 지정한 VO는 'Address', 'Payment', 'Weather', 'Money', 'Email', 'Photo' 등이 있으며

여기서는 Address가 VO로 지정되어 있기 때문에 하단의 코드가 생성된 것을 확인할 수 있습니다.

