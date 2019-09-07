import React from 'react';
import TextField from './generic/TextField'
import RadioField from './generic/RadioField'

const ADD_TYPE = {
  latAndLng: 'latAndLng',
  placeFromList: 'placeFromList'
}

const PLACES = [
  {placeName: 'Tel-Aviv', lat: '123', lng: '345'},
  {placeName: 'Haifa', lat: '234', lng: '555'},
  {placeName: 'Jerusalem', lat: '333', lng: '666'},
  {placeName: 'Dead-Sea', lat: '444', lng: '777'},
]

const defaultState = {
  formType: ADD_TYPE.latAndLng,
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

  componentDidUpdate(prevProps) {
   if (this.props.editMark && prevProps !== this.props) {
     this.setState({
       ...defaultState,
       formType: 'edit',
       formData: {...defaultState.formData, ...this.props.editMark}
     })
   }
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
    if (e.target.value === ADD_TYPE.placeFromList) {
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
        <TextField
          label={'lat'}
          name='lat'
          value={this.state.formData.lat}
          onChange={this.onInputChange}
        />
        <TextField
          label={'lng'}
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
    return <TextField
      label={'place name'}
      name='placeName'
      value={this.state.formData.placeName}
      onChange={this.onInputChange}
    />
  }

  getAddFields = () => {
    return (
      <div>
        {this.getFormTypeRadioBtns()}
        {this.state.formType === ADD_TYPE.latAndLng ? this.getLatLngFields() : this.getPlacesDropDown()}
      </div>
    )
  }

  getEditFields = () => {
    return (
      <div>
        {this.getLatLngFields()}
        {this.getPlaceNameField()}
      </div>
    )
  }

  getFormFields = () => {
     return this.state.formType === 'edit' ? this.getEditFields() : this.getAddFields()
  }

  getFormTypeRadioBtns = () => {
    return (
      <RadioField
        name='submitType'
        selectedValue={this.state.formType}
        onChange={this.onAddTypeChange}
        radios={[
          {value: ADD_TYPE.latAndLng, label: 'Add Mark by lat and lng'},
          {value: ADD_TYPE.placeFromList, label: 'Add Mark from list'}
        ]}
      />
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
