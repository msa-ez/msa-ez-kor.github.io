---
description: ''
sidebar: 'started'
---
# Built-in Helper functions

#### Helper function 생성하기

특정 조건에만 해당되는 결과값을 반환하기 위해서는 function블록에 helper를 만들어 이를 해결할 수 있습니다.

먼저 script 블록 하단에 function 블록을 생성 합니다.

이후, 특정 조건에 동작할 helper를 작성합니다. Handlebars는 JavaScript 템플릿 엔진으로 데이터를 템플릿에 동적으로 삽입할 때 사용합니다.

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

#### Built in Helper function
Globar helper란 Template에서 스티커에 관계없이 공통적으로 사용할 수 있는 handlebars를 의미합니다.

현재 Msa-EZ내에 정의되어있는 Globar helper에 대하여 예시와 사용방법을 설명하겠습니다.


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
