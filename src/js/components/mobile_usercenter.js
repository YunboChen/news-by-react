import React from 'react';
import {Row, Col} from 'antd';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import {Menu,Icon,Tabs,message,Form,Input,Button,CheckBox,Modal,Upload,Card} from 'antd';
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;
import {Router, Route} from 'react-router';
import {Link} from 'react-router-dom';
import hashHistory from 'history/createHashHistory';
const history=hashHistory();

export default class MobileUserCenter extends React.Component{
  constructor(){
    super();
    this.state={
      usercollection:'',
      usercomments:'',
      previewImage:'',
      previewVisible:false,
    };
  };
  componentDidMount(){
    const myFetchOptions={
      method:'GET'
    };
    fetch("http://newsapi.gugujiankong.com/handler.ashx?action=getuc&userid="+localStorage.userid,myFetchOptions)
    .then(response=>response.json())
    .then(json=>{
      this.setState({usercollection:json})
    });
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid="+localStorage.userid,myFetchOptions)
    .then(response=>response.json())
    .then(json=>{
      this.setState({usercomments:json})
    });
  }

  render(){

    const props={
      action:'http://newsapi.gugujiankong.com/handler.ashx',
      header:{
        "Access-Control-Allow-Origin":"*"
      },
      listType:'picture-card',
      defaultFileList:[
        {
          uid:-1,
          name:'xxx.png',
          state:'done',
          url:'http://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
          thumbUrl:'http://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png'
        }
      ],
      onPreview:(file)=>{
        this.setState({
          previewImage:file.url,
          previewVisible:true
        })
      }
    };
    const {usercollection}=this.state;
    const usercollectionList=usercollection.length?
    usercollection.map((uc,index)=>(
      <Card key={index} title={uc.uniquekey} extra={<a href={`/#/details/${uc.uniquekey}`}>查看</a>}>
        <p>{uc.Title}</p>
      </Card>
    ))
    :
    '您还没有收藏任何的新闻，快去收藏一些吧';
    const {usercomments}=this.state;
    const usercommentList=usercomments.length?
    usercomments.map((comment,index)=>(
      <Card key={index} title={`你于${comment.datetime}评论了文章${comment.uniquekey}`} extra={<a href={`/#/details/${comment.uniquekey}`}>查看</a>}>
        <p>{comment.Comments}</p>
      </Card>
    ))
    :
    '您还没有收藏任何的新闻，快去收藏一些吧';
    return(
      <div>
        <MobileHeader/>
        <Row>
          <Col span={24}>
            <Tabs>
              <TabPane tab="我的收藏列表" key="1">
                  <Row>
                    <Col span={24}>
                      {usercollectionList}
                    </Col>
                  </Row>
              </TabPane>
              <TabPane tab="我的评论列表" key="2">
                <Row>
                  <Col span={24}>
                    {usercommentList}
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="头像设置" key="3">
                <div class="clearfix">
                  <Upload {...props}>
                    <Icon type="plus"/>
                    <div class="ant-upload-text">上传照片</div>
                    <Modal visible={this.state.previewVisible} footer={null}
                      onCancel={this.handleCancel}>
                      <img alt="预览" src={this.state.previewImage}/>
                    </Modal>
                  </Upload>
                </div>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
        <MobileFooter/>
      </div>
    );
  };
}
