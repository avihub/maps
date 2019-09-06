import React from 'react';

const FORM_TYPE = {
  latAndLng: 'latAndLng',
  placeFromList: 'placeFromList',
  edit: 'edit'
}

const PLACES = [
  {placeName: 'Tel-Aviv', lat: '123', lng: '345'},
  {placeName: 'Haifa', lat: '234', lng: '555'},
  {placeName: 'Jerusalem', lat: '333', lng: '666'},
  {placeName: 'Dead-Sea', lat: '444', lng: '777'},
]

const defaultState = {
  formType: FORM_TYPE.latAndLng,
  selectedPlaceIndex: 0,
  formData: {
    lat: '',
    lng: '',
    placeName: ''
  }
}

class MarksForm extends React.Component {
  state = {
    ...defaultState
  }

  onPlaceDropdownChange = e => {
    this.setState({
      selectedPlaceIndex: e.target.value,
      formData: {
        ...this.state.formData,
        lat: PLACES[e.target.value].lat,
        lng: PLACES[e.target.value].lng,
        placeName: PLACES[e.target.value].placeName
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

  onAddTypeChange = e => {
    let lat = '';
    let lng = '';
    let placeName = '';
    if (e.target.value === FORM_TYPE.placeFromList) {
      lat = PLACES[0].lat;
      lng = PLACES[0].lng;
      placeName = PLACES[0].placeName;
    }
    this.setState({
      formType: e.target.value,
      formData: {
        ...this.state.formData,
        lat,
        lng,
        placeName
      }
    })
  }

  onFormSubmit = e => {
    e.preventDefault();

    this.props.onFormSubmit({...this.state.formData});

    this.setState({
      ...defaultState
    })
  }

  getLatLngFields = () => {
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
  }

  getPlacesDropDown = () => {
    return (
      <select value={this.state.selectedPlaceIndex} onChange={this.onPlaceDropdownChange}>
        {PLACES.map((option, i) => <option key={option.placeName} value={i}>{option.placeName}</option>)}
      </select>
    )
  }

  getPlaceNameField = () => {
    return (<div>
      <label>placeName:</label>
      <input
        type='text'
        name='placeName'
        value={this.state.formData.placeName}
        onChange={this.onInputChange}
      />
    </div>)
  }

  getAddFields = () => {
    return (
      <div>
        {this.getFormTypeRadioBtns()}
        {this.state.formType === FORM_TYPE.latAndLng ? this.getLatLngFields() : this.getPlacesDropDown()}
      </div>
    )
  }

  getFormFields = () => {
     return this.props.editMark ? this.getPlaceNameField() : this.getAddFields()
  }

/*
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
          <select value={this.state.selectedPlaceIndex} onChange={this.onPlaceDropdownChange}>
            {PLACES.map((option, i) => <option key={option.placeName} value={i}>{option.placeName}</option>)}
          </select>
        )
      default:
        return null;
    }
  }
*/

  getFormTypeRadioBtns = () => {
    return (
      <div onChange={this.onAddTypeChange}>
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
      </div>
    )
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          {this.getFormFields()}
          <button type='submit'>Submit</button>
        </form>
      </div>
    )
  }
}

export default MarksForm;
