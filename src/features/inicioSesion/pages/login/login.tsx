import { useState } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';

//

// Imagenes.
import mesaImagen from '../../../../assets/imagenesLogin/tableImage.avif'
import logoImagen from '../../../../assets/imagenesLogin/logoImagen.avif'

function Login(){
    // tendremos dos states.
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const navigate = useNavigate();


    // Manejan el estado de los textos.
    // Declararle lo del React.ChangeEvent pa que no se loquee.
    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
    }

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleLogin = () => {
        const isEmailValid = email === 'cuenta@gmail.com';
        const isPasswordValid = password === '123';

        setEmailError(!isEmailValid);
        setPasswordError(!isPasswordValid);

        if (!isEmailValid || !isPasswordValid) {
            navigate('/login'); // Reload the same page
        } else {
            // Proceed with login logic
        }
    };

    return (
            <div
                className='login-container'
                style={ {backgroundImage: `url(${mesaImagen})` }}>
                <div className='login-card'>
                    <div className='login-logo'>
                        <img className='logo-image' src={logoImagen} />
                    </div>
                    <h1 className='login-title'>INICIAR SESIÓN</h1>
                    {/* Se declara el from del login */}
                    <form className='login-form'>
                        <div className='input-group'>
                            {emailError && (
                                <p className='error-message'>Ingrese correctamente su correo electrónico</p>
                            )}
                            <input 
                                placeholder='Correo electrónico'
                                className='form-input'
                                onChange={handleEmail}
                                value={email}
                            />
                            {passwordError && (
                                <p className='error-message'>Contraseña incorrecta</p>
                            )}
                            <input 
                                placeholder='Contraseña'
                                className='form-input'
                                onChange={handlePassword}
                                value={password}
                            />
                        </div>
                        <button
                            type='button'
                            className='login-button'
                            onClick={handleLogin}>
                            INICIAR
                        </button>
                        <div className='login-links'>
                            <text>
                                ¿No tiene cuenta?
                                <span>
                                    <Link to='/registroUsuario' className='help-link'> Regístrate </Link>
                                </span>
                            </text>
                            <Link to='/recuperarContrasena' className='help-link'>¿Has olvidado la contraseña?</Link>
                        </div>
                    </form>
                </div>
                <text className='copyright'>
                    Copyright @ 2025 SALON VERDE
                </text>
            </div>
    )

}

export default Login;