---
description: ''
sidebar: 'started'
---
# 템플릿 구조의 이해

### Metadata 선언

템플릿 파일을 생성할 때, 먼저 metadata를 설정해야합니다. 

metadata란 템플릿이 데이터를 반복하는 방식, 생성되는 파일의 유형 및 위치, 그 외 설정할 옵션 등을 의미합니다.

설정 방법은 파일의 최상단에 지정할 메다데이터를 생성하며 마지막 메타데이터의 하단에 메타데이터와 템플릿 코드를 분리하기 위한 방법으로 하이푼('---')을 입력합니다.

다음은 메타데이터의 예시입니다.

```
forEach: Aggregate
representativeFor: Aggregate
fileName: {{namePascalCase}}.java
path: {{boundedContext.name}}/{{{options.packagePath}}}/domain
---
<Template Code>
```

예시로 다시 설명드리면 --- 기준 위에 선언된 내용은 메타데이터의 옵션들이며, 아래에는 템플릿 코드로 이해할 수 있습니다.

다음은 메타데이터에 사용하는 옵션의 정의와 예시를 설명드리겠습니다.

1) forEach 

생성될 파일의 유형을 설정합니다. 파일 유형에 대한 대상으로는 컬렉션, 리스트, 배열 등과 같은 반복 가능한 데이터 구조를 사용할 수 있습니다.

    예) forEach: Aggregate
    => Aggregate 스티커를 기준으로 생성.

2) fileName

생성되는 파일의 이름을 나타냅니다. 만약 생성되는 파일이 여러개일 경우 구분을 위해 mustache 구문을 사용하여 생성되는 파일의 이름을 구분지을 수 있습니다.

    예) Aggregate스티커의 namePascalCase가 Order, Delivery일 경우
        forEach: Aggregate
        fileName: {{namePascalCase}}.java
    => Order.java, Delivery.java가 생성

3) path

생성된 파일이 저장될 경로는 지정하는데 사용됩니다. 즉, 특정 Template 파일이 생성될 때 생성될 경로를 설정하는 옵션을 의미합니다.

    예) Bounded context 스티커가 product, Aggregate 스티커가 Order로 생성된 파일의 경로를 domain 하위에 생성할 경우
        forEach: Aggregate
        path: {{boundedContext.name}}/{{{options.packagePath}}}/domain
        => product/src/main/java/fooddelivery/domain 로 생성되며 해당 경로의 하위에 파일들이 생성

4) representativeFor

해당 코드 템플릿이 대표하는 대상을 나타냅니다. 즉, 템플릿이 어떤 종류의 코드를 대표하고 있는지를 나타내며, 주로 코드 생성 규칙을 적용할 대상을 지정하는 데 활용됩니다.

representativeFor는 보통 여러 루프가 돌고 있을때 그 중 특정 루프에 대한 코드 생성을 원할 경우 사용 가능합니다.

    예) 
    forEach: BoundedContext
    representativeFor: Aggregate
    ---
    => BoundedContext내에 존재하는 각각의 Aggregate에 대해 특화된 코드가 생성

5) except 

생성될 파일의 조건을 부여해 조건에 해당하는 경우 예외처리를 하는 설정입니다. except의 조건이 참인지 거짓인지를 판별하는 방식이 단순 데이터로 판별 되는 것이 아닌 특정 조건식을 통해 판별해야하는 경우 function블록에서 정의할 수 있습니다.

    예)
    forEach: View  
    except: {{contexts.isNotCQRS}}
    ---
    <function>
    this.contexts.isNotCQRS = this.dataProjection!="cqrs"
    </function>
    => dataProjection의 데이터가 "cqrs"가 아닐 경우 true가 되어 except처리가 되고 파일 생성이 되지 않습니다.

6) ifDuplicated

코드 생성시에 이미 존재하는 파일 혹은 코드가 있을 경우 어떻게 처리할지 지정하며 대표적으로 abort와 merge가 있습니다. 

abort: 중복된 파일이 있을 때 템플릿 생성을 중단하고 에러를 발생시킵니다.

merge: 중복된 파일이 있으면 해당 파일들을 병합하여 하나의 파일로 생성합니다.

7) mergeType

코드 생성시에 이미 존재하는 파일과 새로 생성되는 템플릿 파일이 있을 경우 병합을 어떤 방식으로 진행할지를 선택하는 옵션이며 다음과 같은 옵션을 설정할 수 있습니다.

template: 기본 옵션으로 새로 생성되는 템플릿으로 이미 존재하는 파일을 덮어쓰는 방식이며 새로운 템플릿이 항상 우선권을 가지고 있습니다.

append: 이미 존재하는 파일에 새로운 템플릿을 추가하는 방식이며 두 내용이 이어져서 하나의 파일에 같이 존재하게 됩니다.

skip: 이미 존재하는 파일이 있을 경우 새로운 템플릿을 생성하지 않습니다. 즉, 이미 있는 파일은 그대로 두며 새로운 파일은 생성되지 않습니다.

    예)
    forEach: Aggregate
    fileName: {{namePascalCase}}.java
    mergeType: template
    ---
    <script>
    public class {{namePascalCase}} {
        {{#aggregateRoot.fieldDescriptors}}
        private {{className}} {{nameCamelCase}};
        {{/aggregateRoot.fieldDescriptors}}
    }
    </script>

    private {{className}} {{nameCamelCase}}; 부분을 

    private {{className}} {{namePascalCase}}; 로 변경하였다면

    이후 변경되어 생성되는 내용에는 {{nameCamelCase}}가 아닌 {{namePascalCase}}가 적용되어 코드가 생성됩니다.

8) priority

다양한 템플릿이나 코드 생성 규칙이 동일한 대상에 적용되는 경우가 있습니다. 이때, 동일한 여러 파일이 중복생성되지 않게 하기 위해 priority를 사용하여 무엇을 우선적으로 적용할지 결정할 수 있습니다. 

priority는 낮은 숫자일수록 생성의 우선순위를 나타내며 동일한 숫자일 경우 순서에 따라 결정됩니다.

    예) Event.java와 PolicyEvent.java의 우선순위 정하기
    
    ###Event.java
    forEach: Event
    fileName: {{namePascalCase}}.java
    priority: 1
    ---

    ###PolicyEvent.java
    forEach: RelationEventInfo
    fileName: {{eventValue.namePascalCase}}.java
    priority: 2
    ---
    => Event.java 우선 생성

9) data 

data는 템플릿에 전달되는 데이터를 지정하는데 사용할 수 있으며 전달된 데이터는 mustache구문을 사용하여 템플릿에서 참조할 수 있습니다.

data는 템플릿 내부에서 사용할 데이터를 제공할 때 주로 사용되며, JSON형식으로 나타낼 수 있습니다.

JSON형식이란 데이터 교환을 위해 사용되는 데이터 형식으로 속성-값 쌍 혹은 배열과 같은 데이터구조로 이루어져 있습니다.

    예) data:
            title: 'Custom Template'
        ---
        {{title}}
        => 'Custom Template'이 출력됩니다.