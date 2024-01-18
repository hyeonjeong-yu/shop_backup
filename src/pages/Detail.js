import styled from 'styled-components';
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Context1 } from './../App.js';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { addCart } from './../store.js';

function Detail(props) {

    let dispatch = useDispatch();

    let {재고} = useContext(Context1); // 보관함 해체

    let [ alert, setAlert ] = useState(true);
    let [ count, setCount ] = useState(0);
    let [ input, setInput ] = useState('');
    let [ tab, setTab ] = useState(0);
    let { id } = useParams();
    let result = props.shoes.find(element => element.id == id);
    // * url 파라미터 문법
    // url 파라미터 정보를 가져옴 (ex: ~~/detail/0 에서의 :id값 0)
    // /:id자리에 입력한 값과 영구번호인 id가 같은 상품을 찾는다.


    useEffect(() => {
        // * useEffect hook
        // Detail 컴포넌트가 mount, update시 코드 실행해줌
        // 이 안에 있는 코드는 "html 렌더링 후"에 동작함!
        // 어려운 연산, 서버에서 데이터 가져오는 작업, 타이머 장착할 때 사용함
        let timer = setTimeout(() => {setAlert(false)}, 3000);
        if(isNaN(input) == true) { console.log('숫자만 입력하세요') }

        // * 최근 본 상품 localStorage에 저장
        // 1. watched = 꺼낸 거를 배열화
        // 2. 배열에 id를 push
        // 3. 중복된 값을 Set으로 없애준 뒤 저장 
        // 4. 수정된 배열을 다시 json화 해서 localStorage에 저장
        let watched = JSON.parse(localStorage.getItem('watched'));
        watched.push(id);
        let result = [...new Set(watched)];
        localStorage.setItem('watched', JSON.stringify(result));
        console.log(watched);
        
        return () => {
            // useEffect 동작 전에 실행됨 (clean up function)
            // 기존 코드(데이터 요청 등)를 제거하는 것을 이곳에 많이 적용함
            // 이 영역은 unmount시 1회 코드 실행됨
            // console.log(1)
            clearTimeout(timer);
        }
    }, [count, input])
    // []: useEffect 실행조건 넣는 곳 (함수 안쪽 영역은 mount시 1회 코드 실행됨)
    // [] 안의 변수가 달라질 때마다 useEffect 실행됨
    // []안의 변수가 없다면 => mount시에만 실행됨, update시에는 실행 X

    
    return (
        <div className="container">
            <div><input onChange={(e)=>{setInput(e.target.value)}} type="text" placeholder='숫자만 입력하시오'/></div>
            <div className="alert alert-warning">
                {
                    alert == true ? <div>3초 이내 사라지기</div> : null
                }
            </div>
            {count}
            <button onClick={() => { setCount(count+1)}}>Count</button>
            <div className="row">
            <div className="col-md-6">
                <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
            </div>
            <div className="col-md-6">
                <h4 className="pt-5">{result.title}</h4>
                <p>{result.content}</p>
                <p>{result.price}원</p>
                <button className="btn btn-danger"
                    onClick={()=>{
                        dispatch(addCart(result));
                    }}>주문하기
                </button> 
            </div>
            </div>

            {/* Tabs */}
            <Nav variant="tabs"  defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link eventKey="link0" onClick={()=>setTab(0)}>버튼0</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link eventKey="link1" onClick={()=>setTab(1)}>버튼1</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link eventKey="link2" onClick={()=>setTab(2)}>버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent tab={tab}/>
        </div> 
    )
}
// function TabContent(props) {
function TabContent({tab, shoes}) {
    // props 문법 없이 중괄호로 state 가져올 수 있음!!
    // function TabContent({state1이름, state2이름, state3이름 ...}) {

    // if (tab == 0) {
    //     return <div>내용0</div>
    // } else if (tab == 1) {
    //     return <div>내용1</div>
    // } else if (tab == 2) {
    //     return <div>내용2</div>
    // }

    // tab state가 변할 때 end class 추가
    let [fade, setFade] = useState('');
    let {재고} = useContext(Context1); // 보관함 해체

    useEffect(() => {
        let timer = setTimeout(()=>{setFade('end')}, 100);
        // react 18 + automatic batching 기능 때문에
        return () => {
            clearTimeout(timer);
            setFade(''); //cleanup
        }
    }, [tab])
    return (<div className={"start " + fade}>
            {[<div>{재고}</div>, <div>내용1</div>, <div>내용2</div>][tab]}
        </div>)
            {/* (<div className={`start ${fade}`}> */}
}

export default Detail;


// /detail/0 접속시,
// 0번째 상품을 보여주는 게 아니라
// 고유의 id값이 0인 상품을 보여주기


// 컴포넌트 여러개 중첩 방지
// props 없이 state 공유 [App -> Detail -> Tab]
// 1. Context API (많이 쓰지 않기 때문에 참고만)
    // 1-1. createContext(): state보관함 세팅
    // 1-2. <Context.Provider>로 원하는 컴포넌트 감싸기
    // 1-3. Context value 속성에 공유할 state 넣기
    // 1-4. state를 가지고 오고 싶은 파일에서 Context import 하기
    // => <Context> 안의 모든 컴포넌트는 state 사용 가능
// 2. Redux 라이브러리
// : props 없이 state를 공유할 수 있게 도와주는 라이브러리


