---
description: ''
sidebar: 'started'
---

<h1>구내 설치형 AI기반 분석설계 및 구현, 배포<br>(MSA Easy + DeepSeek)</h1>

<div style="position: relative; padding-bottom: 56.25%; padding-top: 0px; height: 0; overflow: hidden;">
	<iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
        src="https://www.youtube.com/embed/4PX4CWrdGCg?si=oD969pF_VGUpSf4Q&amp;start=3652" 
        frameborder="0" crolling="no" frameborder="none" allowfullscreen="">
    </iframe>
</div>
<p style="margin: 10px 0 40px 0;"><&quot;DeepSeek-R1-Distill-Qwen-32B&quot; 모델을 적용한 &quot;데모 애플리케이션 - 민원신청&quot; 시연 영상></p>


**MSA Easy**가 **DeepSeek AI** 추론 모델을 로컬 환경에서 직접 활용할 수 있도록 지원합니다.

**DeepSeek 모델**은 7B, 67B 등 다양한 매개변수 크기로 제공되며, 2조 토큰 이상의 방대한 데이터로 훈련되었습니다. 이 데이터에는 코드, 수학 문제, 일반 텍스트 등이 포함되어 있어 다양한 분야에서 활용할 수 있습니다. 특히 주목할 만한 점은 대부분의 모델이 MIT나 Apache 2.0 라이선스 하에 오픈소스로 공개되어 있다는 것입니다.

**Ollama** 도구를 활용하여 DeepSeek AI 모델을 로컬 환경에 직접 설치하고 이를 활용함으로써, 클라우드 기반 AI 서비스의 비용과 의존성을 줄이고 온프레미스 환경에서도 AI 기능을 자유롭게 사용할 수 있습니다.

특히, DeepSeek AI를 활용해 요구사항을 분석하고, 도메인 주도 설계(DDD) 기반의 클라우드 네이티브 모델링을 설계자와 소통(Human-in-the-loop)하며 최적화할 수 있어, 더욱 정교한 마이크로서비스 아키텍처를 구축할 수 있으며, 데이터 일관성을 확보하면서도 유연한 설계가 가능해졌습니다.
<br><br>

## MSA-Easy MSA 개발 프로세스

<img src="https://github.com/user-attachments/assets/5fe9e0c5-064f-4969-ad9e-5389196f08f6">
<br>
MSA Easy는 도메인 분석을 통해 마이크로서비스를 도출하고, 헥사고날 및 이벤트 드리븐 아키텍처 기반으로 설계한 후, 자동화된 테스트와 CI/CD 배포를 통해 안정적인 MSA 개발을 지원하는 전 주기에 걸친 프로세스를 제공합니다. 
<br><br>

## 온프레미스 AI를 활용한 마이크로서비스 설계/구현/배포

<img src="https://github.com/user-attachments/assets/b2851b91-543c-47a4-82d7-335ea0b1baa7">
<br>
MSA-Easy는 온프레미스 DeepSeek AI 모델을 활용하여 마이크로서비스를 자동 생성하고, 프로덕션 환경과 연동하여 마이크로서비스 설계를 자동화하고, AI를 활용한 자동화된 마이크로서비스 아키텍처 구축을 지원하여, 보다 효율적인 MSA 환경 도입을 가능하게 합니다. 
<br><br>


## 클라우드 GPU 서비스를 활용한 DeepSeek 환경 구성
### RunPod(https://runpod.io/)를 활용한 DeepSeek 모델 환경 설정

**1. RunPod의 Pods 메뉴를 통해서 새로운 Pod를 만들어서 요청할 수 있습니다.**

<img style="margin-top: -20px;" src="https://github.com/user-attachments/assets/8c1c8845-c031-4cb4-8cbb-596acc79fe47">

