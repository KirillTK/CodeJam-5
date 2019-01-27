import {Component} from "react";
import './Gallery.css';
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';


class GalleryComponent extends Component {

  render() {
    return (<div className="Gallery">
      <Carousel showThumbs={false} width={"500px"} dynamicHeight={true}>
        {this.renderSlide()}
      </Carousel>
    </div>)
  }


  renderSlide() {
    const parent = [];
    const child = [];
    this.props.photos.forEach(photo => {
      child.push(<div><img src={photo} alt={"Images of author"}/></div>)
    });

    parent.push(child);
    return parent;
  }


}

export default GalleryComponent;