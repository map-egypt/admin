/* Add a new Dataset */
import React, {PropTypes as T} from 'react';
import IndicatorForm from './IndicatorForm';
import {Link} from 'react-router';

let config = require('../config');
let apiRoot = config.api_root;

class NewIndicator extends React.Component {
  static contextTypes = {
    router: T.object
  }

  constructor (props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit ({formData}) {
    const component = this;
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

  render () {
    const component = this;
    return (
      <div className="wrapper-content width-medium">
        <h1>Add a New Indicator</h1>
        <IndicatorForm onSubmit={component.handleSubmit}>
          <Link className="btn button--base-bounded button-group" to="/">Cancel</Link>
        </IndicatorForm>
     </div>
    );
  }
}

export default NewIndicator;
