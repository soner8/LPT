import React, {Component} from 'react'
import {
  Sidebar
} from 'semantic-ui-react'

import './AuthPage.css'
import LoginUser from './LoginUser';

class AuthPage extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  _showSignup = () => {
    this.props.history.replace('/signup')
  }

  render() {
    return (
      <Sidebar.Pushable>
        <Sidebar
          animation='push'
          icon='labeled'
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={this.state.visible}
          width='wide'>
          <LoginUser/>
        </Sidebar>

        <Sidebar.Pusher>
          <div className='container'>
            <div className='authButtons'>
              <div>
                <h1>
                  Partagez vos instants Lunettes pour tous !
                </h1>
              </div>
              <div className='buttonsDiv'>
                <p>Vous avez déjà un compte ?
                  <span
                    onClick={() => this.setState({
                    visible: !this.state.visible
                  })}
                    className='button'>
                    Cliquez Ici !
                  </span>
                </p>

              </div>
              <div className='buttonsDiv'>
                <p>
                  Pas encore membre ? N'attendez plus,
                  <span onClick={this._showSignup} className='button'>
                    c'est par ici !
                  </span>

                </p>

              </div>
            </div>
          </div>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}

export default AuthPage;