import { useState } from 'react';
import './login.css';

// Imagenes.
import mesaImagen from '../../assets/imagenesLogin/tableImage.avif'
import logoImagen from '../../assets/imagenesLogin/logoImagen.avif'
import { Link } from 'react-router-dom';

function Login(){
    // tendremos dos states.
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Manejan el estado de los textos.
    // Declararle lo del React.ChangeEvent pa que no se loquee.
    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e : React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    return (
            <div
                className='login-container'
                style={ {backgroundImage: `url(${mesaImagen})` }}>
                <div className='login-card'>
                    <div className='login-logo'>
                        <img className='logo-image' src={logoImagen} />
                    </div>
                    <h1 className='login-title'>INICIAR SESION</h1>
                    {/* Se declara el from del login */}
                    <form className='login-form'>
                        <div className='input-group'>
                            <input 
                                placeholder='Correo electrónico'
                                className='form-input'
                                onChange={handleEmail}
                                value={email}
                            />
                            <input 
                                placeholder='Contraseña'
                                className='form-input'
                                onChange={handlePassword}
                                value={password}
                            />
                        </div>
                        <button className='login-button'>  
                            INICIAR
                        </button>
                        <div className='login-links'>
                            <text>
                                ¿No tiene cuenta?
                                <span><Link to='#' className='help-link'> Regístrate </Link></span>
                            </text>
                            <Link to='#' className='help-link'>¿Has olvidado la contraseña?</Link>
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