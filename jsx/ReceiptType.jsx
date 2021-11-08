class ReceiptType extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      receiptType: 2,
      taxId: '',
      receiptOptions: ['byMail']
    }
  }

  handler = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  checkBoxHandler = (e) => {
    const { name, value } = e.target
  }

  render = () => {
    return (
      <div>
        <h1>Hello!!!Russell~~~</h1>
        <div>
          <span>發票類型</span><br />
          <label>
            <input type="radio" name="receiptType" value="2" checked={this.state.receiptType === 2} onChange={this.handler} />
            個人
          </label>
          <br />
          <label>
            <input type="radio" name="receiptType" value="3" checked={this.state.receiptType === 3} onChange={this.handler} />
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
            <input type="checkbox" name="receiptOptions[]" value="byMail" checked={this.state.receiptOptions.includes('byMail')} onChange={this.checkBoxHandler} />
            實體寄送（+30）
          </label>
          <br />
          <label>
            <input type="checkbox" name="receiptOptions[]" value="promptRegistered" checked={this.state.receiptOptions.includes('promptRegistered')} onChange={this.checkBoxHandler} />
            限時寄送（+60）
          </label>
        </div>
      </div>
    )
  }
}

export default ReceiptType;