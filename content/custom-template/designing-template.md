---
description: ''
sidebar: 'started'
---
# 커스텀 템플릿 만들기

## 템플릿 파일 생성

이벤트스토밍 모델을 실제 소스 코드로 변환하기 위한 템플릿 파일 생성 방법입니다.

다음 예시는 Spring-boot 템플릿에서 AggregateRoot.java 파일의 소스 코드입니다.

```
.forEach: Aggregate
fileName: {{namePascalCase}}.java
---
package {{options.package}}.domain;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import javax.persistence.*;
import lombok.Data;
```
### 기본 속성 추가

```
.forEach: Aggregate
fileName: {{namePascalCase}}.java
---
```

먼저, 이벤트스토밍 스티커의 유형을 .forEach에 선언합니다(Aggregate, Command, Policy 등).

이후 fileName에 스티커별 생성될 파일의 이름을 Mustache 구문 내부{{ }}에 변수명에 맞게 선언합니다.


### 범위 밖에서 상위 속성을 추가
특정 스티커 기준 상위 속성을 추가할 경우 상위 속성으로 이동하겠다는 의미의 '../'를 Mustache 구문에 추가하여 사용합니다.

예시로 Aggregate를 기준으로 상위 속성인 BoundedContext를 추가할 경우에는 다음과 같이 작성합니다.

```
 {{../boundedContext}}
```

### 속성을 평가하여 처리 (if, Equals)



### 반복문 조건문

#### #반복문/조건문

#### each

#### if ~else ~
Mustache 구문 내부에 조건문 if와 else를 사용하여 조건에 맞는 값을 반환할 수 있습니다.
```
{{#if 조건 값}}
    true일 경우 내용 반환
{{/if}}
```
이 경우 위의 조건 값의 속성이 true인 경우 혹은 function 블록의 method에 선언된 내용이 들어올 경우 해당 method의 return값이 true일 경우, 해당 mustache 구문에 감싸진 코드가 동작합니다.

반대로 결과값이 false일 경우에도 mustache 구문이 동작하게 하고 싶다면 else를 사용할 수 있습니다.

```
{{#if 조건 값}}
    true일 경우 내용 반환
{{else}}
    false일 경우 내용 반환
{{/if}}
```
#### ^

#### unless

#### Object iteration

### 속성 내 값을 치환

#### jpath

#### 네이밍 컨벤션
mustache 구문 내부에 변수명을 네이밍 컨벤션으로 넣으면 네이밍 컨벤션에 따른 결과값을 반환할 수 있습니다.

예시) Aggregate 스티커의 이름을 'CustomTemplate'으로 정한 경우
```
{{name}} => CustomTemplate
{{nameCamelCase}} => customTemplate
{{namePascalCase}} => CustomTemplate
```


### Helper

#### Handlebars 생성

특정 조건에만 해당되는 결과값을 반환하기 위해서는 function에 Handlebars 기능을 이용할 수 있습니다.

먼저 script 블록 하단에 function 블록을 생성 합니다.

이후, 특정 조건에 동작할 Handlebars를 작성합니다. Handlebars는 JavaScript 템플릿 엔진으로 데이터를 템플릿에 동적으로 삽입할 때 사용합니다.

```
</scirpt>
<function>
window.$HandleBars.registerHelper('{Handlebars 이름}', function ({parameter값}){
    실행할 코드
}
</function>
```

Handlebars가 완성되면 script 블록 내부에 Handlebars 이름과 parameter로 보낼 값을 mustache 구문에 작성합니다.
```
<script>
{{#Handlebars 이름 parameter로 보낼 데이터}}
{{/Handlebars 이름}}
</script>
```

예시) Date type의 필요한 import문  생성.

```
<script>
{{#checkDateType aggregateRoot.fieldDescriptors}}
{{/checkDateType}}
</script>
<function>
window.$HandleBars.registerHelper('checkDateType', function (fieldDescriptors) {
    for(var i = 0; i < fieldDescriptors.length; i ++ ){
        if(fieldDescriptors[i] && fieldDescriptors[i].className == 'Date'){
            return "import java.util.Date;"
        }
    }
});
</function>
```
이 경우 aggregateRoot.fieldDescriptors의 className이 Date일 경우 

결과값에 "import java.util.Date;"가 반환됩니다.

#### Globar Helper
Globar helper란 Template에서 스티커에 관계없이 공통적으로 사용할 수 있는 handlebars를 의미합니다.

현재 MSAEZ내에 정의되어있는 Globar helper에 대하여 예시와 사용방법을 설명하겠습니다.

1) ifNotNull
```
window.$HandleBars.registerHelper('ifNotNull', function (displayName, name) {
    if(displayName){
        return displayName;
    }else{
        return name;
    }
})
```
ifNotNull은 스티커의 name과 displayName을 구분하여 결과값을 반환합니다.

예시)
```
{{#aggregates}}
    {
        "{{#ifNotNull displayName namePascalCase}}{{/ifNotNull}}",
    },
{{/aggregates}}

=> aggregate에 대한 데이터 중 displayName이 있을 경우 결과값으로 displayName을 반환, 없을경우 namePascalCase를 반환.
```

2) checkVo
```
window.$HandleBars.registerHelper('checkVO', function (className, options) {
    if(className.endsWith("Address") || className.endsWith("Photo") || className.endsWith("User") || className.endsWith("Email") 
            || className.endsWith("Payment") || className.endsWith("Money") || className.endsWith("Weather") || className.endsWith("Rating") 
            || className.endsWith("Likes")|| className.endsWith("Tags")|| className.endsWith("Comment") ){
        return options.fn(this);
    }
})
```
checkVo는 parameter로 받아온 className의 문자열이 Vo로 지정된 문자열과 일치하는경우 해당 블록을 실행합니다.

예시) className이 Address인 경우
```
{{#checkVO className}}
    <{{className}} offline label="{{namePascalCase}}" v-model="value.{{nameCamelCase}}" :editMode="editMode" @change="change"/>
{{/checkVO}}

=> <Address offline label="Address" v-model="value.address" :editMode="editMode" @change="change"/>로 반환
```

2) checkEntityMember
```
window.$HandleBars.registerHelper('checkEntityMember', function (className, options) {
    if(!(className.endsWith("Address") || className.endsWith("Photo") || className.endsWith("User") || className.endsWith("Email") 
            || className.endsWith("Payment") || className.endsWith("Money") || className.endsWith("Weather") || className.endsWith("Rating")) 
            || className.endsWith("Likes")|| className.endsWith("Tags")|| className.endsWith("Comment") && className.indexOf("java.") == -1 && className.indexOf("List") == -1){
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
})
```
checkEntityMember는 checkVo와 동일하게 parameter로 받아온 className의 문자열이 지정된 문자열과 일치하지 않고 className에 'java.', 'List'가 포함되지 않는 경우 블록을 실행합니다.
지정된 VO가 아닌 직접 만든 VO를 사용하는 경우 해당 handlebars를 이용합니다.

예시) className이 Status인 경우
```
{{#checkEntityMember className}}
    <{{className}} offline label="{{namePascalCase}}" v-model="value.{{nameCamelCase}}" :editMode="editMode" @change="change"/>
{{/checkEntityMember}}

=> <Status offline label="Status인" v-model="value.status" :editMode="editMode" @change="change"/> 반환
```

3)
### Template Editor

### Chat GPT (Generated Template)