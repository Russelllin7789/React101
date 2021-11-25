import AddressPicker from "./AddressPicker.jsx"
import ReceiptType from './ReceiptType.jsx'
import TaiwanPostalCode from './TaiwanPostalCode.json'
import Button from '@material/react-button'
import { Cell, Grid, Row } from '@material/react-layout-grid';

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
        <form>
          <Grid>
            <Row>
              <Cell desktopColumns={3} phoneColumns={0} tabletColumns={1}></Cell>
              <Cell desktopColumns={6} phoneColumns={4} tabletColumns={6}>
                <ReceiptType
                  receipt={this.state.receipt}
                  handler={this.handler} />
                <br />
              </Cell>
              <Cell desktopColumns={3} phoneColumns={0} tabletColumns={1}></Cell>
            </Row>
            <Row>
              <Cell desktopColumns={3} phoneColumns={0} tabletColumns={1}></Cell>
              <Cell desktopColumns={6} phoneColumns={4} tabletColumns={6}>
                <AddressPicker
                  fullAddress={this.state.fullAddress}
                  handler={this.handler}
                  taiwanPostalCodes={TaiwanPostalCode} />
                <br />
              </Cell>
              <Cell desktopColumns={3} phoneColumns={0} tabletColumns={1}></Cell>
            </Row>
            <Row>
              <Cell desktopColumns={3} phoneColumns={0} tabletColumns={1}></Cell>
              <Cell desktopColumns={6} phoneColumns={4} tabletColumns={6}>
                <Button type="submit" disabled={!this.isReady()} raised>Submit</Button>
              </Cell>
              <Cell desktopColumns={3} phoneColumns={0} tabletColumns={1}></Cell>
            </Row>
          </Grid>
        </form>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))