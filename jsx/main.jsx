class Test extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '123'
    }
  }
  inputHandler(e) {
    this.setState({ value: e.target.value })
  }
  render() {
    return (
      <div>
        <input type="text" value={this.state.value} onChange={this.inputHandler.bind(this)} />
      </div>
    )
  }
}

ReactDOM.render(<Test />, document.getElementById('root'))