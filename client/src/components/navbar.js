import React from 'react';
import { Link } from 'react-router';

export default (props) => {
  return (
    <nav className="navbar navbar-inverse" style={{marginBottom: 0}}>
      <div className="container">
        <div className="navbar-header">
          <button type = "button" className = "navbar-toggle" data-toggle = "collapse" data-target = "#roman-collapsed" aria-expanded="false">
            <span className ="sr-only">Toggle navigation</span>
            <span className = "icon-bar"></span>
            <span className = "icon-bar"></span>
            <span className = "icon-bar"></span>
          </button>
          <Link to="/" className = "navbar-brand">Neighbourhood Watch</Link>
        </div>

        <div className="collapse navbar-collapse" id = "roman-collapsed">
          <ul className="nav navbar-nav navbar-right">
            <li>
              <Link to='/statistics'> Statistics </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
