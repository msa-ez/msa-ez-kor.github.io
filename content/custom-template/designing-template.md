---
description: ''
sidebar: 'started'
---
# 커스텀 템플릿 만들기

## 템플릿 파일 생성

이벤트스토밍 모델을 실제 소스 코드로 변환하기 위한 템플릿 파일 생성 방법입니다.

다음 예시는 Axon 템플릿에서 AggregateRoot.java 파일의 소스 코드입니다.

```
.forEach: Aggregate
fileName: {{namePascalCase}}Aggregate.java
path: {{boundedContext.name}}/{{{options.packagePath}}}/aggregate
---
package {{options.package}}.aggregate;

import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import static org.axonframework.modelling.command.AggregateLifecycle.*;
import org.axonframework.spring.stereotype.Aggregate;

import org.springframework.beans.BeanUtils;
import java.util.List;
import java.util.UUID;

import lombok.Data;
import lombok.ToString;

{{#checkDateType aggregateRoot.fieldDescriptors}} {{/checkDateType}}
{{#checkBigDecimal aggregateRoot.fieldDescriptors}} {{/checkBigDecimal}}

import {{options.package}}.command.*;
import {{options.package}}.event.*;
import {{options.package}}.query.*;
```

먼저, 이벤트스토밍 스티커의 유형을 선언해야 합니다(Aggregate, Command, Policy 등).

그런 다음 {{ Mustache 엔진 }}을 사용하여 파일의 이름과 경로를 설정해야 합니다.

이 때 패키지명도 선언되어야 하며, 각 파일에 필요한 모든 라이브러리를 가져와야 합니다.

```
@Aggregate
@Data
@ToString
public class {{namePascalCase}}Aggregate {

    {{#aggregateRoot.fieldDescriptors}}
    {{#isKey}}
    @AggregateIdentifier
    {{/isKey}}
    private {{{className}}} {{nameCamelCase}};
    {{/aggregateRoot.fieldDescriptors}}

    public {{namePascalCase}}Aggregate(){}

    {{#commands}}
    @CommandHandler
    {{#if (isRepositoryPost this)}}
    public {{../namePascalCase}}Aggregate({{namePascalCase}}Command command){
    {{else}}
    public void handle({{namePascalCase}}Command command){
    {{/if}}

        {{#triggerByCommand}}
        {{eventValue.namePascalCase}}Event event = new {{eventValue.namePascalCase}}Event();
        BeanUtils.copyProperties(command, event);     

        {{#if (isRepositoryPost ../this)}}
        //TODO: check key generation is properly done
        if(event.get{{@root.aggregateRoot.keyFieldDescriptor.namePascalCase}}()==null)
            event.set{{@root.aggregateRoot.keyFieldDescriptor.namePascalCase}}(createUUID());
        {{/if}}

        apply(event);

        {{#relationCommandInfo}}
        {{#commandValue}}
        //Following code causes dependency to external APIs
        // it is NOT A GOOD PRACTICE. instead, Event-Policy mapping is recommended.

        {{options.package}}.external.{{aggregate.namePascalCase}} {{aggregate.nameCamelCase}} = new {{options.package}}.external.{{aggregate.namePascalCase}}();
        // mappings goes here
        {{relationCommandInfo.boundedContext.namePascalCase}}Application.applicationContext.getBean({{options.package}}.external.{{aggregate.namePascalCase}}Service.class)
        .{{nameCamelCase}}({{aggregate.nameCamelCase}});
        {{/commandValue}}
        {{/relationCommandInfo}}
        {{/triggerByCommand}}
    }

    {{/commands}}
```

첫 번째 주석인 @Aggregate는 Aggregate 스티커를 변환하는 템플릿임을 나타내며, @Data 및 @ToString은 모델로부터 데이터를 받아와 문자열 형태로 변환합니다.

다음으로 클래스 선언이 나옵니다. 템플릿은 Aggregate 스티커의 이름을 기반으로 클래스 이름을 생성하고 그 안에 저장된 속성을 가져옵니다.

