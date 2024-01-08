---
description: ''
sidebar: 'started'
---
# Helper

이번에는 helper를 통해 template에서 결과값을 반환하는 방법에 대해 설명하겠습니다.

helper란 특정 조건을 구성하는 로직을 통해 필요한 결과값을 반환하는 미리 정의된 일종의 function을 의미하며 'helper function'이라고도 불립니다.

helper를 사용하는 방법은 아래와 같습니다.

```
{{#HelperName 인자값}}{{/HelperName}}

<funtion>
window.$HandleBars.registerHelper('HelperName', function (Helper에 전달된 인자값) {
    
    <helper 함수의 작업을 수행할 코드>
    
    return <반환될 결과값>
});
</function>
```

먼저 Helper는 {{#HelperName 인자값}}{{/HelperName}}의 형태로 선언할 수 있습니다. 

이후 'HelperName'에 해당하는 helper 함수를 <function\>블록에 선언하며, helper 함수의 작업을 수행할 내용과 반환할 결과값을 선언하여 원하는 결과값을 반환하는데 사용할 수 있습니다.

여기서 인자값은 helper 함수로 보낼 데이터를 의미하며 함수의 작업을 수행하는 것에 도움을 주는 역할을 하고 있습니다.


## 2 Helper를 활용한 데이터 필터링
이전 설명에서 Company.java의 각 필드중 iskey가 true인 id 필드에 '@Id'를 생성하는 방법에 대해 설명하였습니다.

이번에는 Helper를 통해 데이터(어노테이션)를 설정하는 방법에 대해 설명하겠습니다.

Template
```
public class {{namePascalCase}} {

    @Id
    {{#addIdAnnotation aggregateRoot.fieldDescriptors}}{{/addIdAnnotation}}
    private {{className}} {{nameCamelCase}};
}

<function>
window.$HandleBars.registerHelper('addIdAnnotation', function (fieldDescriptors) {
    for(var i = 0; i < fieldDescriptors.length; i ++ ){
        if(fieldDescriptors[i] && fieldDescriptors[i].className == 'Long'){
            return "@GeneratedValue(strategy=GenerationType.AUTO)";
        }
    }
    return "";
});
</function>
```
Template Result
```
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String userId;

    private String productName;
}
```
'addIdAnnotation' helper의 인자값을 보면 aggregateRoot.fieldDescriptors를 보내고 있습니다.

이때 <function\>블록에 선언한 addIdAnnotation 함수에 의해 필드의 속성중 className이 'Long'인 필드에 한해 결과값을 반환합니다.

여기서는 Id필드에 한해 'addIdAnnotation' helper가 적용되기 때문에 Id필드에만 어노테이션이 생성되는 것을 확인할 수 있습니다.