- 설정 가능한 VM은 80GB가 최소이며, 이정도도 충분합니다.
- 커뮤니티 클라우드, 시큐어 클라우드가 있으며, 현재 커뮤니티 클라우드는 불안정한 부분이 있기 때문에 시큐어를 사용합니다.
- 아키텍쳐: `4x RTX 4000 Ada` > `4x RTX A4500` 
   - Cummunity Cloud인 경우에는 현재 선택가능한 인스턴스 옵션이 항상 다르기 때문에 '4x RTX 4000 Ada' 선택이 불가능할 경우 유사한 성능의 인스턴스를 선택합니다.
<br><br>

**2. Edit Templdate을 눌러 템플릿을 설정합니다.**

<img src="https://github.com/user-attachments/assets/a39f6e9a-0651-4e58-96c7-74a45cf95c99">
<br>

<img src="https://github.com/user-attachments/assets/c155ff28-3f51-47d0-96d7-e12952e6a8d9">

- 템플릿 설정인 경우, `Qwen 2.5 Coder 32B - SGLang by Relis`와 같은 SGLang 베이스가 안정적입니다.
   - `--tensor-parallel-size`는 사용자가 선택한 GPU 인스턴스의 수에 따라서 조절합니다.
   - `--mem-fraction-static`이 있어야 메모리 관련 에러가 발생하지 않습니다.

```bash
python3 -m sglang.launch_server --model-path deepseek-ai/DeepSeek-R1-Distill-Qwen-32B --context-length 131072 --host 0.0.0.0 --port 8000 --tensor-parallel-size 사용된 인스턴스의 GPU 수 --api-key LLM 요청시 사용 할 API 키 --mem-fraction-static 0.9 --disable-cuda-graph
```

<img src="https://github.com/user-attachments/assets/92598e42-caa6-4977-9912-557914ee322f">
<br>

<img src="https://github.com/user-attachments/assets/93c4499b-51a6-4ba5-9248-d7e3a9ccd1f0">

- Volume Disk는 90GB정도면 충분합니다.
- On-Demand로 설정하는게 안정적입니다.
<br><br>

### DeepSeek모델 설정 확인
#### 로그 확인하기

<img src="https://github.com/user-attachments/assets/73b97cce-9619-4739-80c5-039cf2d7ed23">
<br>

<img src="https://github.com/user-attachments/assets/7d25d7fa-0b86-4159-b2ad-dbb23c1e2719">

- `Log > Container`로 로그를 확인합니다.
- `The server is fired up and ready to roll`: 실제로 쓸 수 있게 되는 시점
<br><br>
   
#### 접속하기

<img src="https://github.com/user-attachments/assets/b26e1608-85b2-42df-9e08-0e6a9439a700">
<br>



- `Connext > HTTP Service`
- 접속 URL은 올려진 Pod에 들어가는 경로입니다.

```bash
https -v POST https://dkkzpbvvh17k7v-8000.proxy.runpod.net/v1/chat/completions \
  Authorization:"Bearer dream-flow" \
  model="neuralmagic/DeepSeek-R1-Distill-Llama-70B-quantized.w8a8" \
  messages:='[{"role": "user", "content": "프랑스의 수도는 어디야?"}]'
```
<br><br>

## MSA Easy에서 RunPod기반 DeepSeek 모델을 사용하기 위한 설정
**1. 관련 Proxy 서버를 실행합니다.**
```bash
node ./server.js
```

**2. localStorage를 값을 변경해서 관련 모델을 사용하도록 만듭니다.**
```js
localStorage.complexModel = "deepseek-ai/DeepSeek-R1-Distill-Qwen-32B"
localStorage.standardModel = "deepseek-ai/DeepSeek-R1-Distill-Qwen-32B"
localStorage.simpleModel = "deepseek-ai/DeepSeek-R1-Distill-Qwen-32B"
localStorage.runpodUrl = "https://svcb72e2g5wki5-8000.proxy.runpod.net/v1/chat/completions"
```
<img src="https://github.com/user-attachments/assets/afa73078-4398-4187-979a-e789c75a574b">
<br>

**3. 테스트 완료시, 기존 디폴트 모델 사용을 위해서 다시 빈 값으로 초기화합니다.**
```js
localStorage.complexModel = ""
localStorage.standardModel = ""
localStorage.simpleModel = ""
```
