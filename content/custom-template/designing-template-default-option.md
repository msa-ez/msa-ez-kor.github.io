---
description: ''
sidebar: 'started'
---
# 커스텀 템플릿 만들기 - 기본 속성

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
### Metadata

```
.forEach: Aggregate
fileName: {{namePascalCase}}.java
---
```

먼저, 이벤트스토밍 스티커의 유형을 .forEach에 선언합니다(Aggregate, Command, Policy 등).

이후 fileName에 스티커별 생성될 파일의 이름을 Mustache 구문 내부{{ }}에 변수명에 맞게 선언합니다.

