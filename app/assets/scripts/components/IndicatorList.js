import React from 'react';
import { PropTypes as T } from 'prop-types';
import { Link } from 'react-router';
import moment from 'moment';

const config = require('../config');
const apiRoot = config.api_root;

class IndicatorList extends React.Component {
  static contextTypes = {
    router: T.object
  }

  componentWillMount () {
    const component = this;
    component.props.auth.request(`${apiRoot}/indicators`, 'get')
      .then(function (resp) {
        component.setState({
          list: resp
        });
      });
  }

  render () {
    const component = this;
    if (!component.state) {
      return (<div></div>);
    }
    const {list} = component.state;
    list.sort((a, b) => moment(b.created_at) - moment(a.created_at));
    const listItems = list.map((item) => {
      return (
        <tr key={item.id}>
        <td><Link to={`/indicators/${item.id}`} className="link--primary">{item.name}</Link></td>
        <td>{moment(item.updated_at).format('YYYY-MM-DD')}</td>
        <td>{moment(item.created_at).format('YYYY-MM-DD')}</td>
        <td>{item.published ? '✓' : ''}</td>
        </tr>
      );
    }).filter((item, i) => {
      // filter out items if we have a limit
      return component.props.limit ? i < component.props.limit : true;
    });

    return (
      <div className="section">
        <div className="wrapper-content">
          <h2 className="header-page-main">{ component.props.limit ? 'Recently Added ' : ''}Indicators</h2>
          <Link to='indicators/new' className="btn button--primary button-section-header button--small">Add an Indicator</Link>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Updated</th>
                <th>Created</th>
                <th>Published</th>
              </tr>
            </thead>
            <tbody>
              {listItems}
            </tbody>
          </table>
          { component.props.limit // only show view all button if we have a limit
            ? <Link to='indicators' className="link--primary">View All</Link>
            : ''
          }
        </div>
      </div>
    );
  }
}

export default IndicatorList;
