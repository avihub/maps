import React from 'react';
import MarksForm from './MarksForm';
import MarksList from './MarksList';
import MapBing from './MapBing';
import {uniqueId} from '../utils';

class App extends React.Component {

  state = {
    marks: [
      {lat: 25.774, lng: -80.190, id: 'sadsxji'},
      {lat: 18.466, lng: -66.118, id: 133},
      {lat: 32.321, lng: -64.757, placeName: 'place1', id: 222},
      {lat: 25.774, lng: -80.190, id: 8378}
    ],
    editMark: null,
    mapApiReady: false
  }

  onFormSubmit = formData => {
    console.log('formData to submit: ', formData)
    if (formData.id) { // edit mark
      let marks = [...this.state.marks]
      for (let i = 0 ; i < marks.length ; ++i) {
        if (marks[i].id === formData.id) {
          marks[i] = {...formData}
        }
      }
      console.log('new marks state after Edit mark: ', [...marks])
      this.setState({
        marks: [...marks],
        editMark: null
      })
    } else { // add mark
      formData.id = uniqueId();
      console.log('new marks state after Add mark: ', [...this.state.marks, formData])
      this.setState({
        marks: [...this.state.marks, formData],
        editMark: null
      })
    }
  }

  onItemDelete = markId => {
    const updatedArray = this.state.marks.filter(mark => mark.id !== markId);
    this.setState({ marks: updatedArray })
  }

  onMarkEdit = mark => {
    this.setState({ editMark: mark })
  }

  onMapApiReady = () => {
    this.setState({ mapApiReady: true })
  }

  render() {
    return (
      <div>
        <MarksForm onFormSubmit={this.onFormSubmit} editMark={this.state.editMark} />
        <MapBing marks={this.state.marks} onMapApiReady={this.onMapApiReady} />
        <MarksList marks={this.state.marks} onItemDelete={this.onItemDelete} onMarkEdit={this.onMarkEdit} />
      </div>
    )
  }
}

export default App;
