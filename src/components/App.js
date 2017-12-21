import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Toolbar from 'material-ui/Toolbar';
import {Tabs, Tab} from 'material-ui/Tabs';
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup';
import ToolbarTitle from 'material-ui/Toolbar/ToolbarTitle';
import ToolbarSeparator from 'material-ui/Toolbar/ToolbarSeparator';
import FlatButton from 'material-ui/FlatButton';
import ReactPlaceHolder  from 'react-placeholder/lib/ReactPlaceholder';
import Results from '../components/Results';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import SearchBar from '../components/SearchBar';
import Container from 'muicss/lib/react/container';
import FontIcon from 'material-ui/FontIcon';
import { grey900, grey50, grey400 } from 'material-ui/styles/colors';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import List from 'material-ui/List';
import ListItem from 'material-ui/List/ListItem';
import Checkbox from 'material-ui/Checkbox';
import Faker from 'faker';
import _ from 'lodash';
import Paper from 'material-ui/Paper';

const getAuthorNames = (c) => {
  return _.map(_.range(0, c), () => {
    let fname = Faker.name.firstName();
    let lname = Faker.name.lastName();
    return lname + ', ' + fname
  });
};

const getAuthorItems = (results, cb, hidden) => {
  let group = _.groupBy(results, g => g.author[0]);
  return _.map(group, (v, k) => {

    let show = false;
    _.forEach(hidden, h => {
      if (h === k) {
        return show = true;
      }
    });

    return <ListItem
      style={{ fontSize: '14px' }}
      key={Faker.random.number()}
      primaryText={k}
      leftCheckbox={
        <Checkbox
          checked={show}
          onCheck={e => cb(e, k, v, !v.hidden)}
        />}
    />
  });
};

const listStyle = {
  padding: '0px',
  fontSize: '14px'
};

const MainContent = (props) => (
  <Col xs="12" style={{marginTop: '30px'}}>
    <Paper style={{minHeight: '800px'}}>
      <Row>
        <Col xs="12">
          <Results {...props}/>
        </Col>
      </Row>
    </Paper>
  </Col>
);

const LeftPanel = ({
  results,
  onSelectAuthor,
  hidden
}) => (
  <Col xs="3">
    <Paper>
      <List>
        <ListItem style={listStyle} primaryText="Authors" nestedItems={getAuthorItems(results.results, onSelectAuthor, hidden)}/>
        <ListItem style={listStyle} primaryText="Collections" />
        <ListItem style={listStyle} primaryText="Refereed" />
        <ListItem style={listStyle} primaryText="Keywords" />
        <ListItem style={listStyle} primaryText="Publications" />
        <ListItem style={listStyle} primaryText="Bib Groups" />
        <ListItem style={listStyle} primaryText="SIMBAD Objects" />
        <ListItem style={listStyle} primaryText="Data" />
        <ListItem style={listStyle} primaryText="Vizier Tables" />
        <ListItem style={listStyle} primaryText="Grants" />
        <ListItem style={listStyle} primaryText="Publication Type" />
      </List>
    </Paper>
  </Col>
);


const ToolBar = () => (
  <Toolbar style={{
    backgroundColor: grey900,
    color: grey50
  }}>
    <ToolbarGroup>
      <FontIcon className="fa fa-rocket fa-fw" style={{ color: grey50 }} />
      <ToolbarSeparator/>
      <ToolbarTitle text="ADS" style={{ color: grey50 }} />
    </ToolbarGroup>
    <ToolbarGroup>
      <FontIcon className="fa fa-fw fa-life-ring" style={{ color: grey50 }}/>
      <ToolbarSeparator/>
      <IconMenu
        style={{ color: grey50 }}
        iconButtonElement={
          <IconButton touch={true} iconClassName="fa fa-user-circle" iconStyle={{ color: grey50 }}/>
        }
        tooltip={
          <div>Sign In</div>
        }
      >
        <MenuItem primaryText="Sign In" />
        <MenuItem primaryText="My Account" />
      </IconMenu>
    </ToolbarGroup>
  </Toolbar>
);

class AppComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 'home',
      loading: false,
      hidden: []
    }
  }

  onSelectAuthor(event, name, val, visible, arr) {
    let found = this.state.hidden.indexOf(name);
    let names = [...this.state.hidden];
    if (found < 0) {
      names = [...this.state.hidden, name];
    } else {
      names = [
        ...this.state.hidden.slice(0, found),
        ...this.state.hidden.slice(found + 1)
      ];
    }

    console.log('hidden Names: ', names);
    this.setState({
      hidden: names
    });
    return event;
  }

  changePage(page) {
    this.setState({
      page: page,
      loading: true
    }, () => {
      _.delay(() => this.setState({ loading: false }), 3000);
    });
  }

  render() {

    return (
      <MuiThemeProvider theme={getMuiTheme(darkBaseTheme)}>
        <div className="main">
          <ToolBar/>

          {this.state.page === 'home' &&
            <Container fluid={true}>
              <Row>
                <Col xs="12">
                  <SearchBar {...this.state} onClick={() => this.changePage('results')}/>
                </Col>
              </Row>
              <Row>
                <Paper style={{marginTop: 30, marginLeft: 30, marginRight: 30, padding: 30}}>
                  <Row>
                    <Col xs="4" xs-offset="1">
                      <h4>Latest News</h4>
                      <ReactPlaceHolder type="media" ready={false} rows={10}/>
                    </Col>
                    <Col xs="4" xs-offset="1">
                      <h4>Meet our team!</h4>
                      <ReactPlaceHolder type="media" ready={false} rows={10}/>
                    </Col>
                  </Row>
                </Paper>
                <Paper style={{marginTop: 30, marginLeft: 30, marginRight: 30, padding: 30}}>
                  <Row>
                    <Col xs="4" xs-offset="1">
                      <h4>ADS in the news!</h4>
                      <ReactPlaceHolder type="text" ready={false} rows={10}/>
                    </Col>
                    <Col xs="4" xs-offset="1">
                      <h4>Publications of the week</h4>
                      <ReactPlaceHolder type="text" ready={false} rows={10}/>
                    </Col>
                  </Row>
                </Paper>
              </Row>
            </Container>
          }


          {this.state.page === 'results' && !this.state.loading &&
            <Container fluid={true}>
              <Row style={{marginBottom: '30px'}}/>
              <LeftPanel {...this.state} {...this.props} onSelectAuthor={(a, b, c) => this.onSelectAuthor(a, b, c)}/>
              <Col xs="9">
                <Row>
                  <SearchBar {...this.state} onClick={() => this.changePage('results')} />
                </Row>
                <Row>
                  <MainContent {...this.state} {...this.props}/>
                </Row>
              </Col>
            </Container>
          }

          {this.state.page === 'results' && this.state.loading &&
          <Container fluid={true}>
            <Row style={{marginBottom: '30px'}}/>
            <Col xs="3">
              <Paper style={{padding: 10, height: 600, textAlign: 'center', alignContent: 'middle'}}>
                <CircularProgress size={80} thickness={5}/>
              </Paper>
            </Col>
            <Col xs="9">
              <Row>
                <SearchBar {...this.state} onClick={() => this.changePage('results')} />
              </Row>
              <Row>
                <MainContent {...this.state} {...this.props}/>
              </Row>
            </Col>
          </Container>
          }
        </div>
      </MuiThemeProvider>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
