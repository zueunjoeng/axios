import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [targetnum, setNumber] =useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/photos');       
        setUsers(response.data);        
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const uniqueAlbumIds = Array.from(new Set(users.map(item => item.albumId)));
  // uniqueAlbumIds 데이터 array
  // 클래스(붕어빵틀) 생성자 new 복제 (인스턴스 : 붕어빵 )
  // 메서드 소속 클래스  

  return (
    <div className="App">
      <h1>Users</h1>
      <div>
        {
          uniqueAlbumIds.map(albumId => (
            <button key={albumId} value={albumId} onClick={()=>{ setNumber(albumId); }}>
              Album {albumId}
            </button>
          ))
        }
      </div>
      {
        error && <p>Error: {error.message}</p>
      }
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
        <h2>전체개수 : {users.length}</h2>
        <ul style={{display: "flex", flexWrap: "wrap"}}>
          {users.filter(item => item.albumId === targetnum ).map(user => (
            <li key={user.id} style={{width: "33%", listStyle: "none", padding: "0"}}>
              <h2 style={{fontSize: "16px"}}>{user.title}</h2>
              <img src={user.thumbnailUrl} alt={user.title} />
            </li>
          ))}
        </ul>
        </div>
      )}
    </div>
  );
}

export default App;
