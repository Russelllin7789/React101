import AddressPicker from "./AddressPicker.jsx"
import ReceiptType from './ReceiptType.jsx'
import TaiwanPostalCode from './TaiwanPostalCode.json'
import Button from '@material/react-button'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      receipt: {
        receiptType: '2',
        taxId: '',
        receiptOptions: ['byMail']
      },
      fullAddress: {
        city: '宜蘭縣',
        district: '',
        postalCode: '',
        address: ''
      },
    }
  }

  checkIsReceiptTypeReady = () => {
    let result = false
    if (this.state.receipt.receiptType === '2') {
      result = true
    } else if (this.state.receipt.receiptType === '3' && this.state.receipt.taxId !== '') {
      result = true
    }
    return result
  }

  checkIsAddressReady = () => {
    let result = false
    const { city, district, postalCode, address } = this.state.fullAddress
    if (city !== '' && district !== '' && postalCode !== '' && address !== '') {
      result = true
    }
    return result
  }

  isReady = () => {
    return this.checkIsReceiptTypeReady() && this.checkIsAddressReady()
  }

  handler = (name, value) => {
    this.setState({ [name]: value })
  }

  render() {
    return (
      <div>
        <ReceiptType
          receipt={this.state.receipt}
          handler={this.handler} />
        <hr />
        <AddressPicker
          fullAddress={this.state.fullAddress}
          handler={this.handler}
          taiwanPostalCodes={TaiwanPostalCode} />
        <hr />
        <Button type="submit" disabled={!this.isReady()} raised>Submit</Button>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))