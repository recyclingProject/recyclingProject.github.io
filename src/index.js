import React from 'react';
import ReactDOM from 'react-dom/client';
//import { useRef } from 'react';
import { useState } from 'react';

import './index.css';

const BookList = () => {
  return (
    <section className="booklist">
      <ImageUpload />
      <Book />
      <MaterialDetail />
    </section>
  );
};

const Book = () => {
  return (
    <article className="book">
      <Image />
      <Title />
      <Author />
    </article>
  );
};

const MaterialDetail = () => {
  return (
    <article className="book">
      <Image />
      <Title />
      <Author />
    </article>
  );
};

const Image = () => (
  <img
    src="https://www.innovatelandfillsolution.org/wp-content/uploads/2023/11/KakaoTalk_Photo_2024-04-16-18-40-23-002-1024x1024.png"
    alt="Innovate LandFill Solutions"
  />
);
const Title = () => <h2>Title of the book</h2>;
const Author = () => {
  return <h4>Author</h4>;
};

const ImageUpload = () => {
  const [profileImage, setProfileImage] = useState();
  const [imagePreview, setImagePreview] = useState();
  const [uploadData, setUploadData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
    console.log(e.target.files);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const uploadImage = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let imageURL;
      if (
        profileImage &&
        (profileImage.type === 'image/png' ||
          profileImage.type === 'image/jpg' ||
          profileImage.type === 'image/jpeg')
      ) {
        const image = new FormData();
        image.append('file', profileImage);
        image.append('cloud_name', 'dswe8az6y');
        image.append('upload_preset', 'bjloxx6y');

        const response = await fetch(
          'https://api.cloudinary.com/v1_1/dswe8az6y/image/upload',
          {
            method: 'post',
            body: image,
          }
        );
        const imgData = await response.json();
        imageURL = imgData.url.toString();
        setImagePreview(null);
      }
      alert(imageURL);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <h2>Add Image:</h2>
      {/* <input type="file" onChange={handleImageChange} /> */}
      <div>
        <form onSubmit={uploadImage}>
          <p>
            <label> Photo: </label>
            <input
              type="file"
              accept="image/png, image/jpeg"
              name="image"
              onChange={handleImageChange}
            />
          </p>
          <p>
            {isLoading ? (
              'Uploading...'
            ) : (
              <button type="submit"> Upload image</button>
            )}
          </p>
        </form>
      </div>
      <div>
        {imagePreview && (
          <img src={imagePreview && imagePreview} alt="profileImg" />
        )}
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<BookList />);
