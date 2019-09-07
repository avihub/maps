import React from 'react';

let map;

class MapBing extends React.Component {

  componentDidMount () {
    window.initMap = () => {
      this.props.onMapApiReady();
    };

    const script = document.createElement("script");
    script.src = "http://www.bing.com/api/maps/mapcontrol?callback=initMap&key=Am_ofcTxqHt64-Hszi_NmpA2jHaTfn3FKw2oS_FY35Wz7YuzYIuU9AdN2hI9Su1D";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }

  render() {
    console.log('render map with marks: ', this.props.marks)
    if (window.Microsoft && window.Microsoft.Maps) {
      if (!map) {
        map = new window.Microsoft.Maps.Map('#map', {zoom: 1});
      }

      //Create array of locations to form a ring.
      let exteriorRing = this.props.marks.map(mark => {
        return new window.Microsoft.Maps.Location(mark.lat, mark.lng)
      })

      //Create a polygon
      let polygon = new window.Microsoft.Maps.Polygon(exteriorRing, {
        fillColor: 'rgba(0, 255, 0, 0.5)',
        strokeColor: 'red',
        strokeThickness: 2
      });

      //Add the polygon to map
      map.entities.push(polygon);
    }

    return (
      <div id={'map'} style={{width: '100%', height: '600px'}}>
        MAP
      </div>
    )
  }
}

export default MapBing;