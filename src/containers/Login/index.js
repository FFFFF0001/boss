import React, { Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Logo from '../../components/Logo';
import { List, InputItem, WingBlank, WhiteSpace,Button } from 'antd-mobile';
import {login} from '../../actions'
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'; 

@connect(
  state=>state.user,
  {
    login
  }
)
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.register = this.register.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  state = {
    user:'',
    pwd:''
  }
  register(){
      this.props.history.push('/register');
  }
  handleChange(key,val){
    this.setState({   
        [key]:val
    })
  }
  handleLogin(){
    this.props.login(this.state)
  }
  render() {
    const avatar = this.props.avatar //登录之前头像信息是否存在，存在会影响util下的路径判断
    const redirect = this.props.redirectTo
    const path = avatar?`${redirect}info`:redirect
    return (
      <div>
        {redirect?<Redirect to={redirect} />:null}
        <Logo />
        <h2>登录页面</h2>
        <WingBlank>
            <List>
               {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
                <InputItem
                  onChange={v=>this.handleChange('user',v)}
                >用户</InputItem>
                <WhiteSpace />
                <InputItem
                  type='password'
                  onChange={v=>this.handleChange('pwd',v)}
                >密码</InputItem>
            </List>
            <Button type='primary'
              onClick={this.handleLogin}
            >登录</Button>
            <WhiteSpace />
            <Button onClick={this.register} type='primary'>注册</Button>
        </WingBlank>
      </div>
    )
  }
}