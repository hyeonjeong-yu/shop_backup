import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useEffect, useState } from "react";
import { Button, Navbar, Container, Nav, Row, Col, Toast } from 'react-bootstrap';
// import bg from './images/bg.png'
// import 작명 from '이미지경로';
// * html 파일에선 import 부터 하고 필요한 곳에서 사용해야 함

import Cart from './pages/Cart.js';
import {a, data} from './data.js';
// * export, import (import 경로는 ./ 로 시작)
import Detail from './pages/Detail';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import { createContext } from 'react';

export let Context1 = createContext();

function App() {

  let [shoes, setShoes] = useState(data);
  let [재고] = useState([10, 11, 12]);
  let [click, setClick] = useState(0);
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  let [aaa, bbb] = useState(JSON.parse(localStorage.getItem('watched')));

  let obj = {name: 'Yu'};
  localStorage.setItem('data', JSON.stringify(obj));
  // object/array 자료 => JSON 변환하면, localstorage에 저장 가능(원래 문자만 저장가능)
  let 꺼낸거 = localStorage.getItem('data');
  // console.log(JSON.parse(꺼낸거));
  // 뽑을 때도 JSON => object자료로 변환해야 함
  // console.log(JSON.parse(꺼낸거).name);
  // object 자료로 변환해야 .key값 문법 사용 가능 (JSON 형태로는 안됨)

  // * 최근 본 상품 localStorage에 저장
  // 1. 첫 접속시 watched가 array 자료로 저장되어 있어야함
  // 2. 새로고침시 localStorage에 있던 항목이 전부 [] 비워지므로,
  //    localStorage에 저장된 게 없을 때만 [] 비우기
  useEffect(() => {
    let watched = [];
    let savedWatch = localStorage.getItem('watched');
    if (savedWatch == null) {
      localStorage.setItem('watched', JSON.stringify(watched));
    }

  })

  return (
    <div className="App">
      {/* {a} */}
      {/* <Button variant="primary">Primary</Button> */}
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
            {/* 페이지 이동 버튼 - Link 는 a 태그와 비슷 */}
            <Nav.Link onClick={()=> { navigate('/detail') }}>Detail</Nav.Link>
            <Nav.Link onClick={()=> { navigate('/about') }}>About</Nav.Link>
            <Nav.Link onClick={()=> { navigate('/cart') }}>Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={
          // 메인페이지일 때만 element 보여줌
          <>
          {/* <div className="main-bg" style={{backgroundImage:'url('+bg+')'}}> */}
          <div className="main-bg">
            {
              aaa.map((param, i) => {
                return (
                  <Recentwatch key={i} aaa={aaa[i]} shoes={shoes}/>
                )
              })
            }
          </div>
          <Container>
            <Row>
              {
                // shoes.map(function(param, i) {
                shoes.map((param, i) => {
                  return (
                    <Product key={i} shoes={shoes[i]} id={i+1} navigate={navigate}/>
                    // <Col>
                    //   <img src={process.env.PUBLIC_URL + "/shoes" + i+1 + ".jpg"} width="80%"/>
                    //   {/* public 폴더 안의 img 사용시 경로주의 */}
                    //   <h4>{shoes[i].title}</h4>
                    //   <p>{shoes[i].price}</p>
                    // </Col>
                  )
                })
              }
            </Row>
          </Container>
          { loading == true ? <Loading/> : null }
          <button onClick={() => {
            setLoading(true);
            setClick(click = click +1);
            if (click == 1) {
              axios.get('https://codingapple1.github.io/shop/data2.json')
              .then((result) => {
                // 성공
                // console.log(result);
                console.log(result.data);
                let copy = [...shoes, ...result.data];
                setShoes(copy);
                // setShoes(copy.concat(result.data));
                setLoading(false);

              })
              .catch(() => {
                // 실패
                console.log('통신 실패')
                setLoading(false);
              })
            } else if (click == 2) {
              axios.get('https://codingapple1.github.io/shop/data3.json')
              .then((result) => {
                let copy = [...shoes, ...result.data];
                setShoes(copy);
                setLoading(true);
              })
              .catch(() => {
                // 실패
                console.log('통신 실패')
                setLoading(false);
              })
            } else {
              alert("더이상 상품이 존재하지 않습니다.");
              setLoading(false);
            }
            // * POST 요청방식
            // axios.post('/url', {name: 'kim'})
            
            // * 동시에 AJAX 요청 여러개 날리려면
            // Promise.all([ axios.get('/url1'), axios.get('/url2')])
            // .then(() => {
                // 둘다 성공시 코드 실행
            // })

          }}>버튼</button>
          </>
        }
        />
        {/* <Route path="/detail" element={<div>상세페이지</div>}/> */}
        <Route path="/detail/:id" element={<Context1.Provider value={{재고}}><Detail shoes={shoes}/></Context1.Provider>}/>
        {/* url 파라미터 만들 때 ~/detail/:id/:아무거나 여러개 가능 */}
        {/* :url파라미터 */}
        <Route path="/about" element={<About/>}>
          <Route path="member" element={<div>멤버 리스트</div>}/>
          {/* nested route 접속시엔 (~~/about/member 접속시) element 2개나 보임!  */}
          <Route path="location" element={<div>위치 정보</div>}/>
        </Route>

        <Route path="/cart" element={ <Cart/> }>
        </Route>
        
        <Route path="*" element={<div>404 ERROR</div>} />
        {/* 있는 라우더 외에 모든 페이지 접속시 에러페이지 출력 */}
      </Routes>
      
    </div>
  );
}

function Product(props) {
  return (
    <Col>
      <img src={process.env.PUBLIC_URL + "/shoes" + props.id +".jpg"} width="80%"/>
      {/* public 폴더 안의 img 사용시 경로주의 */}
      <h4 onClick={()=> { props.navigate('/detail/'+(props.id-1)) }}>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </Col>
  )
}
function About() {
  return (
    <div>
      <h4>정보 페이지</h4>
      <Outlet></Outlet>
      {/* Outlet : nested route를 보여줄 자리 */}
    </div>
  )
}
function Loading() {
  return (
    <div>Loading...</div>
  )
}
function Recentwatch(props) {

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      style={{
        position: 'relative',
        minHeight: '100px',
      }}
    >
      <Toast
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
        }}
      >
        <Toast.Header>
          <strong className="mr-auto">{props.shoes[props.aaa].title}</strong>
          {/* <small>just now</small> */}
        </Toast.Header>
        <Toast.Body>{props.shoes[props.aaa].price}</Toast.Body>
      </Toast>
    </div>
  )
}

export default App;


// * 페이지 나누는 법
// 리액트는 싱글 페이지 앱이므로 index.html만 사용한다
// 1. 컴포넌트 생성 후 상세페이지 내용 채움
// 2. /~~ 접속하면 해당 컴포넌트 보여줌
