import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // API 호출 함수
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        //비동기 함수 > async가 무조건 있어야한다. 외부에서 값이 올때까지 랜더링을 기다리란 뜻** 빠지면 에러 계속 난다.
        //await가 필수로 있어야한다. 원래 자바스크립트가 가진 친구.  
        //외부데이터 get 가져온다.  내부데이터 post 가져온다. 
        //외부데이터 다 올때까지 대기 전부 저장 완료 후 실행
        setUsers(response.data); //랜더링 함수 users에 저장되고 있다
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchUsers();
    // 함수가 비동기라 콜백함수로 fetchUsers():가 등장한다.
    //비동기 함수 실행
  }, []); //반드시 1회 실행

  //if (loading) return <p>Loading...</p>;
  //if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="App">
      <h1>Users</h1> 
      {
        error && <p>Error: {error.message}</p> 
        //에러일 때만 나간다
      } 
      {/* 삼항식 */}
      {loading ? <p>Loading...</p> : 
        <ul>
          {users.map(user => (
            <li key={user.id}>
              <p>이름: {user.name}</p>
              <p>이메일: {user.email}</p>
              <p>주소: {`${user.address["street"]} ${user.address["suite"]} ${user.address["city"]}`}</p> 
              {/* object인 address를 가져오는 방법 */}
            </li>
          ))}
        </ul> 
      } 
       
    </div>
  );
}

export default App;
