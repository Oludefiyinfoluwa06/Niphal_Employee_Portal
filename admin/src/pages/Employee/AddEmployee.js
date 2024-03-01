import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/Employee/addemployee.css';
import Loading from '../../components/Loading';

const AddEmployee = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePic, setProfilePic] = useState();
  const [role, setRole] = useState('');
  const [bio, setBio] = useState('');
  const [department, setDepartment] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [twitter, setTwitter] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [step, setStep] = useState(1);

  const navigate = useNavigate();

  const handleNext = () => {
    if (step === 1 && (name === '' || email === '' || role === '' || bio === '')) {
      setError('Invalid input fields');
      return;
    }
    
    setStep(step + 1);
  }

  const handleAddEmployee = async e => {
    e.preventDefault();

    setIsLoading(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('profilePic', profilePic);
    formData.append('role', role);
    formData.append('bio', bio);
    formData.append('department', department);
    formData.append('facebook', facebook);
    formData.append('instagram', instagram);
    formData.append('linkedin', linkedin);
    formData.append('twitter', twitter);
    formData.append('password', password);

    try {
      await axios.post('http://localhost:5000/api/employees/add', formData);

      setIsLoading(false);
      navigate('/employees');
    } catch (error) {
      console.log(error);
      setError(error.response.data.error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }

  }

  return (
    <form className='add-employee' onSubmit={handleAddEmployee} encType='multipart/form-data'>
      <h1>Add Employee</h1>
      {error && <p className='error'>{error}</p>}
      <div className="inputs">
        {step === 1 && (
          <>
            <div className="input">
              <div className="input-box">
                <label htmlFor="name">Fullname</label>
                <input type="text" id='name' name='name' value={name} onChange={e => {
                  setName(e.target.value);
                  setError('');
                }} />
              </div>
              <div className="input-box">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name='email' value={email} onChange={e => {
                  setEmail(e.target.value);
                  setError('');
                }} />
              </div>
            </div>
            <div className="input">
              <div className="input-box">
                <label htmlFor="profilePic">Profile picture</label>
                <input type="file" id='profilePic' name='profilePic' onChange={e => {
                  setProfilePic(e.target.files[0]);
                  setError('');
                }} />
              </div>
              <div className="input-box">
                <label htmlFor="role">Job Position</label>
                <input type="text" id='role' name='role' value={role} onChange={e => {
                  setRole(e.target.value);
                  setError('');
                }} />
              </div>
            </div>
            <div className="input-box">
              <label htmlFor="bio">Add Bio</label>
              <textarea name="bio" id="bio" value={bio} onChange={e => {
                setBio(e.target.value);
                setError('');
              }}></textarea>
            </div>
            <button type='button' onClick={handleNext}>Next</button>
          </>
        )}
        {step === 2 && (
          <>
            <div className="input">
              <div className="input-box">
                <label htmlFor="department">Department</label>
                <input type="text" name='department' id='department' value={department} onChange={e => {
                  setDepartment(e.target.value);
                  setError('');
                }} />
              </div>
              <div className="input-box">
                <label htmlFor="facebook">Facebook Handle</label>
                <input type="text" id='facebook' name='facebook' value={facebook} onChange={e => {
                  setFacebook(e.target.value);
                  setError('');
                }} />
              </div>
            </div>
            <div className="input">
              <div className="input-box">
                <label htmlFor="instagram">Instagram Handle</label>
                <input type="text" id='instagram' name='instagram' value={instagram} onChange={e => {
                  setInstagram(e.target.value);
                  setError('');
                }} />
              </div>
              <div className="input-box">
                <label htmlFor="linkedin">LinkedIn Handle</label>
                <input type="text" id='linkedin' name='linkedin' value={linkedin} onChange={e => {
                  setLinkedin(e.target.value);
                  setError('');
                }} />
              </div>
            </div>
            <div className="input">
              <div className="input-box">
                <label htmlFor="twitter">Twitter Handle</label>
                <input type="text" id='twitter' name='twitter' value={twitter} onChange={e => {
                  setTwitter(e.target.value);
                  setError('');
                }} />
              </div>
              <div className="input-box">
                <label htmlFor="password">Password</label>
                <input type="password" id='password' name='password' value={password} onChange={e => {
                  setPassword(e.target.value);
                  setError('');
                }} />
              </div>
            </div>
            <button type='submit' disabled={isLoading}>{isLoading ? <Loading /> : 'Add Employee'}</button>
          </>
        )}
      </div>
    </form>
  );
}

export default AddEmployee;
