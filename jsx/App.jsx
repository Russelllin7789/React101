import AddressPicker from "./AddressPicker.jsx"

class App extends React.Component {
  render() {
    return (
      <AddressPicker />
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))