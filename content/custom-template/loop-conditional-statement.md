---
description: ''
sidebar: 'started'
---

'Model Explorer'로 생성된 데이터를 확인해보면 키-값의 유형도 있지만 객체나 배열의 유형도 존재합니다. 

이때 객체나 배열로 생성된 데이터의 대한 정보를 가져오기 위해서 반복문을 통해 동일한 코드 블록을 여러 번 실행하면서 각각의 내부 데이터를 가져올 수 있습니다.

## 1. # 반복문

{{#반복가능한객체}}{{/반복가능한객체}}로 사용하며 반복가능한 객체에는 객체나 배열이 입력할 수 있습니다.

```
fieldDescriptors: 
[
    {'name': 'id'},
    {'nameCamelCase': 'id'},
    {'className': 'Long'}
    {'isKey': true}
],
[
    {'name': 'userId'},
    {'nameCamelCase': 'userId'},
    {'className': 'String'}
    {'isKey': false}
],
[
    {'name': 'productName'},
    {'nameCamelCase': 'productName'},
    {'className': 'String'}
    {'isKey': false}
]
```

Aggregate의 필드는 aggregateRoot.fieldDescriptors로 접근할 수 있는데 해당 데이터는 배열로 구성되어있습니다.

이때 각각의 필드의 정보를 가져오기 위해서는 아래와 같이 사용할 수 있습니다.

Template
```
{{#aggregateRoot.fieldDescriptors}}
    private {{className}} {{nameCamelCase}};
{{/aggregateRoot.fieldDescriptors}}
```

Template Result
```
private Long id;

private String userId;

private String productName;
```

## 2. each 반복문

each를 통해서 반복문을 사용가능하며, {{#each 반복가능한 객체}}{{/each}}의 형태로 사용할 수 있습니다.

each 반복문을 사용하여 Aggregate의 필드에 대한 정보를 아래와 같이 가져올 수 있습니다.

Template
```
{{#each aggregateRoot.fieldDescriptors}}
    private {{{className}}} {{nameCamelCase}};
{{/each}}
```

Template Result
```
private Long id;

private String userId;

private String productName;
```

조건문은 특정 속성이나 상황에 대해 판별하여 상황에 맞는 결과값을 가져올 때 사용할 수 있습니다.

일반적으로 {{#속성}}{{/속성}}를 사용할 수 있습니다.

## 3. 참 조건문

참 조건문은 속성의 결과값이 true인 경우에만 하단의 코드블록을 실행할 때 사용할 수 있습니다.

아래는 {{#속성}}{{/속성}}을 이용하여 특정 필드에 '@Id'를 생성하는 방법입니다.

Template
```
public class {{namePascalCase}} {

    {{#aggregateRoot.fieldDescriptors}}
        {{#isKey}}
        @Id
        {{/isKey}}
        private {{className}} {{nameCamelCase}};
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
현재 aggregateRoot.fieldDescriptors의 isKey에 대하여 id필드는 true의 값을, name필드는 ""의 값을 가지고 있습니다.

이때, {{#isKey}}{{/isKey}}를 통해 isKey의 데이터가 ture인 id필드에만 '@Id'가 생성되도록 설정할 수 있습니다.

## 4. 거짓 조건문

{{#속성}}{{/속성}}과 반대로 특정 속성에 대하여 거짓인 경우에만 하단의 블록을 실행할 때 사용할 수 있습니다.

일반적으로 {{^ 조건문}}{{/조건문}}으로 사용하며, {{#unless 조건문}}{{/unless}}를 통해서도 조건이 거짓인 경우에 대해 설정할 수 있습니다.

아래는 이전 참 조건문에 {{^ 조건문}}{{/조건문}}을 더해 이중으로 조건을 걸어 필드에 어노테이션을 적용하는 방법입니다.

Template
```
public class {{namePascalCase}} {

    {{#aggregateRoot.fieldDescriptors}}
        {{^isVO}}
        {{#isKey}}
        @Id
        {{/isKey}}
        {{/isVO}}
        private {{className}} {{nameCamelCase}};
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

현재 aggregateRoot.fieldDescriptors의 isVO에 대한 데이터로 id필드는 값이 존재하지 않으며, name필드는 ""로 나타나고 있습니다.

따라서 {{^isVO}}{{/isVO}}를 통해 필드의 속성중 isVO가 false 조건에 부합하는 id, name필드를 1차로 선별한 후,

{{#isKey}}{{/isKey}}를 통해 isKey가 true인 id필드를 2차로 선별하였습니다.

즉, 두 조건문을 사용하여 VO필드가 아니면서 동시에 key값을 가진 필드 id에만 @Id가 생성되는 것을 확인할 수 있습니다.

## 5. if ~ else ~

조건문의 참과 거짓에 따라 서로 다른 결과값을 가져올 수 있습니다.

{{#if 조건문}}{{else}}{{/if}}의 형태로 사용 가능하며, {{if 조건문}}에 부합될 경우 하단의 블록 코드가 실행되고,

조건에 부합되지 않을 경우 {{else}} 하단의 블록 코드가 실행되며 아래와 같이 사용할 수 있습니다.

Template
```
public class {{namePascalCase}} {

    {{#aggregateRoot.fieldDescriptors}}
        {{#if isKey}}
        @Id
        private {{className}} {{nameCamelCase}};
        {{else}}
        private {{className}} {{nameCamelCase}};
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