import React from 'react';
import './App.css';

const initialFormData = Object.freeze({
  firstname: '',
  lastname: '',
  phonenr: '',
  email: '',
  country: '',
  address: '',
});
const API = 'http://localhost:8080/address';

const Form = (refresh) => {
  const [formData, updateFormData] = React.useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,

      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    console.log(refresh);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    };
    fetch(API, requestOptions)
      .then((response) => response.json())
      .then((data) => refresh.refresh());
  };

  return (
      
    <div className='form'>
      <label>
        Firstname:  
        <input type="text" name="firstname" onChange={handleChange} />
      </label>
      <br />
      <label>
        Lastname: 
        <input type="text" name="lastname" onChange={handleChange} />
      </label>
      <br />
      <label>
        Phonenr:
        <input type="text" name="phonenr" onChange={handleChange} />
      </label>
      <br />
      <label>
        Email:
        <input type="text" name="email" onChange={handleChange} />
      </label>
      <br />
      <label>
        Country:
        <input type="text" name="country" onChange={handleChange} />
      </label>
      <br />
      <label>
        Address:
        <input type="text" name="address" onChange={handleChange} />
      </label>
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Form;
