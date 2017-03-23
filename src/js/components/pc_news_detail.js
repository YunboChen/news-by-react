import React from 'react';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PCNewsImageBlock from './pc_news_image_block';
import CommonComments from './common_comments';
import {Row,Col,BackTop} from 'antd';

export default class PCNewsDetail extends React.Component{
  constructor(){
    super();
    this.state={
      news:'',
    };
  };
  componentDidMount(){
    const match=this.props.match;
    const myFetchOptions={
      method:'GET'
    }
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey="+match.params.uniquekey,myFetchOptions)
    .then(response=>response.json())
    .then(json=>{
      this.setState({news:json});
      document.title=this.state.news.title+"-React News | React 驱动的新闻平台";
    })
  };
  createMarkup(){
    return{__html:this.state.news.pagecontent};
  }
  render(){
    return(
      <div>
        <PCHeader/>
        <Row>
          <Col span={2}></Col>
          <Col span={14} class="container">
            <div class="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}>
            </div>
            <CommonComments uniquekey={this.props.match.params.uniquekey}/>
          </Col>
          <Col span={6}>
            <PCNewsImageBlock count={40} type="top" width="100%" cardTitle="相关新闻" imageWidth="150px"/>
          </Col>
          <Col span={2}></Col>
        </Row>
        <PCFooter/>
        <BackTop/>
      </div>
    );
  };
}
