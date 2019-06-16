import React from 'react'
import {graphql} from 'react-apollo'
import {withRouter} from 'react-router-dom'
import {Icon, Sidebar} from 'semantic-ui-react'
import gql from 'graphql-tag'

import ListPage from './Posts/ListPage'
import NewPostLink from './Posts/NewPostLink'
import AuthPage from './AuthPage/AuthPage';
import LoaderComponent from './Loader/Loader'
import './App.css'

class App extends React.Component {
  state = {
    visible: false
  }
  _logout = () => {
    // remove token from local storage and reload page to reset apollo client
    localStorage.removeItem('graphcoolToken')
    window
      .location
      .reload()
  }

  _isLoggedIn = () => {
    return this.props.loggedInUserQuery.loggedInUser && this.props.loggedInUserQuery.loggedInUser.id !== null
  }

  render() {

    if (this.props.loggedInUserQuery.loading) {
      return <LoaderComponent/>
    }
    if (this._isLoggedIn()) {
      return this.renderLoggedIn()
    } else {
      return this.renderLoggedOut()
    }
  }

  renderLoggedIn() {
    return (
      <div>
        <Icon
          className='settingsIcon'
          onClick={() => this.setState({
          visible: !this.state.visible
        })}
          name='settings'
          size='big'/>
        <NewPostLink/>
        <Sidebar.Pushable>
          <Sidebar
            animation='push'
            icon='labeled'
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={this.state.visible}
            width='wide'>
            <div className='userInfos'>
              <p>
                Username: {this.props.loggedInUserQuery.loggedInUser.name}
              </p>
              <p>
                Email: {this.props.loggedInUserQuery.loggedInUser.email}
              </p>
              <div className='pv3'>
                <span className='dib bg-red white pa3 pointer dim' onClick={this._logout}>
                  Logout
                </span>
              </div>
            </div>
          </Sidebar>
          <Sidebar.Pusher>
            <div className='listGrid'>
              <ListPage />
            </div>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }

  renderLoggedOut() {
    return <AuthPage {...this.props}/>
  }
}

const LOGGED_IN_USER_QUERY = gql `
  query LoggedInUserQuery {
    loggedInUser {
      id
      name
      email
    }
  }
`

export default graphql(LOGGED_IN_USER_QUERY, {
  name: 'loggedInUserQuery',
  options: {
    fetchPolicy: 'network-only'
  }
})(withRouter(App))
