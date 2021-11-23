import Card, { CardPrimaryContent } from "@material/react-card"
import TextField, { HelperText, Input } from "@material/react-text-field"

class AddressPicker extends React.Component {
  constructor(props) {
    super(props)
    this.cities = Object.keys(this.props.taiwanPostalCodes)
  }

  handlerRelated = (name, value) => {
    let mergeObject = {}
    const { taiwanPostalCodes, fullAddress: { city, district, postalCode, address } } = this.props

    if (name === 'city' && city !== value) {
      //利用 object 複寫的特性，在重新選擇城市後，清空區域 && 郵遞區號
      mergeObject['district'] = ''
      mergeObject['postalCode'] = ''
    } else if (name === 'district' && district !== value) {
      const cityData = taiwanPostalCodes[city]
      const postalCode = cityData[value]
      mergeObject['postalCode'] = postalCode
    }

    return mergeObject
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

  inputHandler = (e) => {
    const { name, value } = e.target
    console.log(name, value)
    const { fullAddress, handler } = this.props
    const mergeObject = this.handlerRelated(name, value)
    handler('fullAddress', { ...fullAddress, ...mergeObject, [name]: value })
  }

  render() {
    const { taiwanPostalCodes, fullAddress: { city, district, postalCode, address } } = this.props
    const cityOptions = this.getCityOptions(this.cities)
    const cityData = taiwanPostalCodes[city]
    const districts = Object.keys(cityData)
    const districtOptions = this.getDistricts(districts)
    return (
      <Card>
        <CardPrimaryContent>
          <div style={{ 'marginLeft': '1rem' }} className="container">
            <h2>Address</h2>
            <div>
              <label>城市</label>
              <select name="city" onChange={this.inputHandler} value={city}>
                {cityOptions}
              </select>
              <br />
              <label>區域</label>
              <select name="district" onChange={this.inputHandler} value={district} >
                {districtOptions}
              </select>
              <br />
              <TextField
                outlined
                label='郵遞區號'
              >
                <Input
                  type="text"
                  name={postalCode}
                  value={postalCode}
                  disabled={true}
                  onChange={this.inputHandler} />
              </TextField>
              <br />
              <TextField
                outlined
                label='地址'
              >
                <Input
                  type="text"
                  name={address}
                  value={address}
                  onChange={this.inputHandler} />
              </TextField>

              {/* <label>郵遞區號</label>
              <input name="postalCode" onChange={this.inputHandler} value={postalCode} disabled={true} />
              <br />
              <label>地址</label>
              <input name="address" onChange={this.inputHandler} value={address} /> */}
            </div>
          </div>
        </CardPrimaryContent>
      </Card>
    )
  }
}

export default AddressPicker;