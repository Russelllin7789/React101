import TaiwanPostalCode from './TaiwanPostalCode.json'

class AddressPicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      city: '新竹市'
    }

    this.postalCode = TaiwanPostalCode
    this.cities = Object.keys(this.postalCode)
  }

  selectedCity = (e) => {
    let { name, value } = e.target
    this.setState({ [name]: value }, () => console.log(this.state))
  }

  getCityOptions = (cities) => {
    return cities.map((city) => {
      return (<option key={city} value={city}>{city}</option>)
    })
  }

  render() {
    const cityOptions = this.getCityOptions(this.cities)
    return (
      <div className="container">
        <h1>Address Picker
          <div>
            <label>城市</label>
            <select name="city" onChange={this.selectedCity} value={this.state.city}>
              {cityOptions}
            </select>
            <label>區域</label>
            <select name="area" >
              <option></option>
            </select>
          </div>
        </h1>
      </div>
    )
  }
}

export default AddressPicker;