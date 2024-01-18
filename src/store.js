import { configureStore, createSlice } from '@reduxjs/toolkit';
import user from './store/userSlice.js';

// 1. state 생성함수
/* userSlice.js 로 빼냄
let user = createSlice({
    name: 'user',
    // initialState: 'Yu',
    initialState: { name: 'Yu', age: 20}, //object
    reducers: { // state 변경
        changeUser(state) { //파라미터: 기존 state
            // return 'Jeong'
            state.name = 'Lee';
            //* state가 array/object의 경우 직접 수정해도 state 변경됨
            // 그래서 일부러 object 안에 담기도 함
        },
        Plusage(state, action) {
            // 함수 파라미터 문법 사용 -> Plusage(100) 가능
            state.age += action.payload;
        }
    }
})
*/
let cart = createSlice({
    name: 'cart',
    initialState: [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
    ],
    reducers: {
        addCount(state, action) {
            // console.log(action.payload);
            // action.payload : 함수 파라미터로 받아온 것
            let result = state.find(element => element.id == action.payload);
            result.count += 1;
        },
        addCart(state, action) {
            // console.log(action.payload);
            // action.payload : ~~/detail/1의 해당 object data
            return state.concat(action.payload);
        }
    }
})

export default configureStore({
  reducer: {
    // 2. 등록
    user : user.reducer,
    cart : cart.reducer
  }
})
// export let { changeUser, Plusage } = user.actions;
// { state 변경 함수1, 함수2, 함수3 } = state명.actions

export let { addCount, addCart } = cart.actions;

// * Redux 세팅
// : props 없이도 컴포넌트간에 편리하게 state 공유 가능
// 1. store.js 구성
// 2. index.js 에서 store import, <Provider store={store}> 작성
// => App 과 App의 자식들은 store.js에 있는 state 전부 사용 가능

// * Reduxe의 state 변경
// 1. state 수정해주는 함수 생성
// 2. export
// 3. dispatch(state변경함수())