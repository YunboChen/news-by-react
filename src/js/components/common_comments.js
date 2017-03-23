import React from 'react';
import { Row, Col } from 'antd';
import { Menu, Icon,Tabs,message,Form,Input,Button,CheckBox,Modal,Card,notification} from 'antd';
import {Router, Route} from 'react-router';
import {Link} from 'react-router-dom';
import hashHistory from 'history/createHashHistory';
const FormItem=Form.Item;
const TabPane=Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

 class CommonComment extends React.Component{
   constructor(){
     super();
     this.state={
       comments:'',
     };
   }
   componentDidMount(){
     const myFetchOptions={
       method:'GET'
     }
     fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey="+this.props.uniquekey,myFetchOptions)
     .then(response=>response.json())
     .then(json=>{
       this.setState({comments:json});
     })
   };
   handleSubmit(e){
     e.preventDefault();
     const myFetchOptions={
       method:'GET'
     };
     const formData=this.props.form.getFieldsValue();
     console.log(formData.remark)
     fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid="+localStorage.userid+"&uniquekey="+this.props.uniquekey+"&commnet="+formData.remark,myFetchOptions)
     .then(response=>response.json())
     .then(json=>{
       this.componentDidMount();
     })
   };
   addUserCollection(){
     const myFetchOptions={
       method:'GET'
     };
     fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid="+localStorage.userid+"&uniquekey="+this.props.uniquekey,myFetchOptions)
     .then(response=>response.json())
     .then(json=>{
       //收藏成功以后
       notification['success']({message:'React News提醒',description:'收藏文章成功'})
     });
   };
   render(){
     const{getFieldDecorator}=this.props.form;
     const {comments}=this.state;
     const commentsList=comments.length?
     comments.map((comment,index)=>(
       <Card key={index} title={comment.UserName} extra={<a href="#">发表于{comment.datetime}</a>}>
         <p>{comment.Comments}</p>
       </Card>
     ))
     :
     '没有评论';
     return(
       <div class="comment">
         <Row>
           <Col span={24}>
             {commentsList}
             <Form onSubmit={this.handleSubmit.bind(this)}>
               <FormItem label="你的评论">
                 {getFieldDecorator('remark',{initialValue:''})(
                   <Input type="textarea" placeholder="随便写"/>
                 )}
               </FormItem>
               <Button type="primary" htmlType="submit">提交评论</Button>
               &nbsp;&nbsp;
               <Button type="primary" htmlType="button" onClick={this.addUserCollection.bind(this)}>收藏该新闻</Button>
             </Form>
           </Col>
         </Row>
       </div>
     );
   };
 }
export default CommonComment=Form.create({})(CommonComment);
