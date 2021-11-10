class ReceiptType extends React.Component {
  removeValueFromArray = (arr, value) => {
    return arr.filter((element) => element !== value)
  }

  checkBoxHandler = (e) => {
    const newValue = e.target.value
    const name = e.target.getAttribute('attribute')
    const { receipt, handler } = this.props
    let values = receipt[name]

    if (values.includes(newValue)) {
      values = this.removeValueFromArray(values, newValue)
    } else {
      values.push(newValue)
    }

    // 若第一個選項未選擇，清空第二個選項且令其無法選擇
    if (name === 'receiptOptions' && !values.includes('byMail')) {
      values = []
    }

    handler('receipt', { ...receipt, [name]: values })
  }

  inputHandler = (e) => {
    const { name, value } = e.target
    const { receipt, handler } = this.props
    handler('receipt', { ...receipt, [name]: value })
  }

  render = () => {
    const { receipt } = this.props
    const { receiptType, taxId, receiptOptions } = receipt
    return (
      <div>
        <div>
          <span>發票類型</span><br />
          <label>
            <input type="radio" name="receiptType" value="2" checked={receiptType === '2'} onChange={this.inputHandler} />
            個人
          </label>
          <br />
          <label>
            <input type="radio" name="receiptType" value="3" checked={receiptType === '3'} onChange={this.inputHandler} />
            公司
            統一編號
            <input type="text" name="taxId" value={taxId} onChange={this.inputHandler} />
          </label>
        </div>
        <br />
        <br />
        <div>
          <span>郵寄選項</span><br />
          <label>
            <input type="checkbox" name="receiptOptions[]" value="byMail" attribute="receiptOptions" checked={receiptOptions.includes('byMail')} onChange={this.checkBoxHandler} />
            實體寄送（+30）
          </label>
          <br />
          <label>
            <input type="checkbox" name="receiptOptions[]" value="promptRegistered" attribute="receiptOptions" checked={receiptOptions.includes('promptRegistered')} disabled={!receiptOptions.includes('byMail')} onChange={this.checkBoxHandler} />
            限時寄送（+60）
          </label>
        </div>
      </div>
    )
  }
}

export default ReceiptType;