import { useState } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import { login as loginService } from '../../services/loginService';
import { useUser } from '../../../user/context/UserContext';

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
    const { login } = useUser();
    const [apiError, setApiError] = useState<string | null>(null);

    // Manejan el estado de los textos.
    // Declararle lo del React.ChangeEvent pa que no se loquee.
    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
    }

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleLogin = async () => {
        setApiError(null);
        setEmailError(false);
        setPasswordError(false);

        try {
            const response = await loginService(email, password);
            if (response.acceso) {
                login(response.usuario);
                navigate('/');
            } else {
                setApiError('Correo o contraseña incorrectos');
                setEmailError(true);
                setPasswordError(true);
            }
        } catch (error) {
            setApiError('Error de conexión o servidor');
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
                            {apiError && (
                                <p className='error-message'>{apiError}</p>
                            )}
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
                                type='password'
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