---
description: ''
sidebar: 'started'
---
# 템플릿 파일 구조
템플릿 파일은 필수로 적용해야하는 옵션들을 설정하는 metadata와, 동적으로 변화할 데이터들을 선언하는 템플릿 코드로 구성되어 있습니다.

이전에 생성한 Aggregate.java 파일을 기준으로 템플릿 파일을 구성하는 방법은 다음과 같습니다.

## 1. Metadata 정의

Metadata란 템플릿이 데이터를 반복하는 방식, 생성되는 파일의 유형 및 위치, 그 외 설정할 옵션 등을 의미하며, 
템플릿 파일의 최상단에 사용할 옵션들을 아래와 같이 설정할 수 있습니다.

Template
```
forEach: Aggregate
fileName: {{#namePascalCase name}}.java
path: {{boundedContext.name}}/{{{options.packagePath}}}/domain
---
```

### 1.1 파일 유형 설정

템플릿 파일은 생성될 때 어떠한 유형으로 생성될지를 설정해야하며 이때, forEach를 사용할 수 있습니다.

forEach의 값으로는 모델링한 스티커들을 가져올 수 있으며 여기서는 Aggregate 기준으로 설정하였습니다.

### 1.2 파일 이름 정의 

forEach를 Aggregate로 설정한 템플릿파일은 Aggregate 스티커의 수만큼 생성되기 때문에 각각의 고유한 이름으로 생성될 수 있도록 설정해야합니다. 

이때, fileName을 통해 생성될 각각의 Aggregate파일의 이름을 구분지을 수 있습니다.

예시에서는 {{#namePascalCase name}}.java로 지정하였습니다. 이를 통해 각 Aggregate의 namePascalCase에 해당하는 결과값이 대체되어 파일이 생성됩니다. 

### 1.3 파일 경로 설정

마지막으로 path를 통해 Aggregate.java가 생성될 경로를 설정합니다.

현재 Aggregate.java가 생성되어야 할 경로는 domain의 하위이며, 'Model Explorer'의 속성을 참조하여 경로를 설정할 수 있습니다.

Metadata의 옵션 설정들이 완료되면 하단에 작성할 템플릿코드와 분리되기 위해 마지막 메타데이터의 하단에 하이푼('---')처리를 입력하면 metadata설정이 완료됩니다.

## 2. Template code

템플릿 파일은 모델링을 통해 생성된 'Model Explorer'에 있는 속성을 활용하여 템플릿 코드를 구성할 수 있습니다.

이때, 속성을 가져오기 위해 Mustache ('{{}}')를 사용할 수 있습니다. 

Mustache란 다양한 언어를 지원하는 심플한 템플릿 엔진을 의미합니다.

모델링을 통해 생성된 속성을 Mustache 내부에 입력하면 속성에 해당하는 값을 가져올 수 있으며, 상황에 따라 조건문, 반복문 등의 형태로 활용하여 유동적으로 원하는 속성의 결과값을 가져올 수 있습니다.

### 2.1 Mustache

Aggregate 스티커의 속성중 name에 해당하는 속성을 Mustache를 활용하여 아래와 같이 Java의 클래스를 생성할 수 있습니다.

Template
```
forEach: Aggregate
fileName: {{#namePascalCase name}}.java
path: {{boundedContext.name}}/{{{options.packagePath}}}/domain
---

public class {{name}} {

}
```
Template Result
```
public class Order {

}
```

### 2.2 내부 속성 접근

스티커의 객체에 접근할 때는 {{속성}}의 형식으로 접근 가능합니다.

하지만 특정 속성의 내부에 있는 속성에 접근할 때는 '.'을 이용하며, 

{{속성.내부속성}}로 작성할 수 있습니다.

다음은 내부 속성을 활용하여 클래스 내부에 키필드의 타입과 이름을 선언하는 방법입니다.

Template
```
forEach: Aggregate
fileName: {{#namePascalCase name}}.java
path: {{boundedContext.name}}/{{{options.packagePath}}}/domain
---
public class {{name}} {

    private {{keyFieldDescriptor.className}} {{keyFieldDescriptor.name}}

}
```
Template Result
```
public class Order {

    private Long id;

}
```
Aggregate 스티커의 필드 중, 현재 id필드가 keyField로 설정되어 있습니다. 

따라서 id필드의 이름과 타입을 가져오기 위해서는 keyFieldDescriptor 내부에 존재하는 className과 name 속성에 접근하여 가져올 수 있게 됩니다.

### 2.3 외부 범위 속성 접근

내부 속성에 접근하는 것과 반대로 외부의 속성에 접근해야할 때가 있습니다.

이때, 외부 범위의 속성에 접근하기 위해서는 '../'를 이용하며, {{../외부속성}}로 작성할 수 있습니다.

Template
```
public class {{name}} {

    {{#aggregateRoot}}
    private {{../keyFieldDescriptor.className}} {{../keyFieldDescriptor.name}}
    {{/aggregateRoot}}

}
```
Template Result
```
public class Order {

    private Long id;

}
```
예시에서 Aggregate의 내부 속성인 aggregateRoot로 접근한 상태에서 외부 범위에 존재하는 keyFieldDescriptor 속성에 접근하려면 외부 속성으로 접근해야합니다.

따라서 {{../keyFieldDescriptor}}를 사용하여 상위 속성으로 이동하여 keyFieldDescriptor의 속성에 접근한 후, 내부속성 className과 name에 접근할 수 있게됩니다.

### 2.4 네이밍 컨벤션

스티커의 속성중 이름과 관련된 속성은 여러 네이밍 컨벤션으로 생성되어 있으며, 이를 활용하여 상황에 맞게 적절하게 활용할 수 있습니다.

다음은 네이밍 컨벤션을 활용하여 클래스와 필드를 설정하는 방법입니다.
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