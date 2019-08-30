import React from 'react';

const FORM_TYPE = {
  latAndLng: 'latAndLng',
  placeFromList: 'placeFromList',
  edit: 'edit'
}

const PLACES = [
  {name: 'Tel-Aviv', lat: '123', lng: '345'},
  {name: 'Haifa', lat: '234', lng: '555'},
  {name: 'Jerusalem', lat: '333', lng: '666'},
  {name: 'Dead-Sea', lat: '444', lng: '777'},
]

const defaultState = {
  formType: FORM_TYPE.latAndLng,
  selectedPlaceIndex: 0,
  formData: {
    lat: '',
    lng: ''
  }
}

class MarksForm extends React.Component {
  state = {
    ...defaultState
  }

  onDropdownChange = e => {
    this.setState({
      selectedPlaceIndex: e.target.value,
      formData: {
        ...this.state.formData,
        lat: PLACES[e.target.value].lat,
        lng: PLACES[e.target.value].lng
      }
    })
  }

  onInputChange = e => {
    this.setState({
      formData: {
        ...this.state.formData,
        [e.target.name]: e.target.value
      }
    });
  }

  onFormTypeChange = e => {
    let lat = '';
    let lng = '';
    if (e.target.value === FORM_TYPE.placeFromList) {
      lat = PLACES[0].lat;
      lng = PLACES[0].lng;
    }
    this.setState({
      formType: e.target.value,
      formData: {
        ...this.state.formData,
        lat,
        lng
      }
    })
  }

  onFormSubmit = e => {
    e.preventDefault();

    this.props.onFormSubmit(this.state.formData);

    this.setState({
      ...defaultState
    })
  }

  getFormFields = () => {
    switch (this.state.formType) {
      case FORM_TYPE.latAndLng:
        return (
          <div>
            <label>lat:</label>
            <input
              type='text'
              name='lat'
              value={this.state.formData.lat}
              onChange={this.onInputChange}
            />
            <label>lng:</label>
            <input
              type='text'
              name='lng'
              value={this.state.formData.lng}
              onChange={this.onInputChange}
            />
          </div>
        )
      case FORM_TYPE.placeFromList:
        return (
          <select value={this.state.selectedPlaceIndex} onChange={this.onDropdownChange}>
            {PLACES.map((option, i) => <option key={option.name} value={i}>{option.name}</option>)}
          </select>
        )
      default:
        return null;
    }
  }

  getFormTypeRadioBtns = () => {
    return (
      <div onChange={this.onFormTypeChange}>
        <div>
          <input
            type='radio'
            name='submitType'
            value={FORM_TYPE.latAndLng}
            id={FORM_TYPE.latAndLng}
            checked={this.state.formType === FORM_TYPE.latAndLng}
            readOnly
          />
          <label htmlFor={FORM_TYPE.latAndLng}>Add Mark by lat and lng</label>
        </div>
        <div>
          <input
            type='radio'
            name='submitType'
            value={FORM_TYPE.placeFromList}
            id={FORM_TYPE.placeFromList}
            checked={this.state.formType === FORM_TYPE.placeFromList}
            readOnly
          />
          <label htmlFor={FORM_TYPE.placeFromList}>Add Mark from list</label>
        </div>
        {/*<input type='radio' name='submitType' value='editMark'></input>*/}
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.getFormTypeRadioBtns()}
        <form onSubmit={this.onFormSubmit}>
          {this.getFormFields()}
          <button type='submit'>Submit</button>
        </form>
      </div>
    )
  }
}

export default MarksForm;
