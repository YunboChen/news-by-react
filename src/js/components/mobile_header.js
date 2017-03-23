import React from 'react';
import { Row, Col } from 'antd';
import { Menu, Icon,Tabs,message,Form,Input,Button,CheckBox,Modal} from 'antd';
const FormItem=Form.Item;
const TabPane=Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import {Link} from 'react-router-dom';
import hashHistory from 'history/createHashHistory';
const history=hashHistory();

class MobileHeader extends React.Component{
  constructor(){
    super();
    this.state={
      current:'top',
      modalVisible:false,
      action:'login',
      hasLogined:false,
      userName:'',
      userId:0,
    };
  };
  componentWillMount(){
    if(localStorage.userId!=''){
      this.setState({hasLogined:true});
      this.setState({
        userId:localStorage.userId,
        userName:localStorage.userName,
      })
    }
  }
  setModalVisibal(value){
    this.setState(
      {
        modalVisible:value,
      }
    )
  };
  handleClick(e){
    if(e.key=="register"){
      this.setState(
        {
          current:'register'
        }
      );
      this.setModalVisibal(true);
    }else{
      this.setState({current:e.key})
    }
  };
  callback(key){
    if(key==1){
      this.setState({
        action:'logon',
      })
    }else if(key==2){
        this.setState({
          action:'register',
        })
      }
  }
  logout(){
		localStorage.userid= '';
    localStorage.userName='';
		this.setState({hasLogined:false});
	};
  handleSubmit(e){
    //页面开始想API提交数据
    e.preventDefault();
    let myFetchOptions={
      method:'GET'
    };
    let formData=this.props.form.getFieldsValue();
    console.log(formData);
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action="+this.state.action
    +"&username="+formData.useName
    +"&password="+formData.password
    +"&r_userName="+formData.r_userName
    +"&r_password="+formData.r_password
    +"&r_confirmPassword="+formData.r_confirmPassword,myFetchOptions)
    .then(response=>response.json())
    .then(json=>{
      this.setState({
        userId:json.UserId,
        userName:json.UserName
      });
      localStorage.userId=json.UserId;
      localStorage.userName=json.UserName
    });
    if(this.state.action="login"){
      this.setState({hasLogined:true});
    }
    message.success("请求成功");
    this.setModalVisibal(false);
  };
  render(){
    const {getFieldDecorator}=this.props.form;
    const userShow=this.state.hasLogined?
    <Link to={`/usercenter`}>
      <Icon type="inbox"/>
    </Link>
  :
    <Icon type="setting" onClick={this.login.bind(this)}/>
    return(
      <div id="mobileheader">
        <header>
          <img src='./src/images/logo.png' alt="logo"/>
          <span>ReactNews</span>
          {userShow}
          {/*弹出框*/}
          <Modal title="用户中心" warpClassName="vertical-center-modal" visible={this.state.modalVisible}
            onCancel={()=>this.setModalVisibal(false)} onOk={()=>this.setModalVisibal(false)} okText="关闭">
            <Tabs type="card" defaultActiveKey="2">
              <TabPane tab="登录" key="1">
                <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
                  <FormItem label="账户">
                    {getFieldDecorator('userName')(
                      <Input placeholder="请输入你的账号"/>
                    )}
                  </FormItem>
                  <FormItem label="密码">
                    {getFieldDecorator('password')(
                      <Input type="password" placeholder="请输入你的密码"/>
                    )}
                  </FormItem>
                  <Button type="primary" htmlType="submit">登录</Button>
                </Form>
              </TabPane>
              <TabPane tab="注册" key="2">
                <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
                  <FormItem label="账户">
                    {getFieldDecorator('r_userName')(
                      <Input placeholder="请输入你的账号"/>
                    )}
                  </FormItem>
                  <FormItem label="密码">
                    {getFieldDecorator('r_password')(
                      <Input type="password" placeholder="请输入你的密码"/>
                    )}
                  </FormItem>
                  <FormItem label="确认密码">
                    {getFieldDecorator('r_confirmPassword')(
                      <Input type="password" placeholder="请再次输入你的密码"/>
                    )}
                  </FormItem>
                  <Button type="primary" htmlType="submit">注册</Button>
                </Form>
              </TabPane>
            </Tabs>
          </Modal>
        </header>
      </div>
    );
  };
}
export default MobileHeader=Form.create({})(MobileHeader)
