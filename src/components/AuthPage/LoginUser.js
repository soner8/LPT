import React from 'react'
import { withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

class CreateLogin extends React.Component {
  
  state = {
    email: '',
    password: '',
  }

  render () {
    const {email, password} = this.state;
    if (!this.props.loggedInUserQuery.loggedInUser) {

      return (
        <div className='w-100 pa4 flex justify-center'>
          <div>Loading</div>
        </div>
      )
    }

    // redirect if user is logged in
    if (this.props.loggedInUserQuery.loggedInUser.id) {
      console.warn('already logged in')
      window.location.reload()    
    }

    return (
      <div className='w-100 pa4 flex justify-center'>
        <div style={{ maxWidth: 400 }} className=''>
          <h1>Login</h1>
          <input
            className='w-100 pa3 mv2'
            value={email}
            placeholder='Email'
            onChange={(e) => this.setState({email: e.target.value})}
          />
          <input
            className='w-100 pa3 mv2'
            type='password'
            value={password}
            placeholder='Password'
            onChange={(e) => this.setState({password: e.target.value})}
          />

          {email && password &&
          <button className='pa3 bg-black-10 bn dim ttu pointer' onClick={this.authenticateUser}>Log in</button>
          }
        </div>
      </div>
    )
  }

  authenticateUser = async () => {
    const {email, password} = this.state

    const response = await this.props.authenticateUserMutation({variables: {email, password}})
    localStorage.setItem('graphcoolToken', response.data.authenticateUser.token)
    window.location.reload()  
  }
}

const AUTHENTICATE_USER_MUTATION = gql`
  mutation AuthenticateUserMutation ($email: String!, $password: String!) { 
    authenticateUser(email: $email, password: $password) {
      token
    }
  }
`

const LOGGED_IN_USER_QUERY = gql`
  query LoggedInUserQuery {
    loggedInUser {
      id
    }
  }
`
export default compose(
  graphql(AUTHENTICATE_USER_MUTATION, {name: 'authenticateUserMutation'}),
  graphql(LOGGED_IN_USER_QUERY, { 
    name: 'loggedInUserQuery',
    options: { fetchPolicy: 'network-only' }
  })
)(withRouter(CreateLogin))