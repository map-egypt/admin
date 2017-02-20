/* Add a new Dataset */
import React, {PropTypes as T} from 'react';
import IndicatorForm from './IndicatorForm';
import {Link} from 'react-router';

import { csvToJSON } from '../utils/csv';
let config = require('../config');
let apiRoot = config.api_root;

class NewIndicator extends React.Component {
  static contextTypes = {
    router: T.object
  }

  constructor (props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      formData: {}
    };
  }

  handleSubmit ({formData}) {
    const component = this;

    if (formData.data) {
      // accept mapbox ids or csv
      if (!formData.data.match(/^\w+\.\w+$/)) {
        formData.data = csvToJSON(formData.data);
      }
    }

    return this.props.auth.request(`${apiRoot}/indicators`, 'post', {
      data: JSON.stringify(formData)
    }).then(function (resp) {
      if (resp.id) {
        component.context.router.push(`/indicators/${resp.id}`);
      }
    }).fail(function (err, msg) {
      console.error('error', err, msg);
    });
  }

  handleChange (e) {
    // if we have any tabs in the data, replace them with commas
    if (e.formData.data && /\t/.test(e.formData.data)) {
      this.setState({ formData: Object.assign(e.formData,
        { data: e.formData.data.replace(/\t/g, ', ') }) });
    }
  }

  render () {
    const component = this;
    return (
      <div className="wrapper-content width-medium">
        <h1>Add a New Indicator</h1>
        <IndicatorForm onSubmit={component.handleSubmit} formData={component.state.formData} onChange={component.handleChange}>
          <Link className="btn button--base-bounded button-group" to="/">Cancel</Link>
        </IndicatorForm>
     </div>
    );
  }
}

export default NewIndicator;
