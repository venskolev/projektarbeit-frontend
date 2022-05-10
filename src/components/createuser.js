import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createUser, initUser } from '../redux/action-creators/users';
import { setAlert } from '../redux/action-creators/alert';
import { Loading, Alert } from './utils';
import Upload from './upload';


const CreateUser = ({
  setAlert,
  createUser,
  alertContent,
  history,
  createSuccess,
  isLoading,
  error
}) => {
  const stdSex = ['f', 'm', 'female', 'male'];

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    sex: '',
    age: '',
    jobTitle: '',
    image: '',
  });

  const { firstName, lastName, sex, age, jobTitle, image } = userData;

  const handleCreate = e => {
    e.preventDefault();
    createUser({ firstName, lastName, sex, age, jobTitle, image });
  };

  const handleChange = e => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleBack = () => {
    history.push('/');
  };

  const disableCreate = (firstName, lastName, sex, age, jobTitle, image) => {
    return !(
      firstName &&
      lastName &&
      sex &&
      age &&
      jobTitle &&
      /^[a-zA-Z]+$/.test(firstName) &&
      /^[a-zA-Z]+$/.test(lastName) &&
      stdSex.indexOf(sex.toLowerCase()) !== -1 &&
      !isNaN(age) &&
      Math.abs(parseInt(age)).toString() === age.toString() &&
      /^[a-zA-Z]+$/.test(lastName)
    );
  };

  return (
    <div>
      {createSuccess ? (
        <Redirect to='/' />
      ) : isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className='create'>Create User</div>
          <div className='container'>
            <form onSubmit={e => handleCreate(e)}>
              <small className='form-text text-muted'>
                Blank with * is reuiqred
              </small>
              <div className='form-group'>
                * First Name:{' '}
                <input
                  className='form-control'
                  name='firstName'
                  value={firstName}
                  onChange={e => handleChange(e)}
                  placeholder='firstName'
                />
                {!firstName && <Alert warning='empty' item='firstName' />}
                {firstName && !/^[a-zA-Z]+$/.test(firstName) && (
                  <Alert warning='invalid' item='firstName' />
                )}
              </div>
              <div className='form-group'>
                * Last Name:{' '}
                <input
                  className='form-control'
                  name='lastName'
                  value={lastName}
                  onChange={e => handleChange(e)}
                  placeholder='lastName'
                />
                {!lastName && <Alert warning='empty' item='lastName' />}
                {lastName && !/^[a-zA-Z]+$/.test(lastName) && (
                  <Alert warning='invalid' item='lastName' />
                )}
              </div>
              <div className='form-group'>
                * Sex:{' '}
                <input
                  className='form-control'
                  name='sex'
                  value={sex}
                  onChange={e => handleChange(e)}
                  placeholder='sex'
                />
                <small className='form-text text-muted'>
                  Valid inputs are f, m, female, or male, not case sensitive
                </small>
                {!sex && <Alert warning='empty' item='sex' />}
                {sex &&
                  ['f', 'm', 'female', 'male'].indexOf(sex.toLowerCase()) ===
                    -1 && <Alert warning='invalid' item='sex' />}
              </div>
              <div className='form-group'>
                * Age:{' '}
                <input
                  className='form-control'
                  name='age'
                  value={age}
                  onChange={e => handleChange(e)}
                  placeholder='age'
                />
                {!age && <Alert warning='empty' item='age' />}
                {age &&
                  (isNaN(age) ||
                    Math.abs(parseInt(age)).toString() !== age.toString()) && (
                    <Alert warning='invalid' item='age' />
                  )}
              </div>    
              <div className='form-group'>
                * Job Title:{' '}
                <input
                  className='form-control'
                  name='jobTitle'
                  value={jobTitle}
                  onChange={e => handleChange(e)}
                  placeholder='jobTitle'
                />
                <small className='form-text text-muted'>
                  Valid Office position
                </small>
                {!jobTitle && <Alert warning='empty' item='jobTitle' />}
                
              </div>
              <div className='form-group'>
                * Bild:{' '}
                <Upload />
                <small className='form-text text-muted'>
                JPEG, minimum resolution of 700px × 700px, maximum size 25MB
                </small>
                
              </div>
              {error && <Alert warning='server' item='create' />}
              <div className='btn-row'>
                <div className='btn-left'>
                  <button
                    className='btn btn-success'
                    // value='Submit'
                    type='submit'
                    disabled={
                      disableCreate(
                        firstName,
                        lastName,
                        sex,
                        age,
                        jobTitle
                      )
                    }
                  >
                    <i className='fas fa-arrow-down' /> Add User
                  </button>
                </div>

                <div className='btn-middle' />

                <div className='btn-right'>
                  <button className='btn btn-secondary' onClick={handleBack}>
                    <i className='fas fa-arrow-left' /> Back
                  </button>
                </div>
              </div>
            </form>
            <div className='alert-text'>{alertContent}</div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    alertContent: state.alert.alertContent,
    createSuccess: state.createUser.createSuccess,
    isLoading: state.createUser.isLoading,
    error: state.createUser.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAlert: alert => dispatch(setAlert(alert)),

    createUser: data => dispatch(createUser(data)),
    initUser: () => dispatch(initUser())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateUser);