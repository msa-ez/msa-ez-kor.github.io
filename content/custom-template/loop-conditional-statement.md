---
description: ''
sidebar: 'started'
---

# 반복문 & 조건문

'Model Explorer'로 생성된 속성 확인해보면 키-값의 유형도 있지만 객체나 배열의 유형도 존재합니다. 

이때 객체나 배열로 생성된 속성에 대한 정보를 가져오기 위해서 반복문을 통해 동일한 코드 블록을 여러 번 실행하면서 각각의 내부 속성을 가져올 수 있습니다.

## 1. # 반복문

{{#반복가능한객체}}{{/반복가능한객체}}로 사용하며 반복가능한 객체에는 객체나 배열을 입력할 수 있습니다.

Aggregate의 필드는 aggregateRoot.fieldDescriptors로 접근할 수 있는데 해당 데이터는 배열로 구성되어있습니다.

이때 각각의 필드의 정보를 가져오기 위해서는 아래와 같이 사용할 수 있습니다.

Template
```
public class {{#pascalCase name}} {
    {{#aggregateRoot.fieldDescriptors}}
    private {{className}} {{#camelCase name}}
    {{/aggregateRoot.fieldDescriptors}}
}
```

Template Result
```
public class Order {
    private Long id;

    private String userId;

    private String productName;
}
```

## 조건문

조건문은 특정 속성이나 상황에 대해 판별하여 상황에 맞는 결과값을 가져올 때 사용할 수 있습니다.

일반적으로 {{#속성}}{{/속성}}를 사용할 수 있습니다.

## 3. 참 조건문

참 조건문은 속성의 결과값이 true인 경우에만 하단의 코드블록을 실행할 때 사용할 수 있습니다.

아래는 {{#속성}}{{/속성}}을 이용하여 특정 필드에 '@Id'를 생성하는 방법입니다.

Template
```
public class {{#pascalCase name}} {

    {{#aggregateRoot.fieldDescriptors}}
        {{#isKey}}
        @Id
        {{/isKey}}
        private {{className}} {{#camelCase name}};
    {{/aggregateRoot.fieldDescriptors}}
}
```
Template Result
```
public class Order {

    @Id
    private Long id;

    private String userId;

    private String productName;
}
```
현재 각 필드에는 해당 필드가 keyField인지 확인하는 속성 isKey를 가지고 있으며, isKey 대하여 id필드는 true의 값을, userId, productName필드는 ""의 값을 가지고 있습니다.

이때, {{#isKey}}{{/isKey}}를 통해 isKey 속성의 값이 ture인 id필드에만 '@Id'가 생성되도록 설정할 수 있습니다.

## 4. 거짓 조건문

{{#속성}}{{/속성}}과 반대로 특정 속성에 대하여 거짓인 경우에만 하단의 블록을 실행할 때 사용할 수 있습니다.

일반적으로 {{^ 조건문}}{{/조건문}}으로 사용하며, {{#unless 조건문}}{{/unless}}를 통해서도 조건이 거짓인 경우에 대해 설정할 수 있습니다.

아래는 이전 참 조건문에 {{^ 조건문}}{{/조건문}}을 더해 이중으로 조건을 걸어 필드에 어노테이션을 적용하는 방법입니다.

Template
```
public class {{#pascalCase name}} {

    {{#aggregateRoot.fieldDescriptors}}
        {{^isVO}}
        {{#isKey}}
        @Id
        {{/isKey}}
        {{/isVO}}
        private {{className}} {{#camelCase name}};
    {{/aggregateRoot.fieldDescriptors}}
}
```
Template Result
```
public class Order {

    @Id
    private Long id;

    private String userId;

    private String productName;
}
```

현재 각 필드에는 ValueObject를 판별하는 속성 isVO가 있습니다.

현재 모든 필드에 대해서 isVO가 false이기 때문에 {{^isVO}}{{/isVO}}를 진행하여 모든 필드가 조건에 부합되는 것을 확인할 수 있습니다.

이후, {{#isKey}}{{/isKey}}를 통해 isKey가 true인 id필드를 2차로 선별하였습니다.

즉, 두 조건문을 사용하여 VO가 아니면서 동시에 key값을 가진 필드 id에만 @Id가 생성되는 것을 확인할 수 있습니다.

## 5. if ~ else ~

참 조건문과 거짓 조건문을 같이 사용하여 상황에 따라 서로 다른 결과값을 가져올 수 있습니다.

{{#if 조건문}}{{else}}{{/if}}의 형태로 사용 가능하며, {{if 조건문}}에 부합될 경우 하단의 블록 코드가 실행되고,

조건에 부합되지 않을 경우 {{else}} 하단의 블록 코드가 실행되며 아래와 같이 사용할 수 있습니다.

Template
```
public class {{#pascalCase name}} {

    {{#aggregateRoot.fieldDescriptors}}
        {{#if isKey}}
        @Id
        private {{className}} {{#camelCase name}};
        {{else}}
        private {{className}} {{#camelCase name}};
        {{/isKey}}
    {{/aggregateRoot.fieldDescriptors}}
}
```
Template Result
```
public class Order {

    @Id
    private Long id;

    private String userId;

    private String productName;
}
```
예시를 보면 {{#if isKey}}를 통해 조건에 부합한 id필드에만 '@Id'가 추가되도록 설정하였고,

조건에 부합하지 않은 필드들은 {{else}}조건에 부합되어 '@Id'이 생성되지 않은 상태로 생성된 것을 확인할 수 있습니다.