---
description: ''
sidebar: 'started'
---
# Github Action

## CI - Github Action
GitHub Action은 코드 저장소에서 직접 소프트웨어 개발 워크플로우를 자동화할 수 있게 해주는 GitHub의 내장 도구이며 코드 변경사항이 push되거나 pull request가 생성될 때 자동으로 작업을 실행할 수 있습니다.

GitHub Action은 CI프로세르를 구현하는데 효과적이며 여러 운영체제와 버전에서 테스트를 실행할 수 있다는 이점과 다양한 액션을 조합하여 원하는 워크플로우를 만들 수 있고, Github와의 통합으로 접근성이 용이하다는 이점이 있습니다.

## 적용 방법
### STEP1. Topping 적용
Code > Code Preview를 클릭 > 우측 상단 Toppings > Marketplace를 클릭하여 아래와 같은 화면으로 진입합니다. <br>
![](https://github.com/user-attachments/assets/58b2c46c-1155-4340-bbfe-8372830bbecb)

상단의  'TOPPINGS' > 'Github Action' > Apply 클릭을 통해 토핑을 적용합니다. <br>

적용 후 최상위 루트의 'github/workflows'를 확인하면 아래와 같은 'github-action.yml'파일이 생성된 것을 확인할 수 있습니다.
```
name: github-action
run-name: ${{ github.actor }} is out building GitHub Actions

on:
  push:
    # Pattern matched against refs/tags
    tags:        
      - '**' 

jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Set up QEMU
        uses: docker/setup-qemu-action@v2
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2
      
      - name: Create and use multi-platform builder
        run: |
          docker buildx create --use --name builder --platform linux/amd64,linux/arm64
          docker buildx inspect --bootstrap
      
      - name: Login to GitHub Container Registry
        uses: docker/login-action@v2
        with:
          registry: ghcr.io
          username: ${{ github.repository_owner }}
          password: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Build Maven Projects
        run: |

      - name: Set lowercase names to use in tags
        run: |
          echo "REPO_NAME=$(echo ${{ github.repository }} | tr '[:upper:]' '[:lower:]')" >> $GITHUB_ENV
          echo "REF_NAME=$(echo ${{ github.ref_name }} | tr '[:upper:]' '[:lower:]')" >> $GITHUB_ENV


      - name: Update Kubernetes manifests
        run: |
          git config --global user.email ${{ github.actor }}@users.noreply.github.com
          git config --global user.name "${{ github.actor }}"
          git add ./kubernetes/template/template.yml
          git commit -m "Update image tag to ${{ env.REF_NAME }}"
          git push origin HEAD:main
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

```

### STEP2. Git repo 생성
토핑을 적용한 상태에서 Code Preview 상단의 'push to Git' 아이콘을 클릭 > 'Create'를 진행하여 연결된 Github에 repo를 생성합니다.
<img width="667" alt="image" src="https://github.com/user-attachments/assets/8d8bb5a0-16d1-49e6-874d-26569d842e61">


### STEP3. Github Action 설정
생성된 repo의 github폴더 명을 다음과 같이 수정합니다. <br>

```
github -> .github
```

이후, 저장소의 설정을 다음의 단계로 확인합니다.

1. 'Settings'을 클릭하여 해당 repo의 설정에 접근합니다.
<img width="931" alt="setting1" src="https://github.com/sooheon45/topping-github-action/assets/54785805/4007c96b-1244-43ad-bf5c-042a114a0ba1">

2. 좌측 메뉴 Actions > Genernal 클릭 후, Workflow permissions 항목을 확인합니다.
<img width="333" alt="setting2" src="https://github.com/sooheon45/topping-github-action/assets/54785805/059d6d61-ee9e-41ec-8e08-1021031a18fe">

3. "Read and write Permissions." 옵션을 선택한 후 'Sava'를 통해 설정을 완료합니다.
<img width="903" alt="setting3" src="https://github.com/sooheon45/topping-github-action/assets/54785805/fe562497-e860-4d8b-9d5a-f189ef3dce8d">

## 실행 방법

해당 repo의 변경사항이 발생하였을 때, commit & push를 진행한 다음 아래와 같이 Releases > 'Create a new release'를 클릭합니다.
<img width="1130" alt="스크린샷 2024-08-09 오후 1 42 47" src="https://github.com/user-attachments/assets/323f9f4e-7b21-4983-aba0-c12c024ce874">

'Choose a tag' > 생성할 태그 (ex. v0.x) 생성 및 선택 > 'Publish release' 클릭을 통해 release를 생성합니다.
* tag생성을 하는 이유는 github-action 실행 조건을 tag 설정하였기 때문입니다.

생성 후, 상단 'Actions'를 클릭하면 아래와 같이 Github action이 실행되는 것을 확인 할 수 있습니다.
<img width="1035" alt="image" src="https://github.com/user-attachments/assets/d6aaa850-b874-45c9-974f-d99c404b2b3f">