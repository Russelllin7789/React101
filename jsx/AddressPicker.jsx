import TaiwanPostalCode from './TaiwanPostalCode.json'

class AddressPicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      city: '宜蘭縣',
      district: '',
      postalCode: ''
    }

    this.postalCode = TaiwanPostalCode
    this.cities = Object.keys(this.postalCode)
  }

  handler = (name, value) => {
    let mergeObject = {}

    if (name === 'city' && this.state.city !== value) {
      //利用 object 複寫的特性，在重新選擇城市後，清空區域 && 郵遞區號
      mergeObject['district'] = ''
      mergeObject['postalCode'] = ''
    } else if (name === 'district' && this.state.district !== value) {
      const cityData = this.postalCode[this.state.city]
      const postalCode = cityData[value]
      mergeObject['postalCode'] = postalCode
    }

    return mergeObject
  }

  selectedAction = (e) => {
    let { name, value } = e.target

    const mergeObject = this.handler(name, value)
    this.setState({ ...mergeObject, [name]: value }, () => console.log(this.state))
  }

  getDistricts = (districts) => {
    return districts.map((district) => {
      return (<option key={district} value={district}>{district}</option>)
    })
  }

  //這段也可以放在 render 裡面
  getCityOptions = (cities) => {
    return cities.map((city) => {
      return (<option key={city} value={city}>{city}</option>)
    })
  }

  render() {
    const cityOptions = this.getCityOptions(this.cities)
    const cityData = Object.keys(this.postalCode[this.state.city])
    const districts = this.getDistricts(cityData)
    return (
      <div className="container">
        <h1>Address Picker</h1>
        <div>
          <label>城市</label>
          <select name="city" onChange={this.selectedAction} value={this.state.city}>
            {cityOptions}
          </select>
          <br />
          <label>區域</label>
          <select name="district" onChange={this.selectedAction} value={this.state.district} >
            {districts}
          </select>
          <br />
          <label>郵遞區號</label>
          <input name="postalCode" onChange={this.selectedAction} value={this.state.postalCode} disabled={true} />
        </div>
      </div>
    )
  }
}

export default AddressPicker;