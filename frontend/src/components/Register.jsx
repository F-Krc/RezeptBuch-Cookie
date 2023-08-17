import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const initialForm = { name: '', email: '', password: '' };
function Register() {
  const { createUser } = useContext(UserContext);
  const [formData, setFormData] = useState(initialForm);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('form', formData);
      createUser(formData);
      setSuccessMessage('Registration completed successfully!');
      setFormData(initialForm);
      setTimeout(() => {
        setSuccessMessage('');
      }, 4000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register-container">
      <h2>Registrieren</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        <br />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        <br />
        <label htmlFor="password">Passwort</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Senden</button>
      </form>
      <div className="register-ask-container">
        <span>Du hast schon einen Account?</span>
        <Link to="/users/login">Anmeldung</Link>
      </div>
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
}

export default Register;
