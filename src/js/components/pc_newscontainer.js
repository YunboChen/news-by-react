import React from 'react';
import PCNewsBlock from './pc_news_block';
import PCNewsImageBlock from './pc_news_image_block';
import PCProducts from './pc_products';
import { Menu, Icon,Tabs,message,Form,Input,Button,CheckBox,Modal,Carousel,Row,Col} from 'antd';
const TabPane=Tabs.TabPane;

export default class PCNewsContainer extends React.Component{
  render(){
    const settings={
      dots:true,
      infinite:true,
      speed:500,
      slidesToShow:1,
      autoplay:true,
    };
    return(
      <div>
        <Row>
          <Col span={2}></Col>
          <Col span={20} class="container">
            <div class="leftcontainer">
              <div class="carousel">
                <Carousel {...settings}>
                  <div><img src="./src/images/carousel_1.jpg"/></div>
                  <div><img src="./src/images/carousel_2.jpg"/></div>
                  <div><img src="./src/images/carousel_3.jpg"/></div>
                  <div><img src="./src/images/carousel_4.jpg"/></div>
                </Carousel>
              </div>
              <PCNewsImageBlock count={6} type="guoji" width="400px" cardTitle="国际新闻" imageWidth="112px"/>
            </div>
            <Tabs class="tabs_news">
              <TabPane tab="新闻" key="1">
                <PCNewsBlock count={21} type="top" width="100%" bordered="false"/>
              </TabPane>
              <TabPane tab="国际" key="2">
                <PCNewsBlock count={21} type="guoji" width="100%" bordered="false"/>
              </TabPane>
            </Tabs>
            <Tabs class="tabs_product">
              <TabPane tab="ReactNews 产品" key="1">
                <PCProducts/>
              </TabPane>
            </Tabs>
            <div>
              <PCNewsImageBlock count={16} type="yule" width="100%" cardTitle="娱乐新闻" imageWidth="132px"/>
              <PCNewsImageBlock count={16} type="guonei" width="100%" cardTitle="国内新闻" imageWidth="132px"/>
            </div>
          </Col>
          <Col span={2}></Col>
        </Row>
      </div>
    );
  };
}
