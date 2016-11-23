import React from 'react';

export default class CurrencyField extends React.Component {
  constructor (props) {
    super(props);

    this.state = {};
    for (let key in props.formData) {
      this.state[key] = props.formData[key];
    }
  }

  onChange (name) {
    const component = this;
    return (event) => {
      let scratch = Object.assign({}, this.state);
      scratch[name] = parseFloat(event.target.value);
      scratch['amount'] = scratch['rate'] * scratch['original'];
      component.setState(scratch, () => component.props.onChange(component.state));
    };
  }

  onChangeCurrency (event) {
    this.setState({
      currency: event.target.value
    }, () => this.props.onChange(this.state));
  }

  render () {
    const {currency, original, rate, amount} = this.state;
    return <div>
      <legend>{this.props.schema.title}</legend>
      <div className="row">
        <div className="col-sm-4">
          <label>Currency</label>
          <select name="currency_code" value={currency} onChange={this.onChangeCurrency.bind(this)}>
            <option value="">Select a currency</option>
            <option value="AUD">Australian Dollar</option>
            <option value="BRL">Brazilian Real</option>
            <option value="CAD">Canadian Dollar</option>
            <option value="CZK">Czech Koruna</option>
            <option value="DKK">Danish Krone</option>
            <option value="EGP">Egyptian Pound</option>
            <option value="EUR">Euro</option>
            <option value="HKD">Hong Kong Dollar</option>
            <option value="HUF">Hungarian Forint </option>
            <option value="JPY">Japanese Yen</option>
            <option value="MYR">Malaysian Ringgit</option>
            <option value="MXN">Mexican Peso</option>
            <option value="NOK">Norwegian Krone</option>
            <option value="NZD">New Zealand Dollar</option>
            <option value="PHP">Philippine Peso</option>
            <option value="PLN">Polish Zloty</option>
            <option value="GBP">Pound Sterling</option>
            <option value="SGD">Singapore Dollar</option>
            <option value="SEK">Swedish Krona</option>
            <option value="CHF">Swiss Franc</option>
            <option value="TWD">Taiwan New Dollar</option>
            <option value="THB">Thai Baht</option>
            <option value="TRY">Turkish Lira</option>
            <option value="USD">U.S. Dollar</option>
          </select>
        </div>
        <div className="col-sm-4">
          <label>Original Amount</label>
          <input className="form-control" type="number" value={original} step="1"
            onChange={this.onChange('original')} />
        </div>
        <div className="col-sm-4">
          <label>Exchange Rate</label>
          <input className="form-control" type="number" value={rate} step="0.01"
            onChange={this.onChange('rate')} />
        </div>
      </div>
      <div className="row" >
        <div className="col-sm-4">
          <label>Amount</label>
          <input className="form-control" type="number" value={amount} disabled/>
        </div>
      </div>
    </div>;
  }
}
