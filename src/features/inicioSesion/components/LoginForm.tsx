import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../user/context/UserContext';
import { login as loginService } from '../services/loginService';

interface LoginFormStyles {
  form: React.CSSProperties;
  inputGroup: React.CSSProperties;
  label: React.CSSProperties;
  input: React.CSSProperties;
  button: React.CSSProperties;
}

const LoginForm: React.FC = () => {
  const [correo, setCorreo] = useState<string>('');
  const [contrasenia, setContrasenia] = useState<string>('');
  const navigate = useNavigate();
  const { login } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginService(correo, contrasenia);
      if (response.acceso) {
        login(response.usuario);
        navigate('/');
      } else {
        // manejar error de acceso
      }
    } catch (err) {
      // manejar error
    }
  };

  const styles: LoginFormStyles = {
    form: {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '400px',
      margin: '0 auto',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      backgroundColor: 'white',
    },

    inputGroup: {
      marginBottom: '15px',
    },

    label: {
      marginBottom: '5px',
      fontWeight: '500',
      color: '#333',
    },

    input: {
      width: '100%',
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      fontSize: '16px',
      color: '#333',
    },

    button: {
      padding: '10px',
      borderRadius: '4px',
      border: 'none',
      backgroundColor: '#007bff',
      color: 'white',
      fontSize: '16px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
  };

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <div style={styles.inputGroup}>
        <label style={styles.label} htmlFor="correo">Correo Electrónico</label>
        <input
          style={styles.input}
          type="email"
          id="correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label} htmlFor="contrasenia">Contraseña</label>
        <input
          style={styles.input}
          type="password"
          id="contrasenia"
          value={contrasenia}
          onChange={(e) => setContrasenia(e.target.value)}
          required
        />
      </div>

      <button style={styles.button} type="submit">
        Iniciar Sesión
      </button>
    </form>
  );
};

export default LoginForm;