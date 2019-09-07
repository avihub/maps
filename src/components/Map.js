import React from 'react';

const initMap = () => {
  const myLatLng = {lat: -25.363, lng: 131.044};

  const map = new window.google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: myLatLng
  });

  const marker = new window.google.maps.Marker({
                                        position: myLatLng,
                                        map: map,
                                        title: 'Hello World!'
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
    return (
      <div id={'map'} style={{width: '600px', height: '600px'}}>
        MAP
      </div>
    )
  }
}

export default Map;