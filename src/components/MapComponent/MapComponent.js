import React, { Component } from 'react';
import { YMaps, Map, Placemark, FullscreenControl } from 'react-yandex-maps';
import uuid from 'uuid/v4';



class MapComponent extends Component {
  render() {

    const centerCoordinate = this.getCenterCoordinate();

    return (
      <YMaps className={"MapComponent"}>
        <Map defaultState={{ center: centerCoordinate, zoom: 13 }} width="100%" height="400px">
          <FullscreenControl />
          {this.renderPlaceMark()}
        </Map>
      </YMaps>
    );
  };


  renderPlaceMark() {
    const marks = [];
    this.props.coordinates.forEach(coordinate => {
      const latitude = coordinate.placeCoords.split(', ')[0];
      const longitude = coordinate.placeCoords.split(', ')[1];
      marks.push(<Placemark key={uuid()} geometry={[latitude, longitude]}
        properties={{ iconCaption: coordinate.placeName }} />)
    });
    return marks;
  }

  getCenterCoordinate() {
    return [this.props.coordinates[0].placeCoords.split(', ')[0], this.props.coordinates[0].placeCoords.split(', ')[1]];
  }

}

export default MapComponent;
