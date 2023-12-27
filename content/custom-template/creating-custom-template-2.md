---
description: ''
sidebar: 'started'
---
# 커스텀 템플릿 생성 이해하기

이전 단계에서 metadata, 데이터 접근, 반복문, 조건문을 통해 커스텀 템플릿을 구성하는 방법에 대해 설명하였습니다.

이번에는 helper를 통해 template에서 결과값을 반환하는 방법에 대해 설명하겠습니다.

helper란 특정 조건을 구성하는 로직을 통해 필요한 결과값을 반환하는 template 문법을 의미합니다.

## Helper를 활용한 어노테이션 설정

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
이전단계에서 Company.java의 각 필드중 key를 가지고 있는 id 필드에 @Id를 생성하는 방법에 대해 설명하였습니다.

이번에는 Helper를 통해 어노테이션을 설정하는 방법에 대해 설명하겠습니다.

먼저 Helper는 {{#HelperName 인자값}}{{/HelperName}}의 형태로 사용되며, 인자값은 특정 조건을 판별하기위해 보내는 데이터를 의미합니다.

## Global Helper를 활용한 템플릿 코드 구성

