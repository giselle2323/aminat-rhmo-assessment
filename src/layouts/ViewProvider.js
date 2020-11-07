import React, { useState, useEffect} from 'react';
import apiClient from "../utils/apiService";
import { useParams } from "react-router-dom";
import NewProviderForm  from '../components/forms/NewProviderForm';

const ViewProvider = () => {
  const [provider, setProvider] = useState({});
  const [editing, setEditing] = useState(false);
  const { providerId } = useParams();

  useEffect(() => {
    apiClient
      .get(`${apiClient.ENDPOINTS.providers}/${providerId}`)
      .then((data) => {
        setProvider(data);
      });
  }, [providerId]);

 

  const providerDetails = (
    <div>
      <h2>Provider Details</h2>
      <div className="provider-details"></div>
      {provider && (
        <React.Fragment>
          <div>Provider Name: {provider.name}</div>
          <div>Provider Address: {provider.address}</div>
          <div>Provider State: {provider.state && provider.state.name}</div>
          <div>Provider Rating: {provider.rating}</div>
          <div>
            Provider Type:{" "}
            {provider.provider_type && provider.provider_type.name}
          </div>
          <div>
            Provider Image:{" "}
            <img
              src={!provider.Url && "https://via.placeholder.com/1500x840"}
              alt={provider}
              width="200"
            />
          </div>
        </React.Fragment>
      )}
    </div>
  );

  return (
    // TASK 6:
    // Render Single Provider View Here
    // Feel free to using existing styles,
    // or add new ones if you want to :)
    //
    // For Bonus points, you can also add functionality to edit the provider
    // Reusing the NewProviderForm component for this will make it a whole lot easier :D
    <div className="container">
      {/* <NavBar /> */}
      <h1>
        Provider Page{" "}
        <span>
          <i className="fa fa-edit"></i>
        </span>
      </h1>
      {editing ? <NewProviderForm /> : providerDetails}
      <button onClick={() => setEditing(false)}>View</button>{" "}
      <button onClick={() => setEditing(true)}>Edit</button>
    </div>
  );
};

export default ViewProvider;