{{#aggregateRoot.fieldDescriptors}}는 Aggregate에서 속성을 가져오는 역할을 합니다. {{#isKey}}는 속성의 키 값을 변환하며, @AggregateIdentifier 주석에 의해 속성의 전체 그룹이 소스 코드의 생성자로 변환됩니다.

그런 다음 @CommandHandler가 나옵니다. 이것은 커맨드 스티커에서 정보를 수집하여 도메인 이벤트를 요청하는 메서드로 변환합니다.

각 커맨드는 메서드로 변환되며, 서비스를 실행하는 트리거로 작동합니다.

```
//<<< Etc / ID Generation
    private String createUUID() {
        return UUID.randomUUID().toString();
    }
//>>> Etc / ID Generation

    {{#policies}}

//<<< Clean Arch / Port Method
    
    @CommandHandler
    public void handle({{namePascalCase}}Command command){
        {{#triggerByCommand}}
        {{eventValue.namePascalCase}}Event event = new {{eventValue.namePascalCase}}Event();
        BeanUtils.copyProperties(this, event);     
        apply(event);

        {{#relationCommandInfo}}
        {{#commandValue}}
        //Following code causes dependency to external APIs
        // it is NOT A GOOD PRACTICE. instead, Event-Policy mapping is recommended.

        {{options.package}}.external.{{aggregate.namePascalCase}} {{aggregate.nameCamelCase}} = new {{options.package}}.external.{{aggregate.namePascalCase}}();
        // mappings goes here
        {{relationCommandInfo.boundedContext.namePascalCase}}Application.applicationContext.getBean({{options.package}}.external.{{aggregate.namePascalCase}}Service.class)
        .{{nameCamelCase}}({{aggregate.nameCamelCase}});
        {{/commandValue}}
        {{/relationCommandInfo}}
        {{/triggerByCommand}}
    }
//>>> Clean Arch / Port Method

    {{/policies}}
```

각 Aggregate의 키 값에 대해 템플릿은 무작위로 UUID를 생성하여 문자열 형태로 변환합니다.

또는 id 생성에 대한 정책으로 선언된 규칙이 있으면, 템플릿은 해당 정보를 가져와 핸들러에서 사용할 id를 생성합니다.

@CommandHandler 주석은 커맨드 스티커를 호출하고 액션을 이벤트로 변환하여 서비스를 실행합니다.

```
//<<< EDA / Event Sourcing

    {{#events}}
    
    @EventSourcingHandler
    public void on({{namePascalCase}}Event event) {

        {{#isCreationEvent}}
        BeanUtils.copyProperties(event, this);
        {{/isCreationEvent}}

        //TODO: business logic here

    }

    {{/events}}
//>>> EDA / Event Sourcing
```

마지막 단계는 @EventSourcingHandler로 시작합니다.

이것은 이벤트스토밍 모델에서 도메인 이벤트를 처리하며, 각 이벤트에 대해 하나의 메서드를 가져옵니다.

@EventSourcingHandler 내에서 애플리케이션에 포함시키고자 하는 도메인 이벤트에 대한 비즈니스 로직을 추가할 수 있습니다.

### 템플릿 파일 발행 및 적용

커스텀 템플릿 파일 디자인이 완료되면, 이벤트스토밍 모델을 소스 코드로 변환하기 위해 해당 파일을 자신의 GitHub 저장소에 업로드하고 활용할 수 있습니다.

보드에서 CODE 버튼을 클릭하고 템플릿 변경 페이지를 엽니다.

> 템플릿 변경 페이지
![스크린샷 2023-06-08 오후 2 08 30](https://github.com/kykim97/google-drive/assets/113568664/938f205e-23c4-4d36-9613-4544acac9fe2)

Custom Template을 선택하고 이전에 발행한 템플릿 파일의 GitHub 저장소 URL을 입력합니다.

> URL 입력
![스크린샷 2023-06-08 오후 2 09 22](https://github.com/kykim97/google-drive/assets/113568664/b9561a53-e536-411f-862a-2e1ee81dceef)

적용한 템플릿 파일로 변환된 결과물을 확인합니다.

> 결과물
![스크린샷 2023-06-08 오후 4 35 24](https://github.com/kk-young/google-drive/assets/92732781/41ea7181-2caa-47aa-aff2-b623bfd53b66)

