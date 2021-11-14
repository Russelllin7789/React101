import Card, {
  CardPrimaryContent,
} from "@material/react-card";

import {
  Body1,
  Body2,
  Button,
  Caption,
  Headline1,
  Headline2,
  Headline3,
  Headline4,
  Headline5,
  Headline6,
  Overline,
  Subtitle1,
  Subtitle2,
} from '@material/react-typography';

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
        <Card>
          <CardPrimaryContent>
            <div style={{ padding: "1rem" }}>
              <h2>Receipt</h2>
              <Headline6 className='demo-card__title' tag="p">
                發票類型
              </Headline6>
              <Body2 tag="div">
                <div>
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
              </Body2>
            </div>
          </CardPrimaryContent>
        </Card>
      </div>
    )
  }
}

export default ReceiptType;