import { createContext, useReducer } from 'react';
import { SET_BOARDLIST, SET_USER_INFO } from './action';

// context 초기화
const initialState = {
  userInfo: [],
  boardList: [],
};

// Context 객체 생성 => Provider, Consumer 속성이 있다.
const Context = createContext({});

// 각 액션에 동작하는 Reducer 구현
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      };
    case SET_BOARDLIST:
      return {
        ...state,
        boardList: action.payload,
      };
    default:
      return state;
  }
};

// 전체 컴포넌트를 감싸는 최상위 component
const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, StoreProvider };
