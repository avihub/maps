import React from 'react';
import MarksForm from './MarksForm';
import MarksList from './MarksList';

const uniqueId = () => {
  return Math.random().toString(36).substr(2, 16);
};

class App extends React.Component {

  state = {
    marks: [
      {lat: "as", lng: "b", id: 133},
      {lat: "as", lng: "b", placeName: 'place1', id: 222},
      {lat: "a", lng: "eee", id: 8378}
    ],
    editMark: null
    // editMark: {lat: "a", lng: "eee", id: 8378}
  }

  onFormSubmit = formData => {
    console.log(formData)
    formData.id = uniqueId();
    console.log([...this.state.marks, formData])
    this.setState({
      marks: [...this.state.marks, formData],
      editMark: null
    })
  }

  onItemDelete = markId => {
    const updatedArray = this.state.marks.filter(mark => mark.id !== markId);
    this.setState({ marks: updatedArray })
  }

  onMarkEdit = mark => {
    this.setState({ editMark: mark })
  }

  render() {
    return (
      <div>
        <MarksForm onFormSubmit={this.onFormSubmit} editMark={this.state.editMark} />
        <MarksList marks={this.state.marks} onItemDelete={this.onItemDelete} onMarkEdit={this.onMarkEdit} />
      </div>
    )
  }
}

export default App;
