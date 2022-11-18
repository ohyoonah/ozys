# 오윤아 Ozys Front-end 과제

## 목차

## 프로젝트 정보

### 설치 방법

```
yarn
yarn start
```

### 기술 스택

`Typescript` `React` `styled-components` `Recoil`

### 라이브러리

`ethers.js`

### 디렉토리 구조

```
ozys
├─ .gitignore
├─ .prettierrc
├─ package.json
├─ public
│  ├─ favicon.ico
│  ├─ index.html
│  ├─ manifest.json
│  └─ robots.txt
├─ README.md
├─ src
│  ├─ App.test.tsx
│  ├─ App.tsx
│  ├─ atoms
│  │  ├─ dropState.ts
│  │  └─ metaMaskState.ts
│  ├─ components
│  │  ├─ common
│  │  │  └─ buttonStyle.ts
│  │  ├─ dropdown
│  │  │  ├─ Dropdown.tsx
│  │  │  └─ dropStyle.ts
│  │  ├─ metamask
│  │  │  ├─ MetaMask.tsx
│  │  │  ├─ metaMaskStyle.ts
│  │  │  └─ Wallet.tsx
│  │  └─ popup
│  │     ├─ Popup.tsx
│  │     └─ popupStyle.ts
│  ├─ data
│  │  └─ items.ts
│  ├─ index.css
│  ├─ index.tsx
│  ├─ react-app-env.d.ts
│  └─ reportWebVitals.ts
├─ tsconfig.json
└─ yarn.lock
```

---

## 프로젝트 결과

#### 1. React 로 드롭다운 만들기

<img src="./public/dropdown_1.JPG" width="200" height="450"/>

<br>

- `src/data/items.ts` 파일 안에 드롭다운 메뉴 리스트에 들어갈 데이터를 분리해 두고 `import` 해서 사용했습니다.

- `src/atoms/dropState.ts` 파일 안에 `Recoil` 상태관리 라이브러리를 사용해서 전역 상태관리를 했습니다.

- 드롭다운 버튼을 클릭하면 버튼 텍스트가 바뀌고 화살표 방향도 180도 회전하도록 했습니다.

- `useRef`를 사용해 드롭다운이 열린 상태에서 드롭다운 리스트 외부 영역을 클릭하면 드롭다운이 닫히도록 했습니다.
- `click`이벤트 대신 `mousedown`이벤트를 사용해서 클릭과 동시에 이벤트가 발생하도록 했습니다.

- 데이터가 담긴 `items`를 `map` 메서드를 사용하여 모든 요소를 순회해 가며 리스트로 나타냈습니다.

- 리스트 아이템 하나의 크기를 `50px`로 지정하고, 총 리스트의 길이를 `calc(50px * 10)`으로 해서 10개의 아이템이 보여지게 했습니다.
- 리스트에 `overflow-y: auto`를 넣어서 해당 길이를 초과하면 스크롤이 생기도록 만들어 주었습니다.

- 리스트 아이템을 클릭하면 각 아이템에 해당하는 이미지, 이름, 가격 정보등 로우 데이터를 팝업창으로 띄워 주었습니다.

#### 2. 팝업 컴포넌트 구현하기

<img src="./public/popup_1.JPG" width="400" height="300"/>

<br>

- 드롭다운 리스트 아이템을 클릭하면 팝업창을 띄워 주었습니다.

- `styled-components`로 `Overlay` 스타일 컴포넌트를 만들어 팝업창이 뜨면 배경이 어두워지는 효과를 구현했습니다.

- 각 팝업창에는 닫기 버튼과 팝업 추가 버튼을 만들었습니다.
- 닫기 버튼을 클릭하면 해당 팝업과 오버레이가 닫힙니다.
- 팝업 추가 버튼을 클릭하면 새로운 팝업과 오버레이가 추가됩니다.

- 더 나중에 표시되는 팝업일수록 화면 상에서 더 높은 우선도를 가지며 이전에 표시된 팝업보다 위에 표시되도록 했습니다.

- 세 번째 팝업에서 팝업 추가 버튼을 클릭하면 팝업은 최대 세 개라는 `alert` 메시지를 띄워 주었습니다.

- 드롭다운과 마찬가지로 외부 영역을 클릭하면 해당 팝업이 닫히도록 했습니다.
- 드롭다운과 다른 점은 여러 개의 `useRef`를 사용했다는 점입니다.
- 외부 영역이 겹쳐 세 개의 팝업이 한꺼번에 닫힘을 방지하기 위해 `ref`값을 오버레이 컴포넌트에 지정했습니다.
- 오버레이 컴포넌트에 지정했기 때문에, 외부 영역 클릭을 감지하는 것이 아닌 해당 영역을 클릭하면 팝업이 닫히도록 구현했습니다.

#### 3. 크롬 플러그인(Metamask) 연결하여 연동하기

> 설치 전

<img src="./public/metamask_1.JPG" width="500" height="200"/>

> 설치 후

<img src="./public/metamask_2.JPG" width="500" height="350"/>

- 지갑 열기 버튼을 클릭하면 Metaamsk에서 현재 선택된 계정을 가져옵니다.
- `window.ethereum`로 Metamask의 설치 여부를 확인해서 미설치 시 `alert` 창을 띄운 후 설치 페이지로 이동하도록 구현했습니다.

- 지갑 연결이 성공하면 팝업 창을 띄워 선택된 계정 주소와 그 계정의 `ETH` 보유 수량이 표시되도록 했습니다.
- `balance: Number(ethers.utils.formatEther(result[1]))`로 보유 잔고 값에 이더리움 단위로 표현되도록 했습니다.
- 네트워크 변경도 표시하기 위해 `chainId`값도 표시해 주었습니다.

- 계정 주소의 변경을 감지하기 위해 이더리움의 `accountsChanged` 리스너를 사용했습니다.
- 변경된 계정이 상태에 저장되어 있는 계정과 일치하지 않을 경우 변경된 계정으로 바꿔 주었습니다.

- 네트워크 변경 역시 같은 방법으로 값의 변경을 즉시 나타내 주었습니다.
- 하지만 모든 RPC 요청은 현재 연결된 체인 네트워크에 요청되어 현재 체인 ID를 추적하는 것이 중요합니다.
- 따라서 공식 `Metamask` 공식 문서에서는 `window.location.reload()`를 이용해서 페이지를 다시 로드하는 것을 권장하고있습니다.

- 지갑이 연결된 후 받은 데이터의 이더리움 메인넷의 네트워크 값인 `chainId`값이 1일 경우 이더리움 메인넷에 연결되었다는 `alert`을 띄워 주었습니다.
- `useEffect`를 사용해서 `chainId`값이 변경될 때마다 확인할 수 있도록 했습니다.
