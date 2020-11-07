import React from 'react';
import PropTypes from 'prop-types';
import LoadingScreen from './common/LoadingScreen';

class Gallery extends React.Component {

  // TASK 3a:
  // Complete the Gallery component to include functionality  
  // On click on left or right arrows, the gallery should change its image
  // On click of the thumbnails, the image selected should be updated as well
  // On click of the "Read more" button in the selected Image, it should redirect to the Selected Provider View.
  //
  //
  // Task 3b:
  // Write tests for the Gallery component. Tests should be written in the Gallery.spec.js file in the __tests__ folder.
  //
  //
  // ============== CODE GOES BELOW THIS LINE :) ==============

  constructor(props) {
    super(props);
    this.state = {
      currentImageIndex: 0,
    }
  }


  goToPrevImage = () => {
    const { currentImageIndex } = this.state;
    const { items } = this.props;
    if (currentImageIndex < items.length && currentImageIndex !==0) {
      this.setState({ currentImageIndex: currentImageIndex - 1 })
    }
  }

  goToNextImage = () => {
    const { currentImageIndex } = this.state;
    const { items } = this.props;
    if ( currentImageIndex < items.length - 1) {
      this.setState({currentImageIndex: currentImageIndex + 1})
    }
  }

  renderSliderChevrons = (items, currentImageIndex) => (
    <div className="gallery__slider-controls" style= {{ height: '300px'  }}>
      <button
        className="gallery__slider-controls__button left"
        onClick={this.goToPrevImage}
        disabled={currentImageIndex === 0}
      >
        <i className="fa fa-chevron-left"></i>
      </button>
      <button
        className="gallery__slider-controls__button right"
        onClick={this.goToNextImage}
        disabled={currentImageIndex === items.length - 1}
      >
        <i className="fa fa-chevron-right"></i>
      </button>
    </div>
  );
  renderGallerySlider = (items, index) => {
    const { onClick } = this.props;
    const currentImage = items[index];
    const prevImage = items[index - 1];
    const nextImage = items[index + 1]
     return (
        <div className="gallery__slider-item-wrapper">
         <div 
          className="gallery__slider-item prev"
          style={{ backgroundImage: `url(${prevImage && prevImage.imageUrl })`,}}
         ></div>
         <div className="gallery__slider-item">
            <img
              src={currentImage.imageUrl}
              className="gallery__slider-item active"
              alt='currentSlide'
            />
           <div className="gallery__slider-item__info">
              <div className="gallery__slider-item__info-name">
                {currentImage.name}
              </div>
              <div className="gallery__slider-item__info-description">
                {currentImage.description}
                {/* Issues with slider-control z-index, readmore is not clickable expect z-index is negative, wasnt able to resolve */}
               <p
                 className="read-more"
                 onClick={() => {
                   onClick(`/${currentImage.id}`);
                 }}
               >
                 Read More
              </p>
              </div>
              
            </div>
         </div>
         <div
           className="gallery__slider-item next"
           style={{
             backgroundImage: `url(${nextImage && nextImage.imageUrl && nextImage.imageUrl})`,
           }}
         ></div>
        </div>
     );
  };

  renderThumbnails = (items, currentImageIndex) => {
    return (
      <div className="gallery__thumbnails">
        {items.length > 0 &&
          items.map((item, index) => (
            <div
              key={item.id}
              className={`gallery__thumbnails__item ${index === currentImageIndex && "active"
                }`}
              style={{
                backgroundImage: `url(${item.imageUrl})`,
              }}
            ></div>
          ))}
      </div>
    )
  }

  render() {
    const { currentImageIndex } = this.state;
    const { items } = this.props;    
    if(!items || items.length === 0) {
      return (
        <LoadingScreen />
      )
    }
    return (
      <div data-testid="gallery" className="box-shadow gallery">
        <div className="gallery__slider">
          {this.renderGallerySlider(items, currentImageIndex)}  
          {this.renderSliderChevrons(items, currentImageIndex)}
        </div>     
        {this.renderThumbnails(items, currentImageIndex)}
      </div>
    )
  }
}

Gallery.propTypes = {
  startFrom: PropTypes.number,
  items: PropTypes.arrayOf(PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string,
    description: PropTypes.string
  })).isRequired,
  onClick: PropTypes.instanceOf(Function)
}

export default Gallery
