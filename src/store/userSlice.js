import { createSlice } from '@reduxjs/toolkit';

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

export let { changeUser, Plusage } = user.actions;
export default user;