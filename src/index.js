import React from 'react';
import ReactDOM from 'react-dom/client';
import { useRef } from 'react';
import { useState } from 'react';
//import Resizer from 'react-image-file-resizer';

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
const Title = () => <h2>ILS- Under construction</h2>;
const Author = () => {
  return <h4>Project Manager</h4>;
};

// const resizeFile = (file) =>
//   new Promise((resolve) => {
//     Resizer.imageFileResizer(
//       file,
//       300,
//       300,
//       'JPEG',
//       100,
//       0,
//       (uri) => {
//         resolve(uri);
//       },
//       'base64'
//     );
//   });

const ImageUpload = () => {
  const [profileImage, setProfileImage] = useState();
  const [imagePreview, setImagePreview] = useState();
  // const [uploadData, setUploadData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const selectRef = useRef(null);
  const inputRef = useRef(null);

  const handleImageChange = (e) => {
    //const file = e.target.files[0];
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
      <h2>Upload Image of the material:</h2>

      <div>
        <form onSubmit={uploadImage}>
          <p>
            <label className="gap10"> Photo: </label>
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

          <label className="gap10">
            <p className="gap10">
              Manufacturer :
              <select ref={selectRef}>
                <option value="Nestle">Nestle</option>
                <option value="Cadbury">Cadbury</option>
                <option value="Lindt">Lindt</option>
                <option value="Hershey">Hershey</option>
                <option value="Sunfeast">Sunfeast</option>
                <option value="Other">Other</option>
              </select>
            </p>
          </label>

          <label className="gap10">
            <p>
              Product Name :
              <select ref={selectRef}>
                <option value="Nestle">Nestle</option>
                <option value="Coke">Fanta</option>
                <option value="Other">Other</option>
              </select>
            </p>
          </label>

          <label className="gap10">
            <p>
              Material Code :
              <select ref={selectRef}>
                <option value="Nestle">452</option>
                <option value="Coke">125</option>
                <option value="Other">457</option>
              </select>
            </p>
          </label>

          <label className="gap10">
            <p>
              Product Category :
              <select ref={selectRef}>
                <option value="Nestle">Chocolate</option>
                <option value="Coke">Clothing</option>
                <option value="Other">Other</option>
              </select>
            </p>
          </label>

          <label className="gap10">
            <p>
              Custom cleanup :
              <select ref={selectRef}>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Not Sure">Not Sure</option>
              </select>
            </p>
          </label>

          <label className="gap10">
            <p>
              Input details manually :
              <select ref={inputRef} type="text" />
            </p>
          </label>

          <div className="gap20"></div>
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
