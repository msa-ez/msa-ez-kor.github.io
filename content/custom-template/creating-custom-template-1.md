---
description: ''
sidebar: 'started'
---
# 커스텀 템플릿 생성
커스텀 템플릿은 원하는 템플릿을 제공된 기본 템플릿에 추가하여 이벤트스토밍 모델의 결과에 따라 원하는 템플릿으로 코드를 생성합니다.

##  Step 1. 템플릿 구조 정의하기

먼저 파일 최상단에 metadata를 선언합니다.  

metadata란 템플릿이 데이터를 반복하는 방식, 생성되는 파일의 유형 및 위치, 그 외 설정할 옵션 등을 의미합니다.

Template
```
forEach: Aggregate
fileName: {{namePascalCase}}.java
path: {{boundedContext.name}}/{{{options.packagePath}}}/domain
---
```

### 1.1 파일 유형 설정
여기서 forEach를 통해 템플릿이 생성될 파일의 유형을 설정합니다.

forEach의 값으로는 이벤트스티커들을 가져올 수 있으며 여기서는 Aggregate 기준으로 설정하였습니다.

### 1.2 파일 이름 정의 

그 다음 fileName을 통해 생성될 파일의 이름을 설정합니다.

fileName을 {{namePascalCase}}.java로 지정하였기 때문에 이 파일이 Company.java로 생성됩니다.

### 1.3 파일 경로 설정

마지막으로 path를 통해 Company.java가 생성될 경로를 설정합니다.

현재 {{boundedContext.name}}/{{{options.packagePath}}}/domain로 설정함으로써 해당 Aggregate가 속한 BoundedContext의 하위 폴더 domain에 Company.java 파일이 생성됩니다.

metadata의 옵션 설정들이 완료되면 하단에 작성할 템플릿코드와 분리되기 위해 마지막 메타데이터의 하단에 하이푼('---')처리를 입력하면 metadata설정이 완료됩니다.

##  Step 2. 패키지 및 임포트 생성하기

### 2.1 데이터 접근을 활용한 패키지 설정

일반적으로 기준이 되는 스티커의 데이터에 접근할 때는 {{데이터}}의 형식으로 접근 가능합니다.

하지만 특정 데이터의 내부에 있는 데이터 속성에 접근할 때는 '.'을 이용하며, {{데이터.내부속성}}로 작성할 수 있습니다.

Template
```
package {{options.package}}.domain;
```
Template Result
```
package customtemplate.domain;
```
예시에서는 Aggregate의 데이터중 options의 내부 데이터 속성 package에 접근하기 위해 options.package를 이용하여 결과값을 반환하였습니다.

### 2.2 데이터 접근을 활용한 임포트 설정

내부 데이터로 접근하는 것과 반대로 외부 데이터에 접근해야할 때가 있습니다.

이때, 외부 범위의 데이터를 접근하기 위해서는 '../'를 이용하며, {{../외부데이터}}로 작성할 수 있습니다.

Template
```
{{#lifeCycles}}
{{#events}}
import {{../../options.package}}.domain.{{namePascalCase}};
{{/events}}
{{/lifeCycles}}
```
Template Result
```
import customtemplate.domain.CompanyCreated;
```
예시에서 데이터의 위치가 Aggregate가 아닌 event로 변경됨에 따라 다시 Aggregate의 데이터 options에 접근하려면 외부 데이터 접근 방식을 사용해야됩니다.

따라서 2번의 범위가 변경됨에 따라 {{../../options.package}}를 사용하여 Aggregate의 options 데이터에 접근할 수 있게 됩니다.

##  Step 3. 클래스 및 필드 생성하기

### 3.1 mustache구문을 활용한 클래스 정의
mustache구문을 이용하여 Company 클래스를 생성하겠습니다.

mustache구문을 활용하면 동적으로 변경되어야 할 데이터를 설정할 수 있습니다. 

여기서는 클래스 이름이 각각의 Aggregate의 이름에 따라 변화되어야하며, 네이밍컨벤션을 통해 대문자로 생성하도록 처리합니다.

