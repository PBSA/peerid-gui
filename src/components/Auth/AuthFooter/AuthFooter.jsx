import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {AuthUtil, GenUtil} from '../../../utility';
import {
  youtubeImg,
  youtubeImgBlue,
  facebookImg,
  facebookImgBlue,
  peerplaysImg,
  peerplaysImgBlue
} from '../../../assets/images';
import ModalTypes from '../../../constants/ModalTypes';
import {ModalActions} from '../../../actions';

const translate = GenUtil.translate;

// Auth footer component, contains third party auth services banner
// TODO: refactor, remove inline functions
class AuthFooter extends Component {
  state = {
    query: ''
  };

  componentDidMount() {
    this.setState({
      query: this.props.location.search
    });
  }

  render() {
    return (
      <div className='auth-footer'>
        <p className='auth-footer-title'>{translate('login.orLoginWith')}</p>
        <div className='auth-footer__icons'>
          <div className='facebook'>
            <img
              src={ facebookImgBlue }
              alt='facebook'
              onMouseOver={ (e) => (e.currentTarget.src = facebookImg) }
              onMouseOut={ (e) => (e.currentTarget.src = facebookImgBlue) }
              onClick={ () => AuthUtil.authVia('facebook', this.props.location.pathname, this.state.query) } // TODO: refactor to use redux path.
            />
          </div>
          <div className='youtube'>
            <img
              src={ youtubeImgBlue }
              alt='youtube'
              onMouseOver={ (e) => (e.currentTarget.src = youtubeImg) }
              onMouseOut={ (e) => (e.currentTarget.src = youtubeImgBlue) }
              onClick={ () => AuthUtil.authVia('google', this.props.location.pathname, this.state.query) } // TODO: refactor to use redux path.
            />
          </div>
          <div className='peerplays'>
            <img
              src={ peerplaysImgBlue }
              alt='peerplays'
              onMouseOver={ (e) => (e.currentTarget.src = peerplaysImg) }
              onMouseOut={ (e) => (e.currentTarget.src = peerplaysImgBlue) }
              onClick={ () => this.props.setModalType(ModalTypes.PEERPLAYS_LOGIN) }
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    setModalType: ModalActions.setModalType
  },
  dispatch
);

export default connect(
  null,
  mapDispatchToProps
)(withRouter(AuthFooter));
