/**
 * Página para ingresar el código de verificación enviado al usuario para recuperar la contraseña.
 * Permite validar el código antes de permitir el cambio de contraseña.
 *
 * @component
 */

import { useState } from 'react';
import './recuperar.css';
import { useNavigate } from 'react-router-dom';
import { verificarTokenRecuperacion } from '../../services/verificarTokenRecuperacionService';

<<<<<<< Updated upstream
=======
//

// Imagenes.
import mesaImagen from '../../../../assets/imagenesLogin/tableImage.avif'
import logoImagen from '../../../../assets/imagenesLogin/logoImagen.avif';

>>>>>>> Stashed changes
/**
 * Props del componente CodigoRecuperacion.
 * @typedef {Object} CodigoRecuperacionProps
 * @property {string} email - Correo electrónico del usuario al que se le envió el código.
 * @property {(codigo: string) => void} onCodigoVerificado - Callback cuando el código es verificado correctamente.
 */

/**
 * Componente IntroduceCodigo
 * Página donde el usuario ingresa el código de verificación recibido por correo para recuperar su contraseña.
 * Utiliza hooks para manejar el estado del código y la navegación.
 * No recibe props.
 *
 * @returns {JSX.Element} Formulario para ingresar el código de recuperación.
 */
function IntroduceCodigo(){
    /**
     * Estado para almacenar el código ingresado por el usuario.
     */
    const [codigo, setCodigo] = useState("");
    /**
     * Hook de navegación de React Router.
     */
    const navigate = useNavigate();


    // Manejan el estado de los textos.
    // Declararle lo del React.ChangeEvent pa que no se loquee.
    /**
     * Maneja el envío del formulario de código de verificación.
     * Llama al servicio para verificar el código y navega según el resultado.
     * @param {React.FormEvent<HTMLFormElement>} e - Evento de envío del formulario.
     */
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
    /**
     * Actualiza el estado del código cuando el usuario escribe en el input.
     * @param {React.ChangeEvent<HTMLInputElement>} e - Evento de cambio del input.
     */
    const handleCodigo = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCodigo(e.target.value);
    }
    /**
     * Navega de regreso a la página de login si el usuario cancela.
     */
    const handleCancelar = () => {
        navigate('/login'); // Navigate back to the login page
    };


    /**
     * Hook para manejar efectos secundarios relacionados con el código de verificación.
     */

    /**
     * Renderiza el formulario de ingreso de código de verificación.
     * @returns {JSX.Element} Elemento JSX del formulario.
     */

    return (
            <div
                className='login-container'
                // style={ {backgroundImage: `url(${mesaImagen})` }}
            >
                <div className='login-card'>
                    <div className='login-logo'>
                        {/* <img className='logo-image' src={logoImagen} /> */}
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

/**
 * Exporta el componente IntroduceCodigo como default.
 */
export default IntroduceCodigo;