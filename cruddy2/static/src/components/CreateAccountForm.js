import React from 'react'


class CreateAccountForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: ''};

    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.handleChangeLastName = this.handleChangeLastName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChangeFirstName(event) {
    this.setState({firstname: event.target.value});
  }
  handleChangeLastName(event) {
    this.setState({lastname: event.target.value});
  }

  handleChangeUsername(event) {
    this.setState({username: event.target.value});
  }

  handleChangePassword(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.submitCreateAccount(this.state.firstname, this.state.lastname, this.state.username, this.state.password);
  }

  render(){
      return(
        <form action="" onSubmit={this.handleSubmit}>
        <div>
            <label>First Name</label>
            <input type="text" name="firstname" value={this.state.firstname} onChange={this.handleChangeFirstName}/>
          </div>
          <div>
            <label>Last Name</label>
            <input type="text" name="lastname" value={this.state.lastname} onChange={this.handleChangeLastName}/>
          </div>
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


export default CreateAccountForm