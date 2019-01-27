import React, { Component } from 'react';
import { YMaps, Map, Placemark, FullscreenControl  } from 'react-yandex-maps';


const mapState = {
  center: [53.9, 27.56667],
  zoom: 10,
};


class MapComponent extends Component {
  render() {
    return (
      <YMaps>
        <Map defaultState={mapState} width={500} height={400}>
          <FullscreenControl />
          <Placemark geometry={[55.684758, 37.738521]} />
        </Map>
      </YMaps>
    );
  };
}

export default MapComponent;
