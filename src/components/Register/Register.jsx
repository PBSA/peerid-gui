import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import RegisterForm from './RegisterForm';
import AuthFooter from '../Auth/AuthFooter';
import {ModalActions, NavigateActions} from '../../actions';
import {ModalTypes} from '../../constants';
import {GenUtil} from '../../utility';

const translate = GenUtil.translate;

class Register extends Component {
  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.history.push('/dashboard');
    }
  }

  openRecoverModal = () => {
    this.props.setModalType(ModalTypes.FORGOT);
    this.props.toggleModal();
  };

  render() {
    return (
      <>
        <div className='register-page'>
          <span className='register__title'>{translate('register.createAccount')}</span>
          <span className='register__subHeader'>{translate('register.createAccountSubHeader')}</span>
          <RegisterForm navigateToLogin={ this.props.navigateToLogin } openRecoverModal = { this.openRecoverModal } />
          <AuthFooter />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({isLoggedIn: state.getIn(['account', 'isLoggedIn'])});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    toggleModal: ModalActions.toggleModal,
    setModalType: ModalActions.setModalType,
    navigateToLogin: NavigateActions.navigateToSignIn
  },
  dispatch
);


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);