import React from 'react';
import { Menu, Icon,Tabs,message,Form,Input,Button,CheckBox,Modal,Carousel,Row,Col,Card} from 'antd';
import {Router, Route} from 'react-router'
import {Link} from 'react-router-dom'
import hashHistory from 'history/createHashHistory';
const history = hashHistory()

export default class PCNewsImageBlock extends React.Component{
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
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type="+this.props.type
    +"&count="+this.props.count,myFetchOptions)
    .then(response=>response.json())
    .then(json=>this.setState({news:json}));
  };
  render(){
    const styleImage={
      display:'block',
      width:this.props.imageWidth,
      height:'90px',
    };
    const style3={
      width:this.props.imageWidth,
      whiteSpace:'nowrap',
      overflow:'hidden',
      textOverflow:'ellipsis',
    };
    const {news}=this.state;
    const newsList=news.length?
    news.map((newsItem,index)=>(
      <div key={index} class="imageblock">
        <Router history={history}>
          <Link to={`details/${newsItem.uniquekey}`} target="_blank">
            <div class="custom-image">
              <img alt="" src={newsItem.thumbnail_pic_s} style={styleImage}/>
            </div>
            <div class="custom-card">
              <h3 style={style3}>{newsItem.title}</h3>
              <p style={style3}>{newsItem.author_name}</p>
            </div>
          </Link>
        </Router>
      </div>
    ))
    :
    '没有加载到任何的新闻';
    return(
      <div class="topNewsList">
        <Card title={this.props.cardTitle}  style={{width:this.props.width}}>
          {newsList}
        </Card>
      </div>
    )
  }
}