Template
```
public class {{namePascalCase}} {

}

```
Template Result
```
public class Company {

}
```

### 3.2 반복문을 활용한 필드 정의

다음은 반복문을 통하여 필드를 정의하겠습니다.

반복문은 데이터의 유형이 배열로되어 해당 데이터를 순회하여 각각의 정보를 가져올 때 사용할 수 있습니다.

기본 형태로는 {{#반복가능한객체}}{{/반복가능한객체}}로 정의하며, {{#each 반복가능한객체}}{{/each}}로도 반복문을 사용할 수 있습니다.

each의 경우 {{#each 반복가능한객체}}{{@key}}{{/each}} 의 형태로 사용하여 반복한 객체의 속성중 key에 해당하는 값들을 결과값으로 반환할 수도 있습니다. 

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

    private Address address;
}
```
여기서는 aggregateRoot.fieldDescriptors의 데이터를 {{#반복할 데이터}}{{/반복할 데이터}}을 통해 가져옴으로써 각 필드의 데이터중 {{className}}과 {{nameCamelCase}}에 접근할 수 있게 됩니다.

### 3.3 조건문을 활용한 어노테이션 정의

다음은 각 필드에 어노테이션(@)이 필요한 경우를 조건문을 통해 생성해보겠습니다.

조건문은 특정 속성에 대하여 참인 경우 하단의 블록을 실행하며, {{#조건문}}{{/조건문}}의 형태나 {{#if 조건문}}{{/if}}의 형태로 사용가능합니다.

반대로 특정 속성에 대하여 거짓인 경우에 하단의 블록을 실행할 수 있습니다.

일반적으로 {{^ 조건문}}{{/조건문}}으로 사용하며 {{#if 조건문}}{{else}}{{/if}}처럼 조건이 참일 경우와 거짓일 경우에 대해 설정할 수 있습니다.

또한 {{#unless 조건문}}{{/unless}}를 통해서도 조건이 거짓인 경우에 대해 설정할 수 있습니다.

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
public class Company {

    @Id
    private Long id;

    private String name;
}
```
예시는 @Id를 생성하는 과정에 대한 설명입니다.

먼저 {{^isVO}}를 통해 필드의 속성중 isVO가 false 조건에 부합하는 필드를 선별하였습니다.

이후 {{#isKey}}{{/isKey}}를 통해 isKey가 true인 필드를 선별하였습니다.

두 조건문을 통해 VO필드가 아니면서 동시에 key값을 가진 필드 id에만 @Id가 생성되는 것을 확인할 수 있습니다.

##  Step 4. 메소드 생성하기

### 4.1 네이밍 컨벤션을 활용한 Repository 메소드 생성

스티커의 데이터에는 네이밍컨벤션을 활용하여 결과값을 반환할 수 있습니다.

Template
```
public static {{namePascalCase}}Repository repository(){
    {{namePascalCase}}Repository {{nameCamelCase}}Repository = {{boundedContext.namePascalCase}}Application.applicationContext.getBean({{namePascalCase}}Repository.class);
    return {{nameCamelCase}}Repository;
}
```
Template Result
```
public static CompanyRepository repository() {
    CompanyRepository companyRepository = BasicApplication.applicationContext.getBean(
        CompanyRepository.class
    );
    return companyRepository;
}
```
예시에서는 네이밍컨벤션 namePascalCase와 nameCamelCase를 이용하여 'Company'와 'company'로 결과값을 반환하여 필요한 상황에 데이터를 동적으로 변화하여 코드를 완성하였습니다.


## Step 5. 적용 결과
위의 Step을 통해 템플릿파일을 구성하면 다음과 같은 코드를 생성할 수 있습니다.

Template Result
```
package customtemplate.domain;

import customtemplate.domain.CompanyCreated;

public class Company {

    @Id
    private Long id;

    private String companyName;

    public static CompanyRepository repository() {
        CompanyRepository companyRepository = BasicApplication.applicationContext.getBean(
            CompanyRepository.class
        );
        return companyRepository;
    }
}
```