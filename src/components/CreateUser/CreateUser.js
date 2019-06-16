import React from 'react'
import {withRouter} from 'react-router-dom'
import {graphql, compose} from 'react-apollo'
import gql from 'graphql-tag'

import './CreateUser.css'

class CreateUser extends React.Component {

  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      name: '',
      emailSubscription: false,
      counter: 0
    }
  }

  userNameField = () => {
    return (
      <div>
        <input
          className='w-100 pa3 mv2'
          value={this.state.name}
          placeholder='Un pseudonyme ?'
          onChange={(e) => this.setState({name: e.target.value})}/>
        <button
          onClick={() => this.setState({
          counter: this.state.counter + 1
        })}>Suivant</button>
      </div>

    )
  }

  userEmailField = () => {
    const {name, email, counter} = this.state;
    return (
      <div>
        <p>Merci {name}</p>
        <input
          className='w-100 pa3 mv2'
          value={email}
          placeholder='Une adresse mail ?'
          onChange={(e) => this.setState({email: e.target.value})}/>
        <button
          onClick={() => this.setState({
          counter: counter + 1
        })}>Suivant</button>
      </div>

    )
  }

  passwordField = () => {
    const {name, email, password} = this.state;

    return (
      <div>
        <p>Merci {name}</p>
        <p>Ton adresse mail est bien : {email}
          ?</p>
        <input
          className='w-100 pa3 mv2'
          value={password}
          placeholder='Un mot de passe ?'
          type='password'
          onChange={(e) => this.setState({password: e.target.value})}/>
      </div>
    )
  }

  renderFields = () => {
    const {counter} = this.state;
    if (counter === 0) {
      return this.userNameField()
    } else if (counter === 1) {
      return (this.userEmailField())
    }
    return (this.passwordField())
  }

  render() {
    if (this.props.loggedInUserQuery.loading) {
      return (
        <div>Loading</div>
      )
    }

    if (this.props.loggedInUserQuery.loggedInUser.id) {
      console.warn('Already logged in')
      this
        .props
        .history
        .replace('/')
    }

    return (
      <div className='createUserContainer'>
        <div style={{
          maxWidth: 400
        }} className='form'>
          <h1>Inscription</h1>
          {this.renderFields()}
          {this.state.name && this.state.email && this.state.password && <button className='button' onClick={this.signupUser}>Sign up</button>
}
        </div>
      </div>
    )
  }

  signupUser = async() => {
    const {email, password, name} = this.state

    try {
      const user = await this
        .props
        .signupUserMutation({
          variables: {
            email,
            password,
            name
          }
        })
      localStorage.setItem('graphcoolToken', user.data.signupUser.token)
      this
        .props
        .history
        .replace('/')
    } catch (e) {
      console.error(`An error occured: `, e)
      this
        .props
        .history
        .replace('/')
    }
  }
}

const SIGNUP_USER_MUTATION = gql `
  mutation SignupUserMutation ($email: String!, $password: String!, $name: String) {
    signupUser(email: $email, password: $password, name: $name) {
      id
      token
    }
  }
`

const LOGGED_IN_USER_QUERY = gql `
  query LoggedInUserQuery {
    loggedInUser {
      id
    }
  }
`

export default compose(graphql(SIGNUP_USER_MUTATION, {name: 'signupUserMutation'}), graphql(LOGGED_IN_USER_QUERY, {
  name: 'loggedInUserQuery',
  options: {
    fetchPolicy: 'network-only'
  }
}))(withRouter(CreateUser))