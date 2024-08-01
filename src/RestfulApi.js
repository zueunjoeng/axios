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
        console.log(response)
        console.log(
            `fetch 전송값 : ${response}
             타입 : ${typeof response}
             body컨텐츠 : ${response.body}
             json실행결과 : ${JSON.stringify(result, null, 2)}`
            )
            //JSON.stringify(json포멧) vs JSON.parse(문자열)
            console.log("json실행결과"+typeof result, "그 값은?"+result)
        //setData(result);
      } catch (error) {
        //setError(error);
      } finally {
        //setLoading(false);
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

  return (
    <div className="App">
      <h1>API Data</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.someField}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
