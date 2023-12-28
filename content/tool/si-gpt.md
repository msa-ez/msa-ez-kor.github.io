---
description: ''
sidebar: 'started'
---

# ChatGPT 기반 구현 및 디버깅 자동화

<h2>Open AI 기술을 활용한 단위테스트 및 디버깅</h2>

![](../../src/img/sigptimg.png)

생성된 이벤트스토밍 모델 기반으로 소스코드를 생성하고, ChatGPT에 프롬프트를 보내 해당 코드가 Runnable한 상태가 될 때까지 테스트 및 디버깅을 자동으로 진행하도록 하는 기능입니다. 

기존 개발자의 업무였던 테스트와 디버깅을 AI에게 위임함으로써 비즈니스 전문가의 아이디어 하나만으로 서비스를 구현할 수 있도록 하였습니다.

<div style = "height:400px; object-fit: cover;">
<iframe style = "width:100%; height:100%;" src="https://www.youtube.com/embed/JuCN-bD7Jkk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div><br>

위 데모영상에서 자세한 수행 방법을 확인하실 수 있습니다.

## 수행 방법

![](../../src/img/sigpt1.png)

![](../../src/img/sigpt2.png)

1. 완성된 이벤트스토밍 모델을 저장하고 Git Repository에 Push합니다.

![](../../src/img/sigpt3.png)

2. 각 Policy 스티커의 속성에서 EXAMPLES 버튼을 클릭해 Given, When, Then에 대한 **Rule**을 추가해줍니다.

![](../../src/img/sigpt4.png)