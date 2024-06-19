import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
/* import Map from './Map';
 */import Dinasty from './dinasty';

function Tabsw({ observations }) {
  return (
    <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="profile" title="Home">
        <Dinasty/>
      </Tab>
      <Tab eventKey="Map" title="Mapa">
       {/*  <Map marker={observations} /> */}
      </Tab>
     {/*  <Tab eventKey="contact" title="Contact" disabled>
        Tab content for Contact
      </Tab> */}
    </Tabs>
  );
}

export default Tabsw;