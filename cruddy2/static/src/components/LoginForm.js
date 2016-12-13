import React from 'react'


class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: ''};

    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeUsername(event) {
    this.setState({username: event.target.value});
  }

  handleChangePassword(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.submitLogin(this.state.username, this.state.password);
  }

  render(){
      return(
        <form action="" onSubmit={this.handleSubmit}>
          <div>
            <label>Username</label>
            <input type="text" name="username" value={this.state.username} onChange={this.handleChangeUsername}/>
          </div>
          <div>
            <label>Password</label>
            <input type="password" name="password" value={this.state.password} onChange={this.handleChangePassword}/>
          </div>
          <button type="submit" className="btn btn-default">Submit</button>
        </form>
    );
    }
  }


export default LoginForm