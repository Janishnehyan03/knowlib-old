import React, { useEffect, useState } from "react";
import Axios from "../../Axios";

const FormComponent = ({ apiUrl }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      image,
      description,
      url,
      category,
    };

    try {
      // Send a POST request to your Express.js backend using Axios
      const response = await Axios.post(apiUrl, data);
      console.log(response.data);

      // Reset form fields
      setName("");
      setImage("");
      setDescription("");
      setUrl("");

      // Display success message
      setSuccessMessage("Post completed successfully.");
      setErrorMessage(""); // Clear any previous error message
    } catch (error) {
      console.error(error.response);
      // Display error message
      setErrorMessage("An error occurred. Please try again.");
      setSuccessMessage(""); // Clear any previous success message
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the corresponding state variable based on the input field's name
    switch (name) {
      case "name":
        setName(value);
        break;
      case "image":
        setImage(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "url":
        setUrl(value);
      case "categogry":
        setCategory(value);
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Make a GET request to the backend API endpoint to fetch categories
        const response = await Axios.get("/category");
        setCategories(response.data); // Set the fetched categories to the state
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);
  return (
    <div className="">
      <h1 className="form-header-addproduct">Add New Website</h1>
      <form className="form-container" onSubmit={handleSubmit}>
        <label>
          Website Link:
          <input
            type="url"
            name="url"
            value={url}
            onChange={handleInputChange}
            placeholder="Enter URL"
          />
        </label>
        <br />
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleInputChange}
            placeholder="Enter name"
          />
        </label>
        <br />

        <label>
          Description:
          <input
            type="text"
            name="description"
            value={description}
            onChange={handleInputChange}
            placeholder="Enter description"
          />
        </label>
        <div className="mb-4">
          <label className="block font-bold text-gray-700">Category:</label>
          <select
            className="border rounded-lg py-2 px-3 w-full focus:outline-none focus:ring focus:border-blue-300"
            name="category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option hidden>select category</option>
            {categories.map((item, key) => (
              <option key={key} value={item._id}>
                {item.name}
              </option>
            ))}
            {/* Add more options as needed */}
          </select>
        </div>
        <br />
        <button type="submit">Submit</button>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default FormComponent;
