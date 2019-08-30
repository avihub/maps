import React from 'react';

class MarksForm extends React.Component {
  state = {
    lat: '',
    lng: ''
  }

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onFormSubmit = e => {
    e.preventDefault();

    this.setState(
      {
        lat: '',
        lng: ''
      }
    )

    this.props.onFormSubmit(this.state);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <label>lat:</label>
          <input
            type='text'
            name='lat'
            value={this.state.lat}
            onChange={this.onInputChange}
          />
          <label>lng:</label>
          <input
            type='text'
            name='lng'
            value={this.state.lng}
            onChange={this.onInputChange}
          />
          <button type='submit'>Submit</button>
        </form>
      </div>
    )
  }
}

export default MarksForm;
