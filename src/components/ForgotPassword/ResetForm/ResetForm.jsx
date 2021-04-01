/**
 * Password Recovery component.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, FormControl, Card} from '@material-ui/core';
import querystring from 'query-string';
import {withStyles} from '@material-ui/core/styles';
import styles from './MUI.css';
import {AuthService, ProfileService} from '../../../services';
import {NavigateActions, AccountActions, ModalActions} from '../../../actions';
import {ValidationUtil, GenUtil} from '../../../utility';
import {ModalTypes} from '../../../constants';

import CustomInput from '../../CustomInput';
import PasswordStrengthIndicator from '../../Register/RegisterForm/PasswordStrengthIndicator';
import {InvalidIcon} from '../../../assets/images';
import {withRouter} from 'react-router-dom';

const translate = GenUtil.translate;

class ResetForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: '',
      isPasswordInputClicked: false,
      isConfirmPasswordConfirmed: false,
      resultText: '',
      passwordErr: '',
      token: ''
    };
  }

  componentDidMount() {
    if (this.props.location.search) { // TODO: refactor use redux path
      const token = querystring.parse(this.props.location.search).token;

      if (token) {
        this.setState({
          token
        });
      }
    }
  }

  loginAndRedirect = () => {
    ProfileService.getProfile().then((profile) => {
      this.props.setAccount(profile);
      this.props.setLoggedIn(true);
      this.props.navigateToDashboard();
    }).catch((err)=>{
      if(err.status === 401) {
        this.props.setModalType(ModalTypes.ERROR);
        this.props.setModalData({
          headerText: translate('errors.loggedOut')
        });
        this.props.toggleModal();
      }
    });
  }

  handlePasswordChange = (password) => {
    this.setState({
      password: password,
      isPasswordInputClicked: true
    }, () => this.validate());
  }

  handleConfirmPasswordChange = (password) => {
    this.setState({
      confirmPassword: password,
      isConfirmPasswordConfirmed: true
    }, () => this.validate());
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (!this.state.passwordErr.success) {
      return;
    }

    AuthService.resetPassword(this.state.token, this.state.password)
      .then(() => {
        this.loginAndRedirect();
      })
      .catch((err) => {
        this.setState({
          resultText: translate('forgotPassword.resetForm.expired')
        });
        console.error(err);
      });
  };

  validate = () => {

    if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        passwordErr: translate('forgotPassword.resetForm.noMatch')
      });
    } else {
      this.setState({
        passwordErr: ValidationUtil.sePassword(this.state.password)
      });
    }
  };

  render() {
    const {classes} = this.props;
    return (
      <div className='reset'>
        <Card className='reset-card'>
          <span className='reset__title'>{translate('forgotPassword.resetForm.header')}</span>
          <span className='reset__subHeader'>{translate('forgotPassword.resetForm.subHeader')}</span>
          <form className='reset-form' onSubmit={ this.handleSubmit }>
            <FormControl className='register-input' margin='normal' required fullWidth>
              <CustomInput
                name='password'
                type='password'
                muiInputClass='inputRegister'
                hasActiveGlow={ true }
                placeholder={ translate('register.enterPassword') }
                handleChange={ this.handlePasswordChange }
                iconRightActive={ InvalidIcon }
                handleRightIconClick={ () => {
                  return  ValidationUtil.sePassword(this.state.password).errors;
                } }
                isValid={ () => {
                  if (this.state.isPasswordInputClicked) {
                    return ValidationUtil.sePassword(this.state.password).success;
                  } else {
                    return true;
                  }
                }  }
              />
              <PasswordStrengthIndicator password = { this.state.password } error={ !ValidationUtil.sePassword(this.state.password).success }/>
            </FormControl>
            <FormControl className='register-input' margin='normal' required fullWidth>
              <CustomInput
                name='confirmPassword'
                type='password'
                muiInputClass='inputRegister'
                hasActiveGlow={ true }
                placeholder={ translate('forgotPassword.resetForm.confirmPassword') }
                handleChange={ this.handleConfirmPasswordChange }
                iconRightActive={ InvalidIcon }
                handleRightIconClick={ () => {
                  return  ValidationUtil.seConfirmPassword(this.state.password, this.state.confirmPassword).errors;
                } }
                isValid={ () => {
                  if (this.state.isConfirmPasswordConfirmed) {
                    return ValidationUtil.seConfirmPassword(this.state.password, this.state.confirmPassword).success;
                  } else {
                    return true;
                  }
                }  }
              />
            </FormControl>

            <div className='reset__btn-container'>
              <Button classes={ {root: classes.button} } type='submit'
                disabled={ this.state.passwordErr.success  && this.state.isPasswordInputClicked && this.state.isConfirmPasswordConfirmed ? false : true }>
                Change Password
              </Button>
              <div className='reset-result'>
                {this.state.resultText}
              </div>
            </div>
          </form>
        </Card>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    navigateToDashboard: NavigateActions.navigateToDashboard,
    setAccount: AccountActions.setAccountAction,
    setLoggedIn: AccountActions.setIsLoggedInAction,
    setModalData: ModalActions.setModalData,
    setModalType: ModalActions.setModalType,
    toggleModal: ModalActions.toggleModal
  },
  dispatch
);

export default connect(
  null,
  mapDispatchToProps
)(withRouter(withStyles(styles)(ResetForm)));