// src/App.js
import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

function App3() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let { data: menu, error } = await supabase
        //슈퍼베이스가 제공하는 변수라 변경이 안된다.(data를 변경하면 안돼) data: navidb를 
          .from('menu') 
        // 'navidb'= 테이블명
          .select('*');
        //가져오는 방식, *는 'navidb'의 테이블을 모두 가져와라

        if (error) throw error; //에러가 나면 throw가 등장. throw가 나오면 하위자바스크립트는 실행이 되지않는다.
        setData(menu);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Data from navidb</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            {item.gnbnm} - {item.gnblink} - {item.prnum} - {item.cateno}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App3;
