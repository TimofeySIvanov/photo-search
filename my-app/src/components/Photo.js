// Importing modules
import React from 'react';
import NotFound from './NotFound';

//Creating Photo component that will display photos
const Photo = props => {
  const otvet = props.data;
  let photos;
  if (otvet.length > 0) {
    photos = otvet.map(photo =>
        <li key={photo.id}>
        <img src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_m.jpg`} alt={photo.title}/>
         </li>);
  } else {
    photos = <NotFound />
  }
  return (
    <div className="photo-container">
      <h2>{props.searchForm}</h2>
      <ul>
        {photos}
      </ul>
    </div>

  );
}
export default Photo;