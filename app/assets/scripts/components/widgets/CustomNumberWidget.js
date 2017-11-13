import React from 'react';

class CustomNumberWidget extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
    this.state.value = this.props.formData;
  }

  onChange (e) {
    let value = e.target.value || undefined;
    if (value) value = Number(value);
    this.setState({ value: value }, () => {
      this.props.onChange(value);
    });
  }

  render () {
    let {
      schema,
      id,
      placeholder,
      disabled,
      readonly,
      autofocus
    } = this.props;

    let requiredLabel = (this.props.required) ? '*' : '';

    return (<div>
      <label className="control-label">{`${schema.title} ${requiredLabel}`} </label>
      <p className="field-description">{schema.description}</p>
      <input
      type="number"
      id={id}
      className="form-control"
      value={this.state.value}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readonly}
      autoFocus={autofocus}
      onChange={this.onChange.bind(this)}/>
      </div>);
  }
}

export default CustomNumberWidget;
