import React, { Component, useContext } from 'react';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faHome, faInfo, faFile, faBriefcase, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { CoordenadesContext, CoordenadesContextProvider } from '../context/CoordenadesContextProvider';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSidebarCollapsed: true,
      isMobileView: false,
    };
  }

  static contextType = CoordenadesContext;  

  componentDidMount() {
    this.checkMobileView();
    window.addEventListener('resize', this.checkMobileView);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkMobileView);
  }

  checkMobileView = () => {
    this.setState({
      isMobileView: window.innerWidth < 768,
    });
  };

  handleSidebarToggle = () => {
    this.setState((prevState) => ({
      isSidebarCollapsed: !prevState.isSidebarCollapsed,
    }));
  };

  render() {
    const { isSidebarCollapsed, isMobileView } = this.state;
    const buttonIcon = isSidebarCollapsed ? faBars : faTimes;
    const {pastCoord, pastDir} = this.context;
    const currentTime = new Date();
    
    return (
      <div className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        {isSidebarCollapsed?'':<div className="sidebar-header">
          <h3>Bitacora</h3>
        </div>}
        {pastCoord &&
        pastDir.map((item, idx) => (
            <div key={idx}>
            <h3>El usuario a las: {currentTime.getHours()}:{currentTime.getMinutes()}</h3>
            <p>Se encontraba en las coordenadas:</p>
            <p>Latitud: {pastCoord.latitude[idx]}, Longitud: {pastCoord.longitude[idx]}</p>
            <p>Con la dirección: {item}</p>
            <hr />
            </div>
        ))}
        
        <div className="corner-button">
          <button
            onClick={this.handleSidebarToggle}
            className={`responsive-button ${
              isSidebarCollapsed ? 'closed' : 'open'
            }`}
          >
            <FontAwesomeIcon icon={buttonIcon} />
          </button>
        </div>
      </div>
    );
  }
}

export default Sidebar;