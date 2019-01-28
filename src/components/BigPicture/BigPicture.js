import React, {Component} from 'react';
import BigPicture from "react-bigpicture";

import './BigPicture.css';

class BigPictureComponent extends Component {
  render() {
    const videoId = (this.props.link.split('='))[1];
    
    return (
      <BigPicture
        type="youtube"
        src={this.props.link}
      >
        <img src={"http://img.youtube.com/vi/" + videoId + "/hqdefault.jpg"} alt={"Видео о режиссере"} className="img-fluid" />
      </BigPicture>
    )
  }
}

export default BigPictureComponent;
