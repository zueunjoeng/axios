최적화
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [filteredPhotos, setFilteredPhotos] = useState([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/photos');
        setPhotos(response.data);
      } catch (error) {
        console.error('데이터 가져오기 오류:', error);
      }
    };
    fetchPhotos();
  }, []);

  const handleAlbumClick = (albumId) => {
    setSelectedAlbumId(albumId);
    const filtered = photos.filter(photo => photo.albumId === albumId);
    setFilteredPhotos(filtered);
  };

  // 앨범 ID를 추출하고 중복을 제거하여 버튼을 생성합니다
  const uniqueAlbumIds = useMemo(() => {
    const albumIds = photos.map(photo => photo.albumId);
    return [...new Set(albumIds)];
  }, [photos]);

  return (
    <div>
      <div id="buttons">
        {uniqueAlbumIds.map(albumId => (
          <button
            key={albumId}
            className="button"
            onClick={() => handleAlbumClick(albumId)}
          >
            {albumId}
          </button>
        ))}
      </div>
      <div id="photos">
        {selectedAlbumId && <h2>앨범 {selectedAlbumId}의 사진</h2>}
        {filteredPhotos.map(photo => (
          <div key={photo.id}>
            <img src={photo.thumbnailUrl} alt={photo.title} />
            <p>{photo.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
