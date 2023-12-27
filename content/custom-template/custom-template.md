---
description: ''
sidebar: 'started'
---
# Eventstorming Template Objects

## 템플릿 객체

### · 공통 속성 (BoundedContext 제외)

| 변수명                 | 변수 역할                                               |
| ------------------- | --------------------------------------------------- |
| name                | Sticky note에 작성된 이름                                 |
| nameCamelCase       | Sticky note에 작성된 이름의 CamelCase 변환 결과                |
| namePascalCase      | Sticky note에 작성된 이름의 PascalCase 변환 결과               |
| boundedContext      | 자신이 속해있는 BoundedContext 이름                          |
| options.package     | 패키지 명 (ProjectName)                                 |
| options.packagePath | 패키지 경로 ( java의 경우 src/main/java/{{ projectName }} ) |

### · BoundedContext 객체

<table>
<thead>
<tr class="header">
<th>속성</th>
<th>설명</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>name</td>
<td>BoundedContext 이름</td>
</tr>
<tr class="even">
<td>aggregates</td>
<td><p>해당 BoundedContext 안에 속해있는 Aggregate 목록</p>
<p>(하단에 작성되는 Aggregate의 변수 사용 가능)</p></td>
</tr>
<tr class="odd">
<td>portGenerated</td>
<td>생성된 포트번호 (8081부터 시작됨)</td>
</tr>
</tbody>
</table>

### · Aggregate 객체

| 속성            |   설명                   | 타입 |
| ---------------- | -------------------------- | ------- |
| aggregateRoot.fieldDescriptors | Aggregate의 attribute 목록 | Object list |
| keyFieldDescriptor | Key Field Descriptor | FieldDescriptor |
| aggregateRoot.isKey              | Aggregate attribute의 key | boolean |
| events                           | Aggregate에 속해 있는 event 정보 (하단 event 변수 사용 가능) | Object list|
| commands                          | Aggregate에 속해 있는 commands 정보 (하단 commands 변수 사용 가능) | Object list|
| policyList                          | Aggregate에 속해 있는 policy 정보 (하단 policy 변수 사용 가능)  | Object List |
| aggregateRules                    | Aggregate에 해당하는 rule 정보 (하단 Rule 변수 사용 가능) | Object List |

### · Rules 객체

| 속성            |  역할                     |  타입 |
| ---------------- | ---------------------------- | ------ |
| givenAtt         | 외부 BC에서 들어오는 event (하단 event 변수 사용 가능) | Object |
| WhenAtt          | givenAtt event와 연결되어 있는 policy (하단 policy 변수 사용 가능) | Object |
| thenAtt          | 내부 BC에서 Policy와 연결되어 있는 event (하단 event 변수 사용 가능) | Object | 
| attributes.aggregateAtt.attKey| rule의 example에 해당하는 aggregate attribute에 mapping 되는 변수 명 | String | 
| attributes.aggregateAtt.attValue| rule의 example에 해당하는 aggregate attribute에 mapping 되는 변수 값 | String | 
| attributes.givenAtt.attKey| rule의 example에 해당하는 given attribute에 mapping 되는 변수 명 | String | 
| attributes.givenAtt.attValue| rule의 example에 해당하는 given attribute에 mapping 되는 변수 값 | String | 
| attributes.thenAtt.attKey| rule의 example에 해당하는 then attribute에 mapping 되는 변수 명 | String | 
| attributes.thenAtt.attKey| rule의 example에 해당하는 given attribute에 mapping 되는 변수 값 | String | 


### · Event 객체

| 속성           |  역할                       |  타입 | 
| ---------------- | ----------------------          | ---- |
| aggregate        | 자신이 속해있는 Aggregate 정보  | Object | 
| fieldDescriptors | Event Entity 목록               | Object |
| trigger          | Event 전달방식에 관한 Trigger   | String |
| relaionCommandInfo | 동기 통신으로 연결되어 있는 외부 command 객체 정보 | Object |

### · Command 객체

| 속성         |  역할                 |  타입 |
| ----------- | --------------------- | ------- |
| aggregate   | 자신이 속해있는 Aggregate 정보 | Ojbect | 
| isRestRepository | RestAPI 중 어떠한 방식인지.   | boolean | 
| controllerInfo.apiPath | api 경로             | String |
| controllerInfo.method | api method            | String |
| relationEventInfo | 동기 통신으로 연결되어 있는 외부 event 객체 정보 | Object |
| triggerByCommand | 해당 command가 triggering 하는 내부 event 객체 정보 | Object List | 

### · Policy 객체

| 속성               |  역할                  |  타입 | 
| ----------------- | ---------------------- | ---------- |
| aggregateList         | 자신이 속해있는 Aggregate 정보  | Object List | 
| relationAggregateInfo | 연결된 외부 Aggregate 정보 | Object List | 
| relationEventInfo | 연결된 Event에 대한 정보       | Object List | 
| relationExampleInfo | policy와 연결된 내부 event 정보 | Object List | 

### · View 객체

| 속성               |  역할                  |
| ----------------- | ---------------------- |
| aggregate         | 자신이 속해있는 Aggregate 정보  |
| dataProjection    | view의 데이터 구조 방식 변수 |
| viewFieldDescriptors | 데이터 구조에 따른 테이블 정보|
| aggregateEvents   | 자신이 속해있는 Aggregate의 Events 정보 |

### · fieldDescriptors
| 속성               |  역할                  |
| ----------------- | ---------------------- |
| name         |  필드 명 |
| className    | 필드의 데이터 타입 |
| isKey | Key 필드 여부 (Defalut: false) |


### · viewFieldDescriptors

**CQRS**


| 속성               | 역할                  |
| ----------------- | ---------------------- |
| isKey         | Key 값 (default: false)  |
| className   | 변수의 데이터 타입 |
| columnName    | 변수 명 |
| sourceEvent | 해당 변수의 Event의 정보에서 변수 |
| eventDirectValue   | sourceEvent발생시 eventDirectValue값을 columnName 값에 매핑 |
| viewColumnName   | 자신이 속해있는 Aggregate의 정보에서 변수 매핑 |
| sourceEventColumn   | 자신이 속해있는 Aggregate의 Events 정보 |

**UI Mashup**


| 속성               |  역할                  |
| ----------------- | ---------------------- |
| isKey         | Key 값 (default: false)  |
| className   | 변수의 데이터 타입 |
| columnName    | 변수 명 |
| sourceRepository   | -업데이트 예정- |
| repositoryDirectValue   | -업데이트 예정- |
| hateoas   | -업데이트 예정- |
| link   | -업데이트 예정- |


