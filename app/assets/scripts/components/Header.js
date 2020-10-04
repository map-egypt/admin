import React from 'react';
import { Link } from 'react-router';

class Header extends React.Component {

  render () {
    const { logout, auth } = this.props;
    return (
      <header className='header'>
        <div className="wrapper-content">
          <nav>
            <ul>
              <li><Link to='/'> MAP Egypt Dashboard</Link></li>
              {(auth.isAdmin() || auth.isInternationalEditor() || auth.isInternationalReviewer()) && <li><Link to='projects/international' className="browse-menu__item link--deco">International Projects</Link></li>}
              {(auth.isAdmin() || auth.isNationalEditor() || auth.isNationalReviewer()) && <li><Link to='projects/national' className="browse-menu__item link--deco">National Projects</Link></li>}
              {(auth.isAdmin() || auth.isIndicatorEditor() || auth.isIndicatorReviewer()) && <li><Link to='indicators' className="browse-menu__item link--deco">Indicators</Link></li>}
            </ul>
          </nav>
          <div className='nav-log'>
            <ul>
              <li><Link onClick={logout}>Logout</Link></li>
            </ul>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
