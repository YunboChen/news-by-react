import React from 'react';
import { Menu, Icon,Tabs,message,Form,Input,Button,CheckBox,Modal,Carousel,Row,Col,Card} from 'antd';
import {Router, Route} from 'react-router'
import {Link} from 'react-router-dom'
import hashHistory from 'history/createHashHistory';
const history = hashHistory()

export default class PCNewsBlock extends React.Component{
  constructor(){
    super();
    this.state={
      news:'',
    };
  }
  componentWillMount(){
    let myFetchOptions={
      method:'GET',
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type="+this.props.type+"&count="+this.props.count,myFetchOptions)
    .then(response=>response.json())
    .then(json=>this.setState({news:json}));
  };
  render(){
    const styleCard={
      marginBottom:"10px",
    }
    const {news}=this.state;
    const newsList=news.length?
    news.map((newsItem,index)=>(
      <li key={index}>
        <Router history={history}>
          <Link to={`details/${newsItem.uniquekey}`} target="_blank">
            {console.log(newsItem.uniquekey)}
            {newsItem.title}
          </Link>
        </Router>
      </li>
    ))
    :
    '没有加载到任何的新闻';
    return(
      <div class="topNewsList">
        <Card style={styleCard}>
          <ul>
            {newsList}
          </ul>
        </Card>
      </div>
    )
  }
}
