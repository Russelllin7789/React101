import AddressPicker from "./AddressPicker.jsx"
import ReceiptType from './ReceiptType.jsx'

class App extends React.Component {
  render() {
    return (
      <div>
        <ReceiptType />
        <hr />
        <AddressPicker />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))