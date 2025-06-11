import { useState } from 'react';
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <>
            <div className='registro-container' style={{ backgroundImage: `url(${mesaImagen})` }}>
                <div className='registro-card'>
                    <div className='registro-logo'>
                        <img className='registro-image' src={logoImagen} />
                    </div>
                    <h1 className='registro-title'>REGISTRARSE</h1>

                    <form className='registro-form'>
                        <div className='input-group'>
                            <input
                                name='nombres'
                                placeholder='Nombres'
                                className='form-input'
                                value={formData.nombres}
                                onChange={handleChange}
                            />
                            <input
                                name='apellidos'
                                placeholder='Apellidos'
                                className='form-input'
                                value={formData.apellidos}
                                onChange={handleChange}
                            />
                            <input
                                name='direccion'
                                placeholder='Dirección'
                                className='form-input'
                                value={formData.direccion}
                                onChange={handleChange}
                            />
                            <input
                                name='telefono'
                                placeholder='Número de teléfono'
                                className='form-input'
                                value={formData.telefono}
                                onChange={handleChange}
                            />
                            <input
                                name='correo'
                                placeholder='Correo electrónico'
                                className='form-input'
                                value={formData.correo}
                                onChange={handleChange}
                            />
                            <input
                                name='fechaNacimiento'
                                placeholder='Fecha de nacimiento'
                                type='date'
                                className='form-input'
                                value={formData.fechaNacimiento}
                                onChange={handleChange}
                            />
                            <input
                                name='contrasena'
                                placeholder='Contraseña'
                                type='password'
                                className='form-input'
                                value={formData.contrasena}
                                onChange={handleChange}
                            />
                            <input
                                name='confirmarContrasena'
                                placeholder='Confirmar contraseña'
                                type='password'
                                className='form-input'
                                value={formData.confirmarContrasena}
                                onChange={handleChange}
                            />
                        </div>

                        <button className='registro-button'>
                            CREAR CUENTA
                        </button>
                    </form>
                </div>
            </div>
            <text className='copyright-registro'>
                Copyright @ 2025 SALON VERDE
            </text>
        </>
    );
}

export default RegistroUsuario;
