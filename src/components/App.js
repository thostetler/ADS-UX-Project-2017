import React from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Toolbar from 'material-ui/Toolbar';
import ToolbarGroup from 'material-ui/ToolbarGroup';
import ToolbarTitle from 'material-ui/ToolbarTitle';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

const defaultPaperStyle = {
  minHeight: '600px'
};

const SearchArea = () => (
  <Col xs="12" className="mui--divider-bottom" style={{ minHeight: '100px' }}>
    SEARCH
  </Col>
);

const MainContent = () => (
  <Col xs="8">
    main
  </Col>
);

const LeftPanel = () => (
  <Col xs="2">
    left
  </Col>
);

const RightPanel = () => (
  <Col xs="2">
    right
  </Col>
);

const ToolBar = () => (
  <Toolbar>
    <ToolbarGroup>
      <ToolbarTitle text="ADS" />
    </ToolbarGroup>
    <ToolbarGroup firstChild={true}>
      <DropDownMenu>
        <MenuItem value={1} primaryText="All Broadcasts" />
        <MenuItem value={2} primaryText="All Voice" />
        <MenuItem value={3} primaryText="All Text" />
        <MenuItem value={4} primaryText="Complete Voice" />
        <MenuItem value={5} primaryText="Complete Text" />
        <MenuItem value={6} primaryText="Active Voice" />
        <MenuItem value={7} primaryText="Active Text" />
      </DropDownMenu>
    </ToolbarGroup>
  </Toolbar>
);

class AppComponent extends React.Component {

  render() {
    return (
      <MuiThemeProvider theme={getMuiTheme(darkBaseTheme)}>
        <div className="main">
          <ToolBar/>
          <Container fluid={true}>
            <Row>
              <SearchArea/>
            </Row>
            <Row>
              <LeftPanel/>
              <MainContent/>
              <RightPanel/>
            </Row>
          </Container>
        </div>
      </MuiThemeProvider>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
