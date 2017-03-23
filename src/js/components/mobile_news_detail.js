import React from 'react';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import PCNewsImageBlock from './pc_news_image_block';
import CommonComments from './common_comments';
import {Row,Col,BackTop} from 'antd';

export default class MobileNewsDetail extends React.Component{
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
      <div id="mobileDetailsContainer">
        <MobileHeader/>
        <div class="ucmobileList">
          <Row>
            <Col span={24} class="container">
              <div class="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}>
              </div>
              <CommonComments uniquekey={this.props.match.params.uniquekey}/>
            </Col>
          </Row>
        </div>
        <MobileFooter/>
        <BackTop/>
      </div>
    );
  };
}
