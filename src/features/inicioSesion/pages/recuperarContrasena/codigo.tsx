import { useState } from 'react';
import './recuperar.css';
import { useNavigate } from 'react-router-dom';
import { verificarTokenRecuperacion } from '../../services/verificarTokenRecuperacionService';

//

// Imagenes.
import mesaImagen from '../../../../assets/imagenesLogin/tableImage.avif'
import logoImagen from '../../../../assets/imagenesLogin/logoImagen.avif'

function IntroduceCodigo(){
    // tendremos dos states.
    const [codigo, setCodigo] = useState("");
    const navigate = useNavigate();


    // Manejan el estado de los textos.
    // Declararle lo del React.ChangeEvent pa que no se loquee.
const handleAceptar = async (e: React.FormEvent) => {
        e.preventDefault();
        const correo = localStorage.getItem('recuperarCorreo') || '';
        const ok = await verificarTokenRecuperacion(correo, codigo);
        if (ok) {
            navigate('/cambiar');
        } else {
            alert('Código incorrecto o expirado.');
        }
    };

    const handleCodigo = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCodigo(e.target.value);
    }

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
                    <h1 className='recuperar-title'>INTRODUCE CODIGO</h1>
                    <p className='recuperar-subtitle'>Compruebe si has recibido en el correo electrónico un mensaje con tu código</p>
                    {/* Se declara el from del login */}
                    <form className='login-form'>
                        <div className='input-group'>
                            <input 
                                placeholder='Introduce Código'
                                className='form-input'
                                onChange={handleCodigo}
                                value={codigo}
                            />
                        </div>
                        <div className='button-group'>
                            <button className='recuperar-button'
                                type='submit'
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

export default IntroduceCodigo;