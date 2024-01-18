import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { changeUser, Plusage } from './../store/userSlice.js';
import { addCount } from './../store.js';

function Cart() {

    // Redux store 가져오기
    // Redux store에 있던 모든 state 남음
    let state = useSelector((state) => {return state})
    let cart = state.cart;
    let dispatch = useDispatch(); // store.js 로 요청 보내주는 함수

    // * 모든 state 중에 원하는 항목만 가져올 수 있음 ({return} 생략가능)
    // let state = useSelector((state) => state.user)
    console.log(cart);

    return (
        <div>
            {state.user.name} {state.user.age}의 장바구니
            <Button variant="success" onClick={()=>{dispatch(Plusage(100))}}>plus Age</Button>
            <Button variant="success" onClick={()=>{dispatch(changeUser())}}>Change user</Button>
            <Table>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cart.map(function(param, i){
                            return (
                                <tr key={i}>
                                    <td>{cart[i].id}</td>
                                    <td>{cart[i].name || cart[i].title}</td>
                                    <td>{cart[i].count || cart[i].content}</td>
                                    <td>
                                        <Button variant="secondary"
                                            onClick={()=>{
                                                dispatch(addCount(cart[i].id))
                                                // 버튼을 누르면 해당 상품의 id를 보내야함
                                                // 상품 순서가 이상하게 바뀌어도 원활한 동작 위함
                                            }}>+</Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table> 
        </div>
    )
}

export default Cart;