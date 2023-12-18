---
description: ''
sidebar: 'started'
---
# 커스텀 템플릿 만들기

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

현재 Msa-EZ내에 정의되어있는 Globar helper에 대하여 사용방법과 예시를 설명하겠습니다.

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

예시) aggregates에 User와 UserInfo가 존재하고 User의 경우 displayName이 사용자로 설정되어있지만 UserInfo의 경우 displayName이 존재하지 않는 경우
```
{{#aggregates}}
    {
        "{{#ifNotNull displayName namePascalCase}}{{/ifNotNull}}",
    },
{{/aggregates}}

=> 사용자 UserInfo
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

=> <Address offline label="Address" v-model="value.address" :editMode="editMode" @change="change"/>
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
checkEntityMember는 parameter로 받아온 className의 문자열이 지정된 문자열과 일치하지 않고 className에 'java.', 'List'가 포함되지 않는 경우 블록을 실행합니다.
지정된 VO가 아닌 직접 만든 VO를 사용하는 경우 해당 handlebars를 이용합니다.

예시) className이 Status인 경우
```
{{#checkEntityMember className}}
    <{{className}} offline label="{{namePascalCase}}" v-model="value.{{nameCamelCase}}" :editMode="editMode" @change="change"/>
{{/checkEntityMember}}

=> <Status offline label="Status인" v-model="value.status" :editMode="editMode" @change="change"/>
```

3) url
```
window.$HandleBars.registerHelper("url", function(str){
    return  str ? str.toLowerCase().replaceAll(" ", "-") : str;
});
```
url은 parameter로 받아온 str의 값을 판별합니다. str의 값이 존재하면 소문자로 변환하고 공백에 대시(-)로 대체하여 결과값을 반환합니다.

예시) name이 Custom Template일 경우
```
{{#url name}}
{{/url}}
=> custom-template
```

4)camelCase, pascalCase
```
window.$HandleBars.registerHelper("camelCase", function(str){
    return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
});

window.$HandleBars.registerHelper("pascalCase", function(str){
    return (str.match(/[a-zA-Z0-9]+/g) || []).map(w => `${w.charAt(0).toUpperCase()}${w.slice(1)}`).join('');
});
```
camelCase와 pascalCase의 경우 parameter로 받은 문자열을 정규표현식에 맞게 조합하여 각 네이밍컨변션에 맞게 결과값을 반환합니다.

예시) name이 CustomTemplate인 경우
```
{{#camelCase name}}
{{/camelCase}}
=> customTemplate

{{#pascalCase name}}
{{/pascalCase}}
=> CustomTemplate
```

5) ifEquals
```
window.$HandleBars.registerHelper('ifEquals', function (arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});
```
ifEquals는 parameter arg1과 arg2의 값을 비교하여 동일할 경우 블록 실행합니다.

예시) dataProjection이 query-for-aggregate일 경우
```
{{#ifEquals dataProjection "query-for-aggregate"}}
    <!-- 내부 코드 -->
{{/ifEquals}}
=> => <!-- 내부 코드 --> 
```
6) ifContains
```
window.$HandleBars.registerHelper('ifContains', function (jsonPath, value, options) {
    var evaluatedVal = window.jp.query(this, jsonPath);
    if(evaluatedVal.length && evaluatedVal.length == 1){
        evaluatedVal = evaluatedVal[0];
    }
    if( evaluatedVal == value || evaluatedVal.includes(value)

    ){
        return options.fn(this)
    }else{
        return options.inverse(this)
    }

});
```
ifContains는 parameter jsonPath에서 특정 경로에 해당하는 값을 추출하여 value와 동일하거나 evaluatedVal값에 value가 포함되는 경우 블록을 실행합니다.

예시) $.target._type에 위치한 값이 View일 경우
```
{{#ifContains "$.target._type" "View"}}
    <!-- 내부 코드 --> 
{{/ifContains}}
=> <!-- 내부 코드 --> 
```

7) jp
```
window.$HandleBars.registerHelper('jp', function (jsonPath, options) {
    try{
        var evaluatedVal = window.jp.query(this, jsonPath);
        if(evaluatedVal){
            return options.fn(evaluatedVal)
        }else{
            return options.inverse(this)
        }
    }catch(e){
        return options.inverse(this)
    }
});
```
jp는 parameter jsonPath의 경로값을 특정 경로에 해당하는 값을 추출하여 evaluatedVal 변수에 담고 해당 변수가 존재할 경우 블록을 실행하며 evaluatedVal를 반환합니다.

예시) $.target._type에 위치한 값이 View일 경우
```
{{#jp "$.target._type"}}
{{/jp}}
=> View
```

8) outgoing
```
window.$HandleBars.registerHelper('outgoing', function (type, value, options) {
    if(value==null)
        value = this;
    var evaluatedVal = window.jp.query(value, `$.outgoingRelations[?(@.target.type=='${type}')]`);
    
    if(evaluatedVal && evaluatedVal.length){
        let result = "";
        evaluatedVal.forEach((item, index) => {
            result += options.fn(item.target);
        })
        return result;
    
    }else{
        return options.inverse(value)
    }
});
```
outgoing은 patameter type을 JSONPath를 이용하여 taget.tyoe와 일치하는 항목을 찾고 존재할 경우 블록을 실행하여 item.target을 반환합니다.

즉, outgoingRelations에 해당되는 특정 스티커와 일치되는 항목이 있을 경우 블록을 실행하고 해당 스티커의 target에 해당하는 정보를 반환합니다.

예시) Aggregate 스티커 UserInfo와 User가 존재하고 User에서 UserInfo로 outgoingRelations가 형성되어 있는 경우
```
{{#outgoing 'Aggregate' this}}
    {{nameCamelCase}}
{{/outgoing}}
=> userInfo
```

9) incoming
```
window.$HandleBars.registerHelper('incoming', function (type, value, options) {
    var evaluatedVal = window.jp.query(value, `$.incomingRelations[?(@.source.type=='${type}')]`);
    
    if(evaluatedVal && evaluatedVal.length){
        let result = "";
        evaluatedVal.forEach((item, index) => {
            result += options.fn(item.source);
        })
        return result;
    
    }else{
        return options.inverse(this)
    }
});
```
incoming은 outgoing과 반대로 incomingRelations에 해당되는 스티커의 정보가 일치할 경우 블록이 실행되며 source에 해당하는 정보를 반환합니다.
예시) Aggregate 스티커 UserInfo와 User가 존재하고 UserInfo와에서 User로 incomingRelations가 형성되어 있는 경우
```
{{#incoming 'Aggregate' this}}
    {{namePascalCase}}
{{/incoming}}
=> User
```

10)attached
```
window.$HandleBars.registerHelper('attached', function (type, value, options) {
    let attachedElementsInTheType
    
    if(value.attached)
        attachedElementsInTheType = value.attached.filter(
            element => (element._type.endsWith(type) || (type=='ReadModel' && element._type.endsWith('View')))
        )

    if(attachedElementsInTheType && attachedElementsInTheType.length){
        let result = "";
        attachedElementsInTheType.forEach((item, index) => {
            result += options.fn(item);
        })

        return result;
    }else{
        return options.inverse(this)
    }

});
```
attached는 특정 스티커를 기준으로 parameter로 받아오는 type과 일치한 스티커가 있을 경우 블록이 실행되며 일치한 type에 해당하는 스티커의 정보를 반환합니다.

예시) Aggregate스티커 User기준 부착된 ReadModel스티커 UserQuery의 queryParameters 정보를 불러오는 경우
```
{{#attached 'View' this}}
    {{#queryParameters}}{{nameCamelCase}}{{/queryParameters}}
    "queryParameters에 name, age가 있다고 가정"
{{/attached}}
=> name age
```
### Template Editor

### Chat GPT (Generated Template)