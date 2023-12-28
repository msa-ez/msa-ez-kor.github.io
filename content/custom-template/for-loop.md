---
description: ''
sidebar: 'started'
---
# 반복문

## 1. 반복문 정의

데이터는 키-값의 유형도 있지만 객체나 배열의 유형도 존재합니다. 

이때 객체나 배열에 대해 각각의 데이터에 대한 정보를 가져오기 위해서 반복문을 사용할 수 있습니다.

기본 형태로는 {{#반복가능한객체}}{{/반복가능한객체}}를 사용할 수 있습니다.



### 3.1 # 반복문
![](https://github.com/msa-ez/platform/assets/123912988/ce7a779a-ecb9-4b07-bdbb-7113dca67ba3)

모델링 상에서 Aggregate 스티커의 필드는 id와 name이 존재하고 있습니다.

Aggregate의 필드에 접근하기 위해서는 aggregateRoot.fieldDescriptors로 접근해야 합니다.

이때 각 필드에 맞게 Aggregate의 필드를 생성하기위해서는 다음과 같이 작성할 수 있습니다.

Template
```
public class {{namePascalCase}} {

    {{#aggregateRoot.fieldDescriptors}}
        private {{className}} {{nameCamelCase}};
    {{/aggregateRoot.fieldDescriptors}}
}
```

Template Result
```
public class Company {

    private Long id;

    private String name;
}
```

### 3.2 each 반복문

each를 통해서 반복문을 사용가능하며, {{#each 반복가능한 객체}}{{/each}}의 형태로 사용할 수 있습니다.

Template
```
public class {{namePascalCase}} {

    {{#each aggregateRoot.fieldDescriptors}}
        private {{{className}}} {{nameCamelCase}};
    {{/each}}
}
```

Template Result
```
public class Company {

    private Long id;

    private String name;
}
```