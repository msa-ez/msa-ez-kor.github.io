---
description: ''
sidebar: 'started'
---
# 커스텀 템플릿 생성 이해하기

spring-boot의 AggregateRoot.java를 예시로 Company.java 템플릿 파일을 생성하는 과정에 대해 설명드리겠습니다.

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

##  Step 2. 클래스 및 필드 생성하기

### 2.1 mustache구문을 활용한 클래스 정의
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

### 2.2 반복문을 활용한 필드 정의

다음은 반복문을 통하여 필드를 정의하겠습니다.

반복문은 데이터의 유형이 배열로되어 해당 데이터를 순회하여 각각의 정보를 가져올 때 사용할 수 있습니다.

기본 형태로는 {{#반복할 데이터}}{{/반복할 데이터}}로 정의하며, 여기서는 aggregateRoot.fieldDescriptors의 데이터를 가져오도록 설정하였습니다.

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

### 2.3 조건문을 활용한 어노테이션 정의

다음 각 필드에 어노테이션(@)이 필요한 경우를 조건문을 통해 생성해보겠습니다.

조건문은 특정 속성에 대하여 참인 경우 하단의 블록을 실행하며, {{#조건문}}{{/조건문}}의 형태로 사용 가능합니다.

이를 통해 aggregateRoot.fieldDescriptors의 데이터중 isKey가 true인 id 필드에만 '@Id'가 생성되도록 하였습니다.

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
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
}
```

##  Step 3. 메소드 생성하기

마지막으로 메소드를 생성하겠습니다.

### 3.1 반복문 each를 활용한 라이프사이클 생성하기

반복문의 경우 {{# 반복할 데이터}}{{/반복할 데이터}}가 기본형태로 사용가능하지만, {{#each 반복할데이터}}{{/each}}로도 배열로된 데이터를 순회하여 각각의 정보를 가져올 수 있습니다.

Template
```
{{#lifeCycles}}
    {{annotation}}
    public void on{{trigger}}(){
    {{#each events}}
    {{namePascalCase}} {{nameCamelCase}} = new {{namePascalCase}}(this);
    {{nameCamelCase}}.publishAfterCommit();
    {{/each events}}
    }
{{/lifeCycles}}
```

Template Result
```
public class Company {
    @PostPersist
    public void onPostPersist() {
        CompanyCreated companyCreated = new CompanyCreated(this);
        companyCreated.publishAfterCommit();
    }
}
```

### 3.2 네이밍 컨벤션을 활용한 Repository 생성

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
마찬가지로 Repository에 대한 메소드도 동적으로 변경되어야할 데이터에 네이밍컨벤션을 설정해야합니다.


## Step 4. 적용 결과
위의 Step을 통해 템플릿파일을 구성하면 다음과 같은 코드를 생성할 수 있습니다.

Template Result
```
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String companyName;

    @PostPersist
    public void onPostPersist() {
        CompanyCreated companyCreated = new CompanyCreated(this);
        companyCreated.publishAfterCommit();
    }
    
    public static CompanyRepository repository() {
        CompanyRepository companyRepository = BasicApplication.applicationContext.getBean(
            CompanyRepository.class
        );
        return companyRepository;
    }
}
```