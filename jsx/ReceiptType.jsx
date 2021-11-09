class ReceiptType extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      receiptType: '2',
      taxId: '',
      receiptOptions: ['byMail']
    }
  }

  handler = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  removeValueFromArray = (arr, value) => {
    return arr.filter((element) => element !== value)
  }

  checkBoxHandler = (e) => {
    const newValue = e.target.value
    const name = e.target.getAttribute('attribute')
    let values = this.state[name]

    if (values.includes(newValue)) {
      values = this.removeValueFromArray(values, newValue)
    } else {
      values.push(newValue)
    }

    if (name === 'receiptOptions' && !values.includes('byMail')) {
      values = []
    }

    this.setState({ [name]: values })
  }

  render = () => {
    return (
      <div>
        <h1>Hello!!!Russell~~~</h1>
        <div>
          <span>發票類型</span><br />
          <label>
            <input type="radio" name="receiptType" value="2" checked={this.state.receiptType === '2'} onChange={this.handler} />
            個人
          </label>
          <br />
          <label>
            <input type="radio" name="receiptType" value="3" checked={this.state.receiptType === '3'} onChange={this.handler} />
            公司
            統一編號
            <input type="text" name="taxId" value={this.state.taxId} onChange={this.handler} />
          </label>
        </div>
        <br />
        <br />
        <div>
          <span>郵寄選項</span><br />
          <label>
            <input type="checkbox" name="receiptOptions[]" value="byMail" attribute="receiptOptions" checked={this.state.receiptOptions.includes('byMail')} onChange={this.checkBoxHandler} />
            實體寄送（+30）
          </label>
          <br />
          <label>
            <input type="checkbox" name="receiptOptions[]" value="promptRegistered" attribute="receiptOptions" checked={this.state.receiptOptions.includes('promptRegistered')} disabled={!this.state.receiptOptions.includes('byMail')} onChange={this.checkBoxHandler} />
            限時寄送（+60）
          </label>
        </div>
      </div>
    )
  }
}

export default ReceiptType;