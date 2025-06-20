import { useState } from 'react';
import './recuperar.css';
import { useNavigate } from 'react-router-dom';
import { recuperarContrasenia } from '../../services/recuperarcontraseniaService';

//

// Imagenes.
import mesaImagen from '../../../../assets/imagenesLogin/tableImage.avif'
import logoImagen from '../../../../assets/imagenesLogin/logoImagen.avif'

function RecuperarContrasena(){
    // tendremos dos states.
    const [email, setEmail] = useState("");
    const navigate = useNavigate();


    // Manejan el estado de los textos.
    // Declararle lo del React.ChangeEvent pa que no se loquee.
    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handleAceptar = async () => {
        const token = await recuperarContrasenia(email);
        if (token) {
            localStorage.setItem('recuperarCorreo', email); // Guardar el correo ingresado
            navigate('/codigo');
        } else {
            alert('No se pudo recuperar el token.');
        }
    };

    const handleCancelar = () => {
        navigate('/login'); // Navigate back to the login page
    };


    return (
            <div
                className='login-container'
                style={ {backgroundImage: `url(${mesaImagen})` }}>
                <div className='login-card'>
                    <div className='login-logo'>
                        <img className='logo-image' src={logoImagen} />
                    </div>
                    <h1 className='recuperar-title'>RECUPERAR CONTRASEÑA</h1>
                    <p className='recuperar-subtitle'>Introduce tu correo electrónico para buscar tu cuenta</p>
                    {/* Se declara el from del login */}
                    <form className='login-form'>
                        <div className='input-group'>
                            <input 
                                placeholder='Correo electrónico'
                                className='form-input'
                                onChange={handleEmail}
                                value={email}
                            />
                        </div>
                        <div className='button-group'>
                            <button
                                type='button'
                                className='recuperar-button'
                                onClick={handleAceptar}>
                                ACEPTAR
                            </button>
                            <button
                                type='button'
                                className='cancel-button'
                                onClick={handleCancelar}>
                                CANCELAR
                            </button>
                        </div>
                    </form>
                </div>
                <text className='copyright'>
                    Copyright @ 2025 SALON VERDE
                </text>
            </div>
    )

}

export default RecuperarContrasena;