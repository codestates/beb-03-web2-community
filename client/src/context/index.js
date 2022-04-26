import { createContext, useReducer } from 'react';
import {
  SET_BOARDLIST,
  SET_USER_INFO,
  CHANGE_LOGIN_STATUS,
  SET_PAGINATION,
} from './action';

// context 초기화
const initialState = {
  userInfo: {},
  boardList: { page: 1, list: [] },
  isLogin: false,
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
    case CHANGE_LOGIN_STATUS:
      return {
        ...state,
        isLogin: action.payload,
      };
    case SET_BOARDLIST:
      return {
        ...state,
        boardList: action.payload,
      };
    case SET_PAGINATION: {
      let addList = state.boardList.list.concat(action.payload.list);
      console.log('addList', addList);
      return {
        ...state,
        boardList: { page: action.payload.page, list: addList },
      };
    }
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
