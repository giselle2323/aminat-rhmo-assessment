import React from 'react';
import NavBar from '../components/common/NavBar';
import Gallery from '../components/ProviderGallery';
import List  from '../components/ProviderList';
import Grid from '../components/ProviderGrid';
import NewProviderForm from '../components/forms/NewProviderForm';
import ApiService from '../utils/apiService';
import LoadingScreen from '../components/common/LoadingScreen';

import { pathGet } from '../utils/utils'

class ExplorePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: false,
      filteredProviders: [],
      currView: 'gallery',
      imageFallBackSrc: "https://via.placeholder.com/1500x840"
    };
  }

  componentDidMount() {
    this.setLoading(true);
    ApiService.get(ApiService.ENDPOINTS.providers)
      .then((data) => {
        this.setState({
          isLoading: false,
          data: data
        });
      });
  }

  setLoading = (isLoading) => {
    this.setState({
      isLoading
    });
  }

  navigateToRoute = (path) => {
      const { history } = this.props;
      history.push(path);
    
  };

  filterProviders = (event) => {
    // TASK 2:
    // On input, filter Available Providers based on Name, Address and Type
    //
    // ============== CODE GOES BELOW THIS LINE :) ==============
    const { data } = this.state;
    const searchQuery = event.target.value;
    const filteredProviders = data.filter(field => pathGet(field, searchQuery));
    this.setState({...this.state, filteredProviders})
  }

  switchView = (view) => {
    // TASK 4:
    // onClick on a view preference, switch across the different view options (Gallery, List, Grid)
    // based on whatever the user selects.
    //
    // ============== CODE GOES BELOW THIS LINE :) ==============
    
    this.setState({currView: view});
  }

  renderSelectedView = () => {
    const {currView, data, imageFallBackSrc } = this.state;
    switch(currView) {
      case "gallery":
        return (
          <Gallery
            items={data.map((item) => ({
              id: item.id,
              name: item.name,
              description: item.description,
              imageUrl: item.images.length > 0 ? item.images[0].url : imageFallBackSrc,
            }))}
            onClick={this.navigateToRoute}
          />
        )
      case "grid":
        return (
          <Grid
            items={data}
            onClick={this.navigateToRoute}
          />
        )
      case "list":
        return (
          <List
            items={data}
            onClick={this.navigateToRoute}
          />
        )
      default:
        return (
          <Gallery
            items={data.map((item) => ({
              id: item.id,
              name: item.name,
              description: item.description,
              imageUrl:
                item.images && item.images.length > 0 && item.images[0].url,
            }))}
            onClick={this.navigateToRoute}
          />
        )
    }
  }
  render() {
    const { isLoading, data } = this.state;
    return (
      <div className="container">
        <NavBar />
        <div className="content__main">
          <section className="main__top-providers">
            <h2 className="text-header">Our Providers</h2>
            <div className="flex-row box-shadow" style={{padding:"1rem"}}>
              <div>
                <input
                  type="text"
                  className="input__style_1 input__search"
                  placeholder="&#xf002; Search with Provider Name, Address, or Type"
                  onChange={this.filterProviders}
                  onInput={this.filterProviders}
                />
              </div>
              <div className="layout-switcher">
                  <i className={"fa fa-images " + (this.state.currView === 'gallery' ? 'active' : 'none')} onClick={ () => this.switchView('gallery')}></i>
                <i className={"fa fa-th-large " + (this.state.currView === 'grid' ? 'active' : 'none')} onClick={ () => this.switchView('grid')}></i>
                <i className={"fa fa-th-list " + (this.state.currView === 'list' ? 'active' : 'none')} onClick={ () => this.switchView('list')}></i>
                </div>
            </div>
            {(isLoading || !data) ? (
              <LoadingScreen />
            ) : (
              <React.Fragment>                
                {this.renderSelectedView()}
              </React.Fragment>
            )}
          </section>
          <section className="main__new-provider fixed">
              <div className="new-provider">
                <h2 className="text-header">Can't find a Provider?</h2>
                <p className="text-body">Feel free to recommend a new one.</p>
                <hr/>
                <NewProviderForm />
              </div>
          </section>
        </div>
      </div>
    );
  }
}

export default ExplorePage;
