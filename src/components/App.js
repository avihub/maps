import React from 'react';
import MarksForm from './MarksForm';
import MarksList from './MarksList';

class App extends React.Component {

  state = {
    marks: []
  }

  onFormSubmit = formData => {
    console.log(formData)
    console.log([...this.state.marks, formData])
    this.setState({ marks: [...this.state.marks, formData] })
  }

  render() {
    return (
      <div>
        <MarksForm onFormSubmit={this.onFormSubmit} />
        <MarksList marks={this.state.marks}/>
      </div>
    )
  }
}

export default App;
