import React from 'react';
import TextField from './generic/TextField';
import RadioField from './generic/RadioField';

const FORM_TYPE = {
  latAndLng: 'latAndLng',
  placeFromList: 'placeFromList',
  edit: 'edit'
}

const PLACES = [
  {placeName: 'Tel-Aviv', lat: 1, lng: 60},
  {placeName: 'Haifa', lat: 20, lng: 80},
  {placeName: 'Jerusalem', lat: 30, lng: 40},
  {placeName: 'Dead-Sea', lat: 50, lng: 60}
]

const defaultMarkData = {
  lat: '',
  lng: '',
  placeName: ''
}

const defaultState = {
  formType: FORM_TYPE.latAndLng,
  selectedPlaceIndex: 0,
  formData: {...defaultMarkData}
}

class MarksForm extends React.Component {
  state = {
    ...defaultState
  }

  componentDidUpdate(prevProps) {
   if (this.props.editMark && prevProps !== this.props) {
     this.setState({
       ...defaultState,
       formType: FORM_TYPE.edit,
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
        [e.target.name]: isNaN(parseFloat(e.target.value)) ? e.target.value : parseFloat(e.target.value)
      }
    });
  }

  onAddTypeChange = e => {
    let markData = {...defaultMarkData}
    if (e.target.value === FORM_TYPE.placeFromList) {
      markData.lat = PLACES[0].lat;
      markData.lng = PLACES[0].lng;
      markData.placeName = PLACES[0].placeName;
    }
    this.setState({
      formType: e.target.value,
      formData: {
        ...this.state.formData,
        ...markData
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
          type={'number'}
          name='lat'
          value={this.state.formData.lat}
          onChange={this.onInputChange}
        />
        <TextField
          label={'lng'}
          type={'number'}
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
        {this.state.formType === FORM_TYPE.latAndLng ? this.getLatLngFields() : this.getPlacesDropDown()}
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
     return this.state.formType === FORM_TYPE.edit ? this.getEditFields() : this.getAddFields()
  }

  getFormTypeRadioBtns = () => {
    return (
      <RadioField
        name='submitType'
        selectedValue={this.state.formType}
        onChange={this.onAddTypeChange}
        radios={[
          {value: FORM_TYPE.latAndLng, label: 'Add Mark by lat and lng'},
          {value: FORM_TYPE.placeFromList, label: 'Add Mark from list'},
          {value: FORM_TYPE.edit, label: 'Edit mark', disabled: true}
        ]}
      />
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
