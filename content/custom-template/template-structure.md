---
description: ''
sidebar: 'started'
---

## 템플릿 파일 구조
템플릿 파일은 필수로 적용해야하는 옵션들을 설정하는 metadata와, 동적으로 변화할 데이터들을 선언하는 템플릿 코드로 구성되어 있습니다.

Aggregate.java 파일을 기준으로 템플릿 파일의 구성하는 방법에 대해 설명드리겠습니다.

## 1. Metadata 정의

metadata란 템플릿이 데이터를 반복하는 방식, 생성되는 파일의 유형 및 위치, 그 외 설정할 옵션 등을 의미하며, 
템플릿 파일의 최상단에 사용할 옵션들을 아래와같이 설정할 수 있습니다.

Template
```
forEach: Aggregate
fileName: {{namePascalCase}}.java
path: {{boundedContext.name}}/{{{options.packagePath}}}/domain
---
```

### 1.1 파일 유형 설정

여기서 forEach를 통해 템플릿이 생성될 파일의 유형을 설정합니다.

forEach의 값으로는 모델링한 스티커들을 가져올 수 있으며 여기서는 Aggregate 기준으로 설정하였습니다.

### 1.2 파일 이름 정의 

fileName을 통해 생성될 파일의 이름을 설정할 수 있는데, 파일이 생성될 때, forEach에 해당되는 스티커 수에 따라 생성되기 때문에 이름에 파일이름 또한 동적으로 생성되도록 설정합니다.

예시에서는 {{namePascalCase}}.java로 지정하였습니다. 이를 통해 각 Aggregate의 데이터중 namePascalCase에 해당하는 결과값이 대체되어 파일이 생성됩니다. 

### 1.3 파일 경로 설정

마지막으로 path를 통해 Company.java가 생성될 경로를 설정합니다.

현재 {{boundedContext.name}}/{{{options.packagePath}}}/domain로 설정함으로써 해당 Aggregate가 속한 BoundedContext의 하위 폴더 domain에 Company.java 파일이 생성됩니다.

metadata의 옵션 설정들이 완료되면 하단에 작성할 템플릿코드와 분리되기 위해 마지막 메타데이터의 하단에 하이푼('---')처리를 입력하면 metadata설정이 완료됩니다.


## 2. Template 코드

### 2.1 Mustache

템플릿 파일에서는 모델링을 통해 생성된 데이터들을 활용하여 템플릿 코드를 구성할 수 있습니다.

이때, 데이터를 가져오기 위해 Mustache ('{{}}')를 사용할 수 있으며, 모델링을 통해 생성된 데이터를 Mustache 내부에 입력하여 데이터를 가져올 수 있게됩니다.

Aggregate 스티커의 데이터중 name을 활용하여 Java의 클래스를 아래와 같이 생성할 수 있습니다.

Template
```
public class {{name}} {

}
```
Template Result
```
public class Company {

}
```

### 2.2 내부 속성 접근

일반적으로 기준이 되는 스티커의 속성에 접근할 때는 {{속성}}의 형식으로 접근 가능합니다.

하지만 특정 속성의 내부에 있는 속성에 접근할 때는 '.'을 이용하며, 

{{속성.내부속성}}로 작성할 수 있습니다.

Template
```
{{keyFieldDescriptor.name}}
```
Template Result
```
id
```
Aggregate 스티커의 필드 중, 현재 id 필드가 keyField로 설정되어 있습니다. 

따라서 id필드의 이름을 가져오기 위해서는 keyFieldDescriptor 내부에 존재하는 name 속성에 접근하여 가져올 수 있게 됩니다.

### 2.3 외부 범위 속성 접근

내부 속성에 접근하는 것과 반대로 외부의 속성에 접근해야할 때가 있습니다.

이때, 외부 범위의 속성에 접근하기 위해서는 '../'를 이용하며, {{../외부속성}}로 작성할 수 있습니다.

Template
```
{{#aggregateRoot}}
    {{../name}}
{{/aggregateRoot}}
```
Template Result
```
Company
```
예시에서 Aggregate의 내부 속성인 aggregateRoot로 접근함에 따라 Aggregate 스티커의 이름을 가져오려면 외부 속성으로 접근해야합니다.

따라서 {{../name}}를 사용하여 상위 속성으로 이동하여 Aggregate의 이름을 가져올 수 있습니다.

### 2.4 네이밍 컨벤션

스티커의 데이터중 이름과 관련된 데이터는 여러 네이밍컨벤션으로 생성되어 있으며, 이를 활용하여 이벤트 속성에 접근하여 메소드를 아래와 같이 생성할 수 있습니다.

Template
```
{{#lifeCycles}}
    public void on{{trigger}}(){
        {{#events}}
            {{namePascalCase}} {{nameCamelCase}} = new{{namePascalCase}}(this);
        {{/events}}
    }
{{/lifrCycles}}
```
Template Result
```
public void onPostPersist() {
    OrderPlaced orderPlaced = new OrderPlaced(this);
    orderPlaced.publishAfterCommit();
}
```

예시에서는 Aggregate lifeCycles의 내부데이터 events에 접근하여 이벤트스티커에 생성된 네이밍컨벤션을 활용하여 메소드를 생성하였습니다.