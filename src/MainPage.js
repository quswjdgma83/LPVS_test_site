import React from 'react';

function Dashboard() {
  // 대시보드 내부에서 보여줄 데이터를 불러오거나 관리하려면 여기에 상태를 추가하면 됩니다.

  return (
    <div>
      <h2>대시보드</h2>
      <ul>
        <li>대시보드 아이템 1</li>
        <li>대시보드 아이템 2</li>
        <li>대시보드 아이템 3</li>
      </ul>
    </div>
  );
}

function MainPage() {
  return (
    <div>
      <h1>메인 페이지에 오신 것을 환영합니다</h1>
      <p>로그인에 성공하셨습니다.</p>
      <Dashboard />
      <a href="/logout">로그아웃</a>
    </div>
  );
}

export default MainPage;