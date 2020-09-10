import React from 'react';
import {sdsLabels, sdgLabels, otherDevLabels} from '../../utils/labels';

const typeDisplayMap = {
  'sds': 'SDS Goal - هدف استراتيجية التنمية المُستدامة',
  'sdg': 'SDG Goal - هدف التنمية المستدامة',
  'other': 'Other Development Indicator - مؤشرات اجتماعية و اقتصادية اخرى '
};

const typeChooser = {
  'sds': sdsLabels,
  'sdg': sdgLabels,
  'other': otherDevLabels
};

export default class ThemeField extends React.Component {

  constructor (props) {
    super(props);

    this.state = {};

    if (props.formData && props.formData.type) {
      this.state.type = props.formData.type;
      if (props.formData.en) {
        let enVal = props.formData.en;
        let type = props.formData.type;
        typeChooser[type].en.forEach((val, i) => {
          if (val === enVal) {
            this.state.theme = i;
          }
        });
      }
    }
  }

  onChange (name) {
    return (event) => {
      let nextValue = (event.target.value === '-1') ? undefined : event.target.value;
      this.setState({[name]: event.target.value}, () => {
        if (typeof nextValue !== 'undefined' && this.state.type && this.state.theme) {
          let {type, theme} = this.state;
          this.props.onChange({
            type: type,
            ar: typeChooser[type].ar[theme],
            en: typeChooser[type].en[theme]
          });
        } else {
          this.props.onChange(undefined);
        }
      });
    };
  }

  render () {
    let {type, theme} = this.state;

    let types = ['sds', 'sdg', 'other'].map((el) => {
      return <option key={el} value={el}>{typeDisplayMap[el]}</option>;
    });

    types.unshift(<option key={'-1'} value={'-1'}>Type</option>);

    let options = typeChooser[type];
    let themes = (typeof type === 'undefined') ? [] : options.en.map((option, i) =>
      <option key={`${type}-${i}`} value={i}>{option} - {options.ar[i]}</option>
    );
    themes.unshift(<option key={'-1'} value={'-1'}>Choose a Theme</option>);

    return <div>
      <div className="row">
        <div className="col-sm-6">
          <label>Type of Indicator *</label>
          <select className="form-control" value={type} onChange={this.onChange('type')}>
            {types}
          </select>
        </div>

        <div className="col-sm-6">
          <label>Theme *</label>
          <select className="form-control" value={theme} onChange={this.onChange('theme')}>
            {themes}
          </select>
        </div>
      </div>
    </div>;
  }
}
