import React from 'react';

let map;

const initMap = () => {
  map = new window.google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: {lat: 24.886, lng: -70.268},
    mapTypeId: 'terrain'
  });
}

class Map extends React.Component {

  componentDidMount () {
    const script = document.createElement("script");
    window.initMap = initMap;
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDI5ypMzAAAAemZP2qn1Iymb14NfvmWvuQ&callback=initMap";
    script.async = true;
    script.defer = true;

    document.body.appendChild(script);
  }

  render() {
    console.log('render map with marks: ', this.props.marks)
    if (window.google && window.google.maps) {
      map = new window.google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: {lat: 24.886, lng: -70.268},
        mapTypeId: 'terrain'
      });
      let bermudaTriangle = new window.google.maps.Polygon({
                                                          paths: this.props.marks,
                                                          strokeColor: '#FF0000',
                                                          strokeOpacity: 0.8,
                                                          strokeWeight: 2,
                                                          fillColor: '#FF0000',
                                                          fillOpacity: 0.35
                                                        });
      bermudaTriangle.setMap(map);
    }
    return (
      <div id={'map'} style={{width: '700px', height: '600px'}}>
        MAP
      </div>
    )
  }
}

export default Map;