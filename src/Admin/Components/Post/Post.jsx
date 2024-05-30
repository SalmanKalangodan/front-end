import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProducts } from '../../../Redux/ApiSlice/Tunk/Tunk';

function Post() {
  const [title, setName] = useState("");
  const [price, setPrice] = useState(""); // Initialize with an empty string
  const [image, setUrl] = useState(""); // Initialize with an empty string
  const [description, setDetails] = useState("");
  const [category, setCategory] = useState("");
 
  const dispatch = useDispatch();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setUrl(file ? URL.createObjectURL(file) : "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProducts({ title, price, image, description, category })).then(() => {
      setName('');
      setPrice('');
      setUrl('');
      setDetails('');
      setCategory('');
    });
  };

  return (
    <div className='justify-center'>
      <div className="shrink-0 w-full max-w-l shadow-2xl bg-gray-200">
        <form className="card-body" onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="productName" className="label">
              <span className="label-text">Product Name</span>
            </label>
            <input type="text" id="productName" placeholder="Product Name" className="input input-bordered bg-white" required value={title} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-control">
            <label htmlFor="price" className="label">
              <span className="label-text">Price</span>
            </label>
            <input type="number" id="price" placeholder="Price" className="input input-bordered bg-white" required value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
          <div className="form-control">
            <label htmlFor="image" className="label">
              <span className="label-text">Image</span>
            </label>
            <div className="flex items-center mt-2">
              <label htmlFor="fileUpload" className="w-full flex items-center justify-center px-4 py-2 bg-white text-gray-600 rounded-md border border-gray-300 cursor-pointer hover:bg-gray-100">
                <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Upload Image
                <input type="file" id="fileUpload" className="hidden" onChange={handleFileUpload} />
              </label>
              {image && <img src={image} alt="Product Preview" className="ml-4 h-10" />}
            </div>
          </div>
          <div className="form-control">
            <label htmlFor="details" className="label">
              <span className="label-text">Details</span>
            </label>
            <textarea id="details" placeholder="Details" className="textarea textarea-bordered bg-white" required value={description} onChange={(e) => setDetails(e.target.value)}></textarea>
          </div>
          <div className="form-control">
            <label htmlFor="category" className="label">
              <span className="label-text">Category</span>
            </label>
            <select id="category" className="select select-bordered bg-white" required value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Select Category</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kids">Kids</option>
            </select>
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary bg-blue-500 hover:bg-blue-600">Post</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Post;
