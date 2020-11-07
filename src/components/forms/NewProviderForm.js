import React from 'react';
import apiClient from "../../utils/apiService";

class NewProviderForm extends React.Component {

  // TASK 5: Add New Provider
  // Add Functionality to the form below
  // On submission it should make a POST request to 
  // the server to create a new provider.
  // Refer to the API documentation for details.
  constructor(props) {
    super(props);
    
    this.state = {
        name: this.props.name,
        description: this.props.description,
        rating: this.props.rating,
        address: this.props.address,
        type: this.props.type,
        state: this.props.state,
        active_status: 'pending',
        imageUrl: this.props.imageUrl ? this.props.imageUrl : "https://via.placeholder.com/1500x840",
    }
  }

  handleInputChange = (e) => { 
    if(e.target.name === 'file') {
      this.setState({ file: URL.createObjectURL(e.target.files[0])})
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  handleImageUpload = (image) => {
    return apiClient.post(apiClient.ENDPOINTS.imageUpload, image, {
      "Content-Type": "multipart/form-data",
    });
  }

  submitForm = async (e) => {
    const { imageUrl } = this.state;
    e.preventDefault();
    const { history } = this.props;
    let uploaded;
    try {
      uploaded = await this.handleImageUpload(imageUrl);
    } catch (err) {
      console.log(err.message)
    }
    const formData = {
      ...this.state
    }; 
    const response = await apiClient.post(apiClient.ENDPOINTS.providers, JSON.stringify(formData));
    if (!response.ok) {
      console.log('An error occured')
    } else {
      alert('New Provider Created');
      history.push('/');
    }
  }

  render() {
    return (
      <form className="form">
        <div className="form-group">
          <label htmlFor="name">Provider Name:</label>
          <input className="input__style_1" type="text" name="name" onChange={this.handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="address">Provider Address:</label>
          <input className="input__style_1" type="text" name="address" onChange={this.handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="address">Provider State:</label>
          <input className="input__style_1" type="text" name="state" onChange={this.handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Provider Rating:</label>
          <select className="select input__style_1" type="number" name="rating" onChange={this.handleInputChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="type">Provider type:</label>
          <select className="select input__style_1" type="text" name="type" onChange={this.handleInputChange}>
            <option value="hospital">Hospital</option>
            <option value="pharmacy">Pharmacy</option>
            <option value="clinic">Clinic</option>
          </select>
        </div>        
        <div className="form-group">
          <label htmlFor="image">Provider Image</label>
          <img className="img-responsive" src="https://via.placeholder.com/1500x840" alt="new provider"/>
          <input type="file" name="file" onChange={this.handleInputChange} />
        </div>
        <div className="form-group button-row">
          <button
            type="submit"
            className="btn btn-primary no-margin"
            onClick={this.submitForm}
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
}

export default NewProviderForm;
