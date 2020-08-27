import React from 'react';

import ProjectList from './ProjectList';
import IndicatorList from './IndicatorList';

class Index extends React.Component {
  render () {
    const {auth} = this.props;
    return (
      <div>
        {(auth.isInternationalEditor() || auth.isAdmin()) && <ProjectList auth={auth} type={'international'} limit={5} />}
        {(auth.isDomesticEditor() || auth.isAdmin()) && <ProjectList auth={auth} type={'domestic'} limit={5} />}
        <IndicatorList auth={auth} limit={5} />
      </div>
    );
  }
}

export default Index;
