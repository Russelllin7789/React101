import Card, { CardPrimaryContent } from "@material/react-card"
import TextField, { HelperText, Input } from "@material/react-text-field"
import MaterialIcon from "@material/react-material-icon"
import Select, { Option } from '@material/react-select';

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
      return (<Option key={district} value={district}>{district}</Option>)
    })
  }

  //這段也可以放在 render 裡面
  getCityOptions = (cities) => {
    return cities.map((city) => {
      return (<Option key={city} value={city}>{city}</Option>)
    })
  }

  onEnhancedChange = (name, index, item) => {
    const value = item.getAttribute('data-value')
    const { fullAddress, handler } = this.props
    const mergeObject = this.handlerRelated(name, value)
    handler('fullAddress', { ...fullAddress, ...mergeObject, [name]: value })
    // this.setState({ value: item.getAttribute('data-value') })
  }

  inputHandler = (e) => {
    const { name, value } = e.target
    console.log(name, value)
    const { fullAddress, handler } = this.props
    const mergeObject = this.handlerRelated(name, value)
    handler('fullAddress', { ...fullAddress, ...mergeObject, [name]: value })
  }

  clearAddress = () => {
    const name = 'address'
    const value = ''
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
              <Select
                label='城市'
                name="city"
                value={city}
                onEnhancedChange={this.onEnhancedChange.bind(this, 'city')}
                enhanced
                outlined
              >
                {cityOptions}
              </Select>
              <input type="hidden" name="city" value={city} />
              {/* <label>城市</label>
              <select name="city" onChange={this.inputHandler} value={city}>
                {cityOptions}
              </select> */}
              <br />
              <Select
                label='區域'
                name="district"
                value={district}
                onEnhancedChange={this.onEnhancedChange.bind(this, 'district')}
                enhanced
                outlined
              >
                {districtOptions}
              </Select>
              <input type="hidden" name="district" value={district} />
              {/* <label>區域</label>
              <select name="district" onChange={this.inputHandler} value={district} >
                {districtOptions}
              </select> */}
              <br />
              <TextField
                outlined
                label='郵遞區號'
              >
                <Input
                  type="text"
                  name="postalCode"
                  id="postalCode"
                  value={postalCode}
                  disabled={true}
                  onChange={this.inputHandler} />
              </TextField>
              <input type="hidden" name="postalCode" value={postalCode} />
              <br />
              <TextField
                outlined
                label='地址'
                helperText={<HelperText>輸入正確地址以完成寄送</HelperText>}
                onTrailingIconSelect={this.clearAddress}
                trailingIcon={<MaterialIcon role="button" icon="delete" />}
              >
                <Input
                  type="text"
                  name="address"
                  id="address"
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