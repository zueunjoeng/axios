import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://apis.data.go.kr/5050000/eatHtpService/getEatHtp?serviceKey=7Q32au76h6ev6rGWR%2BBciS9A5qLExMfeljnKCYCRtr5alemU%2BE8p6KKDrGtltMhYdee4AsrZNZunEBLi2havng%3D%3D&pageNo=1&numOfRows=10');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }        
        const result = await response.json();  

        console.log(response); // 1차확인
        console.log(
            `fetch 전송값 : ${response}
             타입 : ${typeof response}
             body컨텐츠 : ${response.body}
             json실행결과문자화 : ${JSON.stringify(result)}`
            )

        // JSON.stringify 함수는 자바스크립트 객체를 JSON 문자열로 변환 
        // -> 데이터를 받아서 다른 플랫폼에 넘겨줄때 사용
        // JSON.stringify: 자바스크립트 객체를 JSON 문자열로 변환.
        // JSON.parse: JSON 문자열을 자바스크립트 객체로 변환.

        console.log(
            "json실행결과 :"+typeof result, // object
            "그 값은? : "+ result, // 복잡한 구조
            "배열이야?"+ Array.isArray(result),
            // 비동기로 받은 데이터 배열인지 확인, 왜? 바로 쓸 수 있나없나 확인하려고
            "key보여줘 : " + Object.keys(result.response.body)
            // 배열아니니깐 이것은 object, 그럼 키 보여달라고 한다.
            // 주소창에서 확인했던 items안의 item이 있는지 확인해야한다.
        )
        // 내부의 키 찾아서 접근하기 (아주 중요!!!!)
        setData(result.response.body.items.item);
        // data 상태변수에 데이터안착시킴
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false); // 비동기데이터 데이터 저장중일때
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const imgstyle = {
    "width" : "300px"
  }

  return (
    <div className="App">
      <h1>API Data</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <img src={`http://${item.CON_IMGFILENAME}`} style={imgstyle}  ></img></li>
        ))}
      </ul>
    </div>
  );
}

export default App;
