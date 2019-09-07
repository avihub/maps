import React from 'react';

let marks = []
let map;

const initMap = () => {
  map = new window.google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: {lat: 24.886, lng: -70.268},
    mapTypeId: 'terrain'
  });

  // Define the LatLng coordinates for the polygon's path.
  // const triangleCoords = [
  //   {lat: 25.774, lng: -80.190},
  //   {lat: 18.466, lng: -66.118},
  //   {lat: 32.321, lng: -64.757},
  //   {lat: 25.774, lng: -80.190}
  // ];
  //
  // // Construct the polygon.
  // var bermudaTriangle = new window.google.maps.Polygon({
  //                                                 paths: triangleCoords,
  //                                                 // paths: marks,
  //                                                 strokeColor: '#FF0000',
  //                                                 strokeOpacity: 0.8,
  //                                                 strokeWeight: 2,
  //                                                 fillColor: '#FF0000',
  //                                                 fillOpacity: 0.35
  //                                               });
  // bermudaTriangle.setMap(map);


  // const myLatLng = {lat: -25.363, lng: 131.044};
  //
  // const map = new window.google.maps.Map(document.getElementById('map'), {
  //   zoom: 4,
  //   center: myLatLng
  // });
  //
  // const marker = new window.google.maps.Marker({
  //                                       position: myLatLng,
  //                                       map: map,
  //                                       title: 'Hello World!'
  //                                     });
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
    // marks = this.props.marks;
    if (window.google && window.google.maps) {
      map = new window.google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: {lat: 24.886, lng: -70.268},
        mapTypeId: 'terrain'
      });
      let triangleCoords = this.props.marks;
      // const triangleCoords = [
      //   {lat: 25.774, lng: -80.190},
      //   {lat: 18.466, lng: -66.118},
      //   {lat: 32.321, lng: -64.757},
      //   {lat: 25.774, lng: -80.190}
      // ];
      let bermudaTriangle = new window.google.maps.Polygon({
                                                          paths: triangleCoords,
                                                          // paths: marks,
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