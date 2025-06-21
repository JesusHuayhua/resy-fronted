import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './registroUsuario.css';
import { register } from '../../services/registerService'; // Importa el servicio

// Imagenes.
import mesaImagen from '../../../../assets/imagenesLogin/tableImage.avif';
import logoImagen from '../../../../assets/imagenesLogin/logoImagen.avif';

function RegistroUsuario() {
    const [formData, setFormData] = useState({
        nombres: '',
        apellidos: '',
        direccion: '',
        telefono: '',
        correo: '',
        fechanacimiento: '', // corregido: antes era fechaNacimiento
        contrasenia: '',     // corregido: antes era contrasena
        confirmarContrasenia: '' // corregido: antes era confirmarContrasena
    });

    const [errors, setErrors] = useState({
        nombres: false,
        apellidos: false,
        direccion: false,
        telefono: false,
        correoFormato: false,
        correoDuplicado: false,
        fechanacimiento: false, // corregido
        contrasenia: false,     // corregido
        confirmarContrasenia: false // corregido
    });

    const [success, setSuccess] = useState(false);
    const [errorApi, setErrorApi] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const nombresValid = /^[a-zA-Z\s]+$/.test(formData.nombres);
        const apellidosValid = /^[a-zA-Z\s]+$/.test(formData.apellidos);
        const direccionValid = true; // Ignora validación de dirección temporalmente
        const telefonoValid = /^[0-9]{9}$/.test(formData.telefono);
        const correoFormatoValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo);
        const correoDuplicadoValid = formData.correo !== 'cuenta@gmail.com';
        const fechanacimientoValid = formData.fechanacimiento.trim() !== '' && new Date(formData.fechanacimiento) < new Date();
        const contraseniaValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(formData.contrasenia);
        const confirmarContraseniaValid = formData.contrasenia === formData.confirmarContrasenia;

        setErrors({
            nombres: !nombresValid,
            apellidos: !apellidosValid,
            direccion: false, // No mostrar error de dirección
            telefono: !telefonoValid,
            correoFormato: !correoFormatoValid,
            correoDuplicado: !correoDuplicadoValid,
            fechanacimiento: !fechanacimientoValid,
            contrasenia: !contraseniaValid,
            confirmarContrasenia: !confirmarContraseniaValid
        });

        if (
            nombresValid &&
            apellidosValid &&
            direccionValid &&
            telefonoValid &&
            correoFormatoValid &&
            correoDuplicadoValid &&
            fechanacimientoValid &&
            contraseniaValid &&
            confirmarContraseniaValid
        ) {
            try {
                setErrorApi(null);
                // Enviando como JSON (objeto plano), NO como FormData
                const payload = {
                    nombres: formData.nombres,
                    apellidos: formData.apellidos,
                    correo: formData.correo,
                    telefono: formData.telefono,
                    direccion: formData.direccion,
                    fechanacimiento: formData.fechanacimiento,
                    contrasenia: formData.contrasenia,
                    estadoacceso: true
                };
                const response = await register(payload);
                if (response.status === 1) {
                    setSuccess(true);
                } else {
                    setErrorApi('Error en el registro. Intenta nuevamente. ERROR 1');
                }
            } catch (error) {
                console.error('Error al registrar usuario:', error);
                setErrorApi('Error en el registro. Intenta nuevamente. ERROR 2');
            }
        }
    };

    const handleBackToLogin = () => {
        navigate('/login');
    };

    return (
        <>
            <div className='registro-container' style={{ backgroundImage: `url(${mesaImagen})` }}>
                <div className='registro-card'>
                    <div className='registro-logo'>
                        <img className='registro-image' src={logoImagen} />
                    </div>
                    <h1 className='registro-title'>REGISTRARSE</h1>

                    <form className='registro-form' onSubmit={handleSubmit}>
                        <div className='input-group'>
                            {errors.nombres && (
                                <p className='error-message'>Ingrese nombres válido (solo letras)</p>
                            )}
                            <input
                                name='nombres'
                                placeholder='Nombres'
                                className='form-input'
                                value={formData.nombres}
                                onChange={handleChange}
                            />
                            {errors.apellidos && (
                                <p className='error-message'>Ingrese apellidos válido (solo letras)</p>
                            )}
                            <input
                                name='apellidos'
                                placeholder='Apellidos'
                                className='form-input'
                                value={formData.apellidos}
                                onChange={handleChange}
                            />
                            {errors.direccion && (
                                <p className='error-message'>Ingrese una dirección válida</p>
                            )}
                            <input
                                name='direccion'
                                placeholder='Dirección'
                                className='form-input'
                                value={formData.direccion}
                                onChange={handleChange}
                            />
                            {errors.telefono && (
                                <p className='error-message'>Ingrese un número de teléfono válido</p>
                            )}
                            <input
                                name='telefono'
                                placeholder='Número de teléfono'
                                className='form-input'
                                value={formData.telefono}
                                onChange={handleChange}
                            />
                            {errors.correoFormato && (
                                <p className='error-message'>Ingrese un correo válido</p>
                            )}
                            {errors.correoDuplicado && (
                                <p className='error-message'>
                                    El correo ingresado ya está registrado. Porfavor, utiliza otro correo o inicia sesión</p>
                            )}
                            <input
                                name='correo'
                                placeholder='Correo electrónico'
                                className='form-input'
                                value={formData.correo}
                                onChange={handleChange}
                            />
                            {errors.fechanacimiento && (
                                <p className='error-message'>Ingrese una fecha de nacimiento válida</p>
                            )}
                            <input
                                name='fechanacimiento'
                                placeholder='Fecha de nacimiento'
                                type='date'
                                className='form-input'
                                value={formData.fechanacimiento}
                                onChange={handleChange}
                            />
                            {errors.contrasenia && (
                                <p className='error-message'>
                                    La contraseña debe tener una longitud minima de 8 caracteres e incluye números y letras
                                </p>
                            )}
                            <input
                                name='contrasenia'
                                placeholder='Contraseña'
                                type='password'
                                className='form-input'
                                value={formData.contrasenia}
                                onChange={handleChange}
                            />
                            {errors.confirmarContrasenia && (
                                <p className='error-message'>Las contraseñas deben ser iguales</p>
                            )}
                            <input
                                name='confirmarContrasenia'
                                placeholder='Confirmar contraseña'
                                type='password'
                                className='form-input'
                                value={formData.confirmarContrasenia}
                                onChange={handleChange}
                            />
                        </div>

                        <button type='submit' className='registro-button'>
                            CREAR CUENTA
                        </button>
                        {errorApi && <div className="error-message">{errorApi}</div>}
                    </form>
                </div>
            </div>
            {success && (
                <div className='popup-overlay'>
                        <div className='popup'>
                            <div className='popup-logo'>
                                <img src={logoImagen} alt="Salon Verde Logo" />
                            </div>
                            <div className='popup-check'>
                                &#10003; {/* Unicode for check symbol */}
                            </div>
                            <h2>Registro exitoso</h2>
                            <p className='popup-message'>¡Tú cuenta ha sido creada con exito!</p>
                            <button className='popup-button' onClick={handleBackToLogin}>
                                Continuar
                            </button>
                        </div>
                    </div>
            )}
        </>
    );
}

export default RegistroUsuario;
