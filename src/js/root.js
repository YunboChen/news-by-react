import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route} from 'react-router';
import hashHistory from 'history/createHashHistory';
import PCIndex from './components/pc_index';
import PCNewsDetail from './components/pc_news_detail';
import PCUserCenter from './components/pc_usercenter';
import MoblieIndex from './components/mobile_index';
import MobileUserCenter from './components/mobile_usercenter';
import MobileNewsDetail from './components/mobile_news_detail';
import MediaQuery from 'react-responsive';

const history = hashHistory()
export default class Root extends React.Component{
  render(){
    return(
      <div>
        <MediaQuery query='(min-device-width:1224px)'>
          <Router history={history}>
            <div>
              <Route exact path="/" component={PCIndex}/>
              <Route path="/details/:uniquekey" component={PCNewsDetail}/>
              <Route path="/usercenter" component={PCUserCenter}/>
            </div>
          </Router>
        </MediaQuery>
        <MediaQuery query='(max-device-width:1224px)'>
          <Router history={history}>
            <div>
              <Route exact path="/" component={MoblieIndex}/>
              <Route path="/details/:uniquekey" component={MobileNewsDetail}/>
              <Route path="/usercenter" component={MobileUserCenter}/>
            </div>
          </Router>
        </MediaQuery>
      </div>
    );
  };
}
ReactDOM.render(<Root />, document.getElementById('app'));
