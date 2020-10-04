import React from 'react';

import ProjectList from './ProjectList';
import IndicatorList from './IndicatorList';

class Index extends React.Component {
  render () {
    const {auth} = this.props;
    return (
      <div>
        {(auth.isInternationalEditor() || auth.isInternationalReviewer() || auth.isAdmin()) && <ProjectList auth={auth} type={'international'} limit={5} />}
        {(auth.isNationalEditor() || auth.isNationalReviewer() || auth.isAdmin()) && <ProjectList auth={auth} type={'national'} limit={5} />}
        {(auth.isIndicatorEditor() || auth.isIndicatorReviewer() || auth.isAdmin()) && < IndicatorList auth={auth} limit={5} />}
      </div>
    );
  }
}

export default Index;
