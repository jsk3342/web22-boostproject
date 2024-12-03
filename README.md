<div align="center">
  <img src="https://github.com/user-attachments/assets/cd7e8ab6-4d94-465d-8817-6ecd18f61125" />
  <br/>
  <br/>
    <br/>
    <br/>
    <br/>
    <a href="https://liboo.kr" target="_blank">
      <img src="https://github.com/user-attachments/assets/ad322787-ad07-4405-b526-112c882e66ab" width="250" />
    </a>
  <h1> 라이부 LiBoo </h1>
  <h3> 컨퍼런스를 더 가까이, LiBoo 에서 라이브로 🚀 </h3>
</div>
<br />
<br />
<br />

# 💻 데모 및 배포 링크

- **서비스 링크**: [https://liboo.kr](https://liboo.kr/)


<br/>

![테스트용 (2)](https://github.com/user-attachments/assets/17eb5365-41d0-4982-b866-99639084277f)

# 🎯기획 배경

네이버 DAN, 토스 Slash, 카카오 If, 인프콘...

다양한 컨퍼런스가 열리지만 **참여는 여전히 쉽지 않습니다.**

- 높은 경쟁률
- 제한된 참가 기회

**LiBoo**는 이러한 현실을 바꾸기 위해 시작되었습니다.

## **LiBoo가 만드는 변화와 목표**

- **누구나** 쉽게 기술을 공유하고 배울 수 있는 열린 플랫폼
- **팀원 간 소규모 공유**부터 **기업 컨퍼런스 협업**까지 지원
- 더 많은 사람들이 참여할 수 있는 **기술 공유 기회 확대**
<br/>

# 📺 핵심 기능

### 실시간 컨퍼런스 스트리밍

실시간 컨퍼런스를 시청하거나 호스트가 되어 컨퍼런스를 직접 스트리밍 할 수 있습니다.

### 실시간 채팅

컨퍼런스를 보며 채팅으로 소통할 수 있습니다. 질문이 있다면 질문 채팅으로 전송이 가능합니다.

### 메인 대시보드

동영상 미리보기, 카테고리 등을 통해 원하는 컨퍼런스를 탐색해 볼 수 있습니다.

### 컨퍼런스 다시보기

실시간으로 방송되었던 컨퍼런스를 다시 돌려볼 수 있습니다.

<br/>

# ⚙️ 서비스 아키텍처
![Streaming Data Architecture](https://github.com/user-attachments/assets/02e854c4-4512-482d-bda2-719b7ceabea6)

### 🎥 호스트

- **방송 시작**
    - 호스트는 **OBS**를 통해 방송을 시작합니다.
- **스트림 전송**
    - OBS에서 생성된 **RTMP 스트림**을 **RTMP 서버**로 전송합니다.
- **스트림 변환 및 업로드**
    - RTMP 서버는 스트림을 **HLS 세그먼트**(`.ts` 파일)와 **`index.m3u8`** 파일로 변환합니다.
    - 변환된 파일을 **Object Storage**에 업로드합니다.
- **방송 정보 관리**
    - **API 서버**와 방송 정보를 주고받아 클라이언트 대시보드에 방송을 노출시킵니다.
- **실시간 시청**
    - 클라이언트는 **Object Storage**에 직접 접근하여 **HLS 세그먼트**와 **`index.m3u8`** 파일을 통해 실시간 영상을 시청합니다.

<br />

### 💬 클라이언트

- **채팅 기능**
    - 호스트를 포함한 모든 클라이언트는 **채팅 서버**와 통신하여 실시간으로 채팅을 주고받을 수 있습니다.
- **채팅 종류**
    - **질문**, **일반**, **공지** 채팅으로 구분됩니다.
- **질문 채팅 처리**
    - **질문 채팅**은 1차적으로 **Redis**에 캐싱됩니다.
    - 방송 종료 후 **MySQL**에 영구 저장됩니다.

<br />

### 🚀 CI/CD

- **배포 도구**
    - **프론트엔드**와 **백엔드** 모두 **GitHub Actions**, **Docker**, **Docker Swarm**을 활용하여 **NCP**에 배포됩니다.

<br/>

# 🛠️ 기술 스택

| Part       | Stack                                                                                           |
| ---------- | ----------------------------------------------------------------------------------------------- |
| 공통       | ![fullstack 2](https://github.com/user-attachments/assets/1a7f6b03-9d59-4ecc-adc9-39ad17ac67a4) |
| 프론트엔드 | ![fullstack 1](https://github.com/user-attachments/assets/64fdaa86-289d-42f0-80ce-4f01df4bfe75) |
| 백엔드     | ![fullstack 3](https://github.com/user-attachments/assets/8a01cd0b-f324-4c6e-85f6-f75c74239bdb) |

<br/>

# 📝 핵심 기술 정리

프로젝트를 진행하면서 겪은 다양한 경험과 학습 내용을 정리한 블로그 포스트를 공유합니다. 각 포스트는 LiBoo의 개발 과정에서 얻은 통찰과 해결한 문제들을 상세히 다루고 있으며, 비슷한 프로젝트를 진행하는 분들에게 유용한 참고 자료가 될 것입니다.

### 📺 메인 대시보드

- [**동영상 스트리밍 처리 프로토콜을 알아보자**](https://www.notion.so/b987e92eb6c84eef9af1301877eb7c91?pvs=21)
    - **설명**: 실시간 스트리밍의 핵심인 RTMP와 HLS 프로토콜의 차이점과 각각의 장단점을 깊이 있게 분석합니다. LiBoo 프로젝트에서 어떻게 적용되었는지 구체적인 사례를 통해 설명하여, 스트리밍 처리에 관심 있는 개발자들에게 유용한 정보를 제공합니다.
- [**React Query - Suspense 활용하기](https://www.notion.so/React-Query-useQuery-Suspense-74beaa80dbe34d70942b48a198636afb?pvs=21), [React Query - onError 활용하기](https://www.notion.so/React-Query-useQuery-onError-23e412b69af04c50b5d5da1cca386bba?pvs=21)**
    - **설명**: React Query의 `Suspense` , `onError`속성으로 데이터 패칭의 상태 관리를 하게된 과정과 트러블 슈팅을 담았습니다.

### 🎥 호스트 페이지

- [**리액트 훅 폼 딥다이브**](https://www.notion.so/38fb796bb3034277885637e54f8747bb?pvs=21)
    - **설명**: **리액트 훅 폼**의 기능과 내부 동작 방식을 심층적으로 탐구합니다. 특히 **Controlled 컴포넌트**와 **Uncontrolled 컴포넌트**의 차이점과 각각의 장단점을 상세히 분석하며, 이를 통해 폼 관리의 효율성을 최적화하는 방법을 제시합니다.

### 💬 채팅

- [**채팅 서버의 확장성을 고려한 Redis-Cluster 및 Redis Adapter**](https://www.notion.so/12-03-151673f3719e80068a99d912ef97f0b9?pvs=21)
    - **설명**: 실시간 채팅 기능의 원활한 운영을 위해 Redis 클러스터링과 어댑터 설정을 도입한 과정을 상세히 설명합니다. 대규모 사용자 트래픽을 처리해야 하는 서비스에 관심 있는 백엔드 개발자들에게 유용한 정보를 제공합니다.

### ☁️ 인프라

- [**백엔드 서버의 확장성을 고려한 Docker 및 Docker Swarm 도입**](https://www.notion.so/12-03-151673f3719e80068a99d912ef97f0b9?pvs=21)
    - **설명**: 컨테이너화된 인프라를 통해 서비스의 확장성과 배포 효율성을 높이는 방법을 다룹니다. DevOps에 관심 있는 개발자와 인프라 엔지니어들에게 중요한 가이드를 제공합니다.

[더 많은 기술정리 보러 가기](https://gominzip.notion.site/12d673f3719e8098ad94ed6b71b10ac0?pvs=4)

<br/>

# TEAM 정권지르기 👊

|                                     김준서                                     |                                     김영길                                     |                                    고민지                                     |                                    김지수                                    |                                    홍창현                                    |
| :----------------------------------------------------------------------------: | :----------------------------------------------------------------------------: | :---------------------------------------------------------------------------: | :--------------------------------------------------------------------------: | :--------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/45356754?v=4" width="120" /> | <img src="https://avatars.githubusercontent.com/u/46553489?v=4" width="120" /> | <img src="https://avatars.githubusercontent.com/u/101329724?v=4" width="120"> | <img src="https://avatars.githubusercontent.com/u/85912592?v=4" width="120"> | <img src="https://avatars.githubusercontent.com/u/48922050?v=4" width="120"> |
|                                     **BE**                                     |                                     **BE**                                     |                                    **FE**                                     |                                    **FE**                                    |                                    **FE**                                    |
|                       [@i3kae](https://github.com/i3kae)                       |                    [@hoeeeeeh](https://github.com/hoeeeeeh)                    |                   [@gominzip](https://github.com/gominzip)                    |                    [@jsk3342](https://github.com/jsk3342)                    |                   [@spearStr](https://github.com/spearStr)                   |

<div align="center">
  <p align=center>
    <a href="https://gominzip.notion.site/TEAM-127673f3719e803faf63c70322560d3b?pvs=4"> Notion </a> &nbsp; ｜ &nbsp; 
    <a href="https://www.figma.com/design/op5Ui6oZ4Zx2D8VUgWOKM0/LiBoo-%F0%9F%9A%80?node-id=1-2&node-type=canvas&t=zcYYT1qCtckcUdcs-0"> Figma </a> &nbsp; ｜ &nbsp;
    <a href="https://github.com/boostcampwm-2024/web22-LiBoo/wiki"> Wiki </a> &nbsp; ｜ &nbsp;
    <a href="https://github.com/orgs/boostcampwm-2024/projects/17"> BackLog </a>
  </p>
</div>
