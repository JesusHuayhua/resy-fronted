import { useState } from 'react';
import './recuperar.css';
import { useNavigate } from 'react-router-dom';

//

// Imagenes.
import mesaImagen from '../../../../assets/imagenesLogin/tableImage.avif'
import logoImagen from '../../../../assets/imagenesLogin/logoImagen.avif'

function CambiarContrasena(){
    // tendremos dos states.
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();


    // Manejan el estado de los textos.
    // Declararle lo del React.ChangeEvent pa que no se loquee.
    const handleNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.target.value);
    }

    const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    }

    const handleAceptar = () => {
        if (newPassword === confirmPassword) {
            setShowPopup(true); // Show the popup
        } else {
            alert('Las contraseñas no coinciden');
        }
    };

    const closePopup = () => {
        setShowPopup(false);
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
                    <h1 className='recuperar-title'>CAMBIAR CONTRASEÑA</h1>
                    <p className='recuperar-subtitle'>Una contraseña segura ayuda a evitar el acceso no autorizado a la cuenta de correo electrónico</p>
                    {/* Se declara el from del login */}
                    <form className='login-form'>
                        <div className='input-group'>
                            <input 
                                type='password'
                                placeholder='Contraseña Nueva'
                                className='form-input'
                                onChange={handleNewPassword}
                                value={newPassword}
                            />
                            <input
                                type='password'
                                placeholder='Confirmar Contraseña Nueva'
                                className='form-input'
                                onChange={handleConfirmPassword}
                                value={confirmPassword}
                            />
                        </div>
                        <div className='button-group'>
                            <button
                                type='button'
                                className='recuperar-button'
                                onClick={handleAceptar}>
                                ACEPTAR
                            </button>
                        </div>
                    </form>
                </div>
                {showPopup && (
                    <div className='popup-overlay'>
                        <div className='popup'>
                            <div className='popup-logo'>
                                <img src={logoImagen} alt="Salon Verde Logo" />
                            </div>
                            <div className='popup-check'>
                                &#10003; {/* Unicode for check symbol */}
                            </div>
                            <h2>Actualización exitosa</h2>
                            <p className='popup-message'>Cambio de contraseña realizado correctamente</p>
                            <button className='popup-button' onClick={closePopup}>
                                Volver
                            </button>
                        </div>
                    </div>
                )}
                <text className='copyright'>
                    Copyright @ 2025 SALON VERDE
                </text>
            </div>
    )

}

export default CambiarContrasena;