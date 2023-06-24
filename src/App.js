import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';

import surf from "./images/background.png";
import logo from './images/LPVS_logo.png';
import MainPage from './MainPage';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';


function Login(props) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  
  return <>
    <div 
  className="HomeImageContainer" 
  style={{backgroundImage: `url(${surf})`, backgroundSize: 'cover'}}
/>

    <h2 style={{ color: 'white' }}>로그인</h2>

    <div className="form">
      <img src={logo} className="App-logo" alt="logo" />
      <p><input className="login" type="text" name="username" placeholder="아이디" onChange={event => {
        setId(event.target.value);
      }} /></p>
      <p><input className="login" type="password" name="pwd" placeholder="비밀번호" onChange={event => {
        setPassword(event.target.value);
      }} /></p>

      <p><input className="btn" type="submit" value="로그인" onClick={() => {
        const userData = {
          userId: id,
          userPassword: password,
        };
        fetch("http://localhost:3001/login", { //auth 주소에서 받을 예정
          method: "post", // method :통신방법
          headers: {      // headers: API 응답에 대한 정보를 담음
            "content-type": "application/json",
          },
          body: JSON.stringify(userData), //userData라는 객체를 보냄
        })
          .then((res) => res.json())
          .then((json) => {            
            if(json.isLogin==="True"){
              props.setMode("WELCOME");
            }
            else {
              alert(json.isLogin)
            }
          });
      }} /></p>
    </div>

    <p>
      <span style={{ color: 'white' }}>계정이 없으신가요?</span>{" "}
      <button className="btn-signup" onClick={() => {
      props.setMode("SIGNIN");
      }}>
        회원가입
      </button>
      </p>
  </> 
}


function Signin(props) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  return <>
    <div 
        className="HomeImageContainer" 
        style={{backgroundImage: `url(${surf})`, backgroundSize: 'cover'}}
      />
     <h2 style={{ color: 'white' }}>회원가입</h2>

    <div className="form">
      <p><input className="login" type="text" placeholder="아이디" onChange={event => {
        setId(event.target.value);
      }} /></p>
      <p><input className="login" type="password" placeholder="비밀번호" onChange={event => {
        setPassword(event.target.value);
      }} /></p>
      <p><input className="login" type="password" placeholder="비밀번호 확인" onChange={event => {
        setPassword2(event.target.value);
      }} /></p>

      <p><input className="btn" type="submit" value="회원가입" onClick={() => {
        const userData = {
          userId: id,
          userPassword: password,
          userPassword2: password2,
        };
        fetch("http://localhost:3001/signin", { //signin 주소에서 받을 예정
          method: "post", // method :통신방법
          headers: {      // headers: API 응답에 대한 정보를 담음
            "content-type": "application/json",
          },
          body: JSON.stringify(userData), //userData라는 객체를 보냄
        })
          .then((res) => res.json())
          .then((json) => {
            if(json.isSuccess==="True"){
              alert('회원가입이 완료되었습니다!')
              props.setMode("LOGIN");
            }
            else{
              alert(json.isSuccess)
            }
          });
      }} /></p>
    </div>

    <p>
      로그인화면으로 돌아가기{" "}
      <button className="btn-signup" onClick={() => {
      props.setMode("LOGIN");
       }}>
        로그인
      </button>
    </p>
  </> 
}

function App() {
  const [mode, setMode] = useState("");
  const navigate = useNavigate();  // 여기서 useNavigate 훅을 사용합니다.
  

  useEffect(() => {
    fetch("http://localhost:3001/authcheck")
      .then((res) => res.json())
      .then((json) => {        
        if (json.isLogin === "True") {
          setMode("WELCOME");
          navigate('/');  // 여기서 navigate 함수를 사용해 메인 페이지로 이동합니다.
        }
        else {
          setMode("LOGIN");
        }
      });
  }, []); 

  let content = null;  

  if(mode==="LOGIN"){
    content = <Login setMode={setMode}></Login> 
  }
  else if (mode === 'SIGNIN') {
    content = <Signin setMode={setMode}></Signin> 
  }

  return (
    <Router>
      <Route path="/" exact component={MainPage} />
      <div className="background">
        {content}
      </div>
    </Router>
  );
}

export default App;