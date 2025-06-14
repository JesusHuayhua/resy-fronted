import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './registroUsuario.css';

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
        fechaNacimiento: '',
        contrasena: '',
        confirmarContrasena: ''
    });

    const [errors, setErrors] = useState({
        nombres: false,
        apellidos: false,
        direccion: false,
        telefono: false,
        correoFormato: false,
        correoDuplicado: false,
        fechaNacimiento: false,
        contrasena: false,
        confirmarContrasena: false
    });

    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const nombresValid = /^[a-zA-Z\s]+$/.test(formData.nombres);
        const apellidosValid = /^[a-zA-Z\s]+$/.test(formData.apellidos);
        const direccionValid = formData.direccion.trim() !== '';
        const telefonoValid = /^[0-9]{9}$/.test(formData.telefono);
        const correoFormatoValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo);
        const correoDuplicadoValid = formData.correo !== 'cuenta@gmail.com';
        const fechaNacimientoValid = formData.fechaNacimiento.trim() !== '' && new Date(formData.fechaNacimiento) < new Date();
        const contrasenaValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(formData.contrasena);
        const confirmarContrasenaValid = formData.contrasena === formData.confirmarContrasena;

        setErrors({
            nombres: !nombresValid,
            apellidos: !apellidosValid,
            direccion: !direccionValid,
            telefono: !telefonoValid,
            correoFormato: !correoFormatoValid,
            correoDuplicado: !correoDuplicadoValid,
            fechaNacimiento: !fechaNacimientoValid,
            contrasena: !contrasenaValid,
            confirmarContrasena: !confirmarContrasenaValid
        });

        if (
            nombresValid &&
            apellidosValid &&
            direccionValid &&
            telefonoValid &&
            correoFormatoValid &&
            correoDuplicadoValid &&
            fechaNacimientoValid &&
            contrasenaValid &&
            confirmarContrasenaValid
        ) {
            setSuccess(true);
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
                            {errors.fechaNacimiento && (
                                <p className='error-message'>Ingrese una fecha de nacimiento válida</p>
                            )}
                            <input
                                name='fechaNacimiento'
                                placeholder='Fecha de nacimiento'
                                type='date'
                                className='form-input'
                                value={formData.fechaNacimiento}
                                onChange={handleChange}
                            />
                            {errors.contrasena && (
                                <p className='error-message'>
                                    La contraseña debe tener una longitud minima de 8 caracteres e incluye números y letras
                                </p>
                            )}
                            <input
                                name='contrasena'
                                placeholder='Contraseña'
                                type='password'
                                className='form-input'
                                value={formData.contrasena}
                                onChange={handleChange}
                            />
                            {errors.confirmarContrasena && (
                                <p className='error-message'>Las contraseñas deben ser iguales</p>
                            )}
                            <input
                                name='confirmarContrasena'
                                placeholder='Confirmar contraseña'
                                type='password'
                                className='form-input'
                                value={formData.confirmarContrasena}
                                onChange={handleChange}
                            />
                        </div>

                        <button type='submit' className='registro-button'>
                            CREAR CUENTA
                        </button>
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
