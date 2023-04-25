# 계산기 v2.0

배포 링크 : [https://sangyoon-calculator-vanilla.vercel.app/](https://sangyoon-calculator-vanilla.vercel.app/)

<img src="docs/demo.gif" />

(cypress로 앱을 테스팅하고 있는 모습)

- [과거에 진행했던 계산기 앱](https://github.com/ryong9rrr/calculator-v1.0)을 리팩터링 했습니다.

- **웹팩**을 사용하여 빌드했습니다.

- **바닐라 타입스크립트**로 직접 구현한 컴포넌트 기반의 UI 프레임워크인 `sangyoon-ui`를 사용해서 구현했습니다.

  > `sangyoon-ui`란? sangyoon-ui는 제가 직접 바닐라 타입스크립트만으로 구현한 UI 프레임워크입니다. sangyoon-ui는 컴포넌트 기반으로 UI를 그리고, 라우터와 전역 상태 스토어 기능을 제공합니다. npm에 배포되었고 https://github.com/ryong9rrr/sangyoon-ui 에서 확인하실 수 있습니다.

- **수식 계산을 비지니스 로직**으로 보고, jest를 이용해서 테스트했습니다.

- **사용자 입장의 테스트**를 위해 cypress로 E2E 테스트를 진행했습니다.

---

## 수식 계산 알고리즘 구현 및 단위 테스트

복잡한 수식 연산 알고리즘을 테스트하며 직접 구현했습니다. **모듈 간 의존성을 낮추기 위해** 수식 연산을 수행하는 모듈인 `Calculator`를 구현했고 앱은 `Calculator`가 제공하는 `calculate()` 함수를 사용하기만 하면 됩니다.

`calculate()`는 **문자열(로된 수식)을 받아서 계산을 진행합니다.** 인터페이스는 다음과 같습니다.

```ts
calculate(exp: string): number {
  this.validate(exp)
  return return calculateForPostfix(postfix(sliceExpression(exp)))
}
```

`validate()`는 올바른 수식인지 아닌지(괄호가 올바르지 않은 경우, 소수점이 올바르지 않은 경우)를 검증합니다.

결과를 계산하는 부분은 **한 가지 일만 하는 함수들을 통해** 몇 단계를 걸쳐 이루어집니다.

1. `sliceExpression()` : 사용자가 입력한 문자열로 된 수식을 **숫자와 연산기호**로 나눕니다. 숫자를 구분할 때는 소수인 경우(`.`)도 고려합니다.

2. `postfix()` 1에서 반환된 결과를 후위연산식으로 변환합니다. 만약 변환할 수 없다면 에러를 반환합니다.

3. `calculateForPostfix()` 2에서 반환된 결과를 계산합니다. 계산될 수 없는 경우라면 에러를 반환합니다.

구현과 함께 각 함수에 대한 **단위 테스트**를 진행했습니다. 앱은 [https://sangyoon-calculator-vanilla.vercel.app/](https://sangyoon-calculator-vanilla.vercel.app/)에서 체험하실 수 있습니다.

---

## 실행 방법

이 저장소를 클론하고 의존성 모듈을 설치해주세요.

```
1. git clone ...

2. yarn install
```

- 계산기 알고리즘(비지니스 로직) 테스트 : `yarn test`

- 개발 환경 구동(웹팩) : `yarn dev`

- 프로덕션용 빌드 : `yarn build`

### cypress 실행방법

1. 터미널을 열어서 `yarn dev` 명령어로 개발 환경을 구동해주세요.

2. 다른 터미널을 연 뒤, `yarn test:cypress` 명령어로 cypress E2E 테스트를 실행할 수 있어요.
