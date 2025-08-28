import React, { useState } from 'react';
import './ModalAgregarPlato.css';
import type { PlatoData } from '../pages/VisualizarHistorial';
import type { Categoria } from '../../../vistaMenuPlatos/services/categoriaMenuService';

interface ModalAgregarPlatoProps {
  onClose: () => void;
  onConfirm: (platoData: PlatoData) => Promise<void>; // Ahora retorna una promesa
  categorias: Categoria[] | null
}

// Definimos la interfaz para los errores de validación
interface ValidationErrors {
  nombre?: string;
  descripcion?: string;
  categoria?: string;
  precio?: string;
  imagen?: string;
}

// Definimos las reglas de validación como constantes
const VALIDATION_RULES = {
  nombre: {
    minLength: 3,
    maxLength: 50,
    pattern: /^[a-zA-ZÀ-ÿ\s\-']+$/, // Solo letras, espacios, guiones y apostrofes
  },
  descripcion: {
    minLength: 10,
    maxLength: 200,
  },
  precio: {
    min: 0.01,
    max: 999.99,
  },
  imagen: {
    maxSize: 5 * 1024 * 1024, // 5MB en bytes
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  }
};

const ModalAgregarPlato: React.FC<ModalAgregarPlatoProps> = ({ onClose, onConfirm, categorias }) => {
  // Estado para manejar los datos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    categoria: '',
    precio: 0,
    cantidadDisponible: 0,
    imagen: null as File | null
  });

  // Estado para manejar los errores de validación
  const [errors, setErrors] = useState<ValidationErrors>({});

  // Estado para controlar si el formulario ha sido enviado (para mostrar errores)
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Estados para manejar los popups de confirmación
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Función para validar el nombre
  const validateNombre = (nombre: string): string | undefined => {
    if (!nombre.trim()) {
      return 'El nombre es obligatorio';
    }
    if (nombre.trim().length < VALIDATION_RULES.nombre.minLength) {
      return `El nombre debe tener al menos ${VALIDATION_RULES.nombre.minLength} caracteres`;
    }
    if (nombre.trim().length > VALIDATION_RULES.nombre.maxLength) {
      return `El nombre no puede exceder ${VALIDATION_RULES.nombre.maxLength} caracteres`;
    }
    if (!VALIDATION_RULES.nombre.pattern.test(nombre.trim())) {
      return 'El nombre solo puede contener letras, espacios, guiones y apostrofes';
    }
    return undefined;
  };

  // Función para validar la descripción
  const validateDescripcion = (descripcion: string): string | undefined => {
    if (!descripcion.trim()) {
      return 'La descripción es obligatoria';
    }
    if (descripcion.trim().length < VALIDATION_RULES.descripcion.minLength) {
      return `La descripción debe tener al menos ${VALIDATION_RULES.descripcion.minLength} caracteres`;
    }
    if (descripcion.trim().length > VALIDATION_RULES.descripcion.maxLength) {
      return `La descripción no puede exceder ${VALIDATION_RULES.descripcion.maxLength} caracteres`;
    }
    return undefined;
  };

  // Función para validar la categoría
  const validateCategoria = (categoria: string): string | undefined => {
    if (!categoria) {
      return 'Debe seleccionar una categoría';
    }
    return undefined;
  };

  // Función para validar el precio
  const validatePrecio = (precio: number): string | undefined => {
    if (!precio) {
      return 'El precio es obligatorio';
    }
    const precioNum = precio;
    if (isNaN(precioNum)) {
      return 'El precio debe ser un número válido';
    }
    if (precioNum < VALIDATION_RULES.precio.min) {
      return `El precio debe ser mayor a $${VALIDATION_RULES.precio.min}`;
    }
    if (precioNum > VALIDATION_RULES.precio.max) {
      return `El precio no puede exceder $${VALIDATION_RULES.precio.max}`;
    }
    return undefined;
  };

  // Función para validar la imagen
  const validateImagen = (imagen: File | null): string | undefined => {
    if (!imagen) {
      return 'Debe seleccionar una imagen';
    }
    if (imagen.size > VALIDATION_RULES.imagen.maxSize) {
      return 'La imagen no puede ser mayor a 5MB';
    }
    if (!VALIDATION_RULES.imagen.allowedTypes.includes(imagen.type)) {
      return 'Solo se permiten imágenes JPG, PNG, WebP o GIF';
    }
    return undefined;
  };

  // Función principal de validación que ejecuta todas las validaciones
  const validateForm = (): ValidationErrors => {
    const newErrors: ValidationErrors = {};

    // Validamos cada campo y almacenamos los errores
    const nombreError = validateNombre(formData.nombre);
    if (nombreError) newErrors.nombre = nombreError;

    const descripcionError = validateDescripcion(formData.descripcion);
    if (descripcionError) newErrors.descripcion = descripcionError;

    const categoriaError = validateCategoria(formData.categoria);
    if (categoriaError) newErrors.categoria = categoriaError;

    const precioError = validatePrecio(formData.precio);
    if (precioError) newErrors.precio = precioError;

    const imagenError = validateImagen(formData.imagen);
    if (imagenError) newErrors.imagen = imagenError;

    return newErrors;
  };

  // Función para validar un campo específico en tiempo real
  const validateField = (fieldName: keyof ValidationErrors, value: any): string | undefined => {
    switch (fieldName) {
      case 'nombre':
        return validateNombre(value);
      case 'descripcion':
        return validateDescripcion(value);
      case 'categoria':
        return validateCategoria(value);
      case 'precio':
        return validatePrecio(value);
      case 'imagen':
        return validateImagen(value);
      default:
        return undefined;
    }
  };

  // Handler para cambios en los inputs con validación en tiempo real
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    let value: string | number = e.target.value;

    // Para los inputs numéricos:
    if (e.target.type === 'number') {
      // valueAsNumber devuelve NaN si no hay valor
      const asNumber = (e.target as HTMLInputElement).valueAsNumber;
      value = isNaN(asNumber) ? 0 : asNumber;
    }

    // Actualizamos el estado del formulario
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Si el formulario ya fue enviado, validamos el campo en tiempo real
    if (isSubmitted) {
      const fieldError = validateField(name as keyof ValidationErrors, value);
      setErrors(prev => ({
        ...prev,
        [name]: fieldError
      }));
    }
  };

  // Handler para la carga de imagen con validación
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    // Actualizamos el estado del formulario
    setFormData(prev => ({
      ...prev,
      imagen: file || null
    }));

    // Si el formulario ya fue enviado, validamos la imagen en tiempo real
    if (isSubmitted) {
      const imageError = validateImagen(file || null);
      setErrors(prev => ({
        ...prev,
        imagen: imageError
      }));
    }
  };

  // Handler para el botón "Confirmar" con validación completa
  const handleConfirmClick = () => {
    setIsSubmitted(true);

    // Ejecutamos todas las validaciones
    const validationErrors = validateForm();
    setErrors(validationErrors);

    // Si no hay errores, mostramos el popup de confirmación
    if (Object.keys(validationErrors).length === 0) {
      setShowConfirmationPopup(true);
    } else {
      // Hacemos scroll al primer error para mejorar la experiencia del usuario
      const firstErrorField = Object.keys(validationErrors)[0];
      const errorElement = document.getElementById(firstErrorField);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        errorElement.focus();
      }
    }
  };

  // Handler para confirmar la inserción después del popup de confirmación
  const handleConfirmInsertion = async () => {
    setShowConfirmationPopup(false);
    setIsProcessing(true);

    try {
      // Ahora ESPERAMOS a que la función onConfirm termine
      await onConfirm(formData);

      // Solo mostramos el popup de éxito después de que la operación haya terminado
      setShowSuccessPopup(true);

    } catch (error) {
      console.error('Error al insertar el plato:', error);

      // Manejo de errores mejorado
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido al insertar el plato';
      alert(errorMessage);

    } finally {
      setIsProcessing(false);
    }
  };

  // Handler para cancelar la confirmación
  const handleCancelConfirmation = () => {
    setShowConfirmationPopup(false);
  };

  // Handler para cerrar el popup de éxito y el modal principal
  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
    onClose();
    window.location.reload();
  };

  // Función auxiliar para obtener las clases CSS del input según si tiene error
  const getInputClassName = (fieldName: keyof ValidationErrors, baseClassName: string): string => {
    const hasError = errors[fieldName];
    return hasError ? `${baseClassName} admin-food-modal-agregar-form-input-error` : baseClassName;
  };

  // Componente del popup de confirmación
  const ConfirmationPopup = () => (
    <div className="admin-food-modal-popup-overlay">
      <div className="admin-food-modal-popup-container">
        <div className="admin-food-modal-popup-header">
          <h3>Confirmar Inserción</h3>
        </div>
        <div className="admin-food-modal-popup-content">
          <p>¿Estás seguro de que deseas insertar este plato?</p>
          <div className="admin-food-modal-popup-details">
            <strong>Nombre:</strong> {formData.nombre}<br />
            <strong>Categoría:</strong> {formData.categoria}<br />
            <strong>Precio:</strong> ${formData.precio}
          </div>
        </div>
        <div className="admin-food-modal-popup-actions">
          <button
            className="admin-food-modal-popup-btn-cancel"
            onClick={handleCancelConfirmation}
          >
            Cancelar
          </button>
          <button
            className="admin-food-modal-popup-btn-confirm"
            onClick={handleConfirmInsertion}
            disabled={isProcessing}
          >
            {isProcessing ? 'Insertando...' : 'Sí, Insertar'}
          </button>
        </div>
      </div>
    </div>
  );

  // Componente del popup de éxito
  const SuccessPopup = () => (
    <div className="admin-food-modal-popup-overlay">
      <div className="admin-food-modal-popup-container admin-food-modal-popup-success">
        <div className="admin-food-modal-popup-header">
          <div className="admin-food-modal-popup-success-icon">✓</div>
          <h3>¡Éxito!</h3>
        </div>
        <div className="admin-food-modal-popup-content">
          <p>El plato <strong>"{formData.nombre}"</strong> se ha insertado correctamente.</p>
        </div>
        <div className="admin-food-modal-popup-actions">
          <button
            className="admin-food-modal-popup-btn-success"
            onClick={handleCloseSuccessPopup}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="admin-food-modal-agregar-overlay">
      <div className="admin-food-modal-agregar-container">
        {/* Header del modal */}
        <div className="admin-food-modal-agregar-header">
          <span className="admin-food-modal-agregar-breadcrumb">Agregar Plato</span>
          <button className="admin-food-modal-agregar-close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Título principal */}
        <div className="admin-food-modal-agregar-title">
          <h2>NUEVO PLATO</h2>
          <h3>Detalles</h3>
        </div>

        {/* Formulario */}
        <div className="admin-food-modal-agregar-form">
          {/* Campo Nombre */}
          <div className="admin-food-modal-agregar-form-group">
            <label htmlFor="nombre">Nombre *</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              className={getInputClassName('nombre', 'admin-food-modal-agregar-form-input')}
              placeholder="Ej: Lomo Saltado"
            />
            {errors.nombre && (
              <span className="admin-food-modal-agregar-error-message">
                {errors.nombre}
              </span>
            )}
          </div>

          {/* Campo Descripción */}
          <div className="admin-food-modal-agregar-form-group">
            <label htmlFor="descripcion">Descripción *</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
              className={getInputClassName('descripcion', 'admin-food-modal-agregar-form-input admin-food-modal-agregar-form-textarea')}
              rows={3}
              placeholder="Describe el plato, ingredientes principales, etc."
            />
            {errors.descripcion && (
              <span className="admin-food-modal-agregar-error-message">
                {errors.descripcion}
              </span>
            )}
          </div>

          {/* Campo Categoría */}
          <div className="admin-food-modal-agregar-form-group">
            <label htmlFor="categoria">Categoría *</label>
            <div className="admin-food-modal-agregar-select-container">
              <select
                id="categoria"
                name="categoria"
                value={formData.categoria}
                onChange={handleInputChange}
                className={getInputClassName('categoria', 'admin-food-modal-agregar-form-select')}
              >
                <option value="">Seleccionar categoría</option>

                {categorias?.map(cat => {
                  return (
                    <option value={cat.Info.Nombre}>{cat.Info.Nombre}</option>
                  )
                })}
              </select>
              <span className="admin-food-modal-agregar-select-arrow">▼</span>
            </div>
            {errors.categoria && (
              <span className="admin-food-modal-agregar-error-message">
                {errors.categoria}
              </span>
            )}
          </div>

          {/* Campo Precio */}
          <div className="admin-food-modal-agregar-form-group">
            <label htmlFor="precio">Precio *</label>
            <input
              type="number"
              id="precio"
              name="precio"
              value={formData.precio}
              onChange={handleInputChange}
              className={getInputClassName('precio', 'admin-food-modal-agregar-form-input admin-food-modal-agregar-form-input-small')}
              step="0.01"
              min="0"
              placeholder="0.00"
            />
            {errors.precio && (
              <span className="admin-food-modal-agregar-error-message">
                {errors.precio}
              </span>
            )}
          </div>

          {/* Campo Imagen */}
          <div className="admin-food-modal-agregar-form-group">
            <label htmlFor="imagen">Imagen *</label>
            <input
              type="file"
              id="imagen"
              name="imagen"
              onChange={handleImageUpload}
              className={getInputClassName('imagen', 'admin-food-modal-agregar-form-input-file')}
              accept="image/jpeg,image/png,image/webp,image/gif"
            />
            {errors.imagen && (
              <span className="admin-food-modal-agregar-error-message">
                {errors.imagen}
              </span>
            )}
          </div>
        </div>

        {/* Sección de imagen del producto */}
        <div className="admin-food-modal-agregar-image-section">
          <h4>Imagen producto</h4>
          <div className="admin-food-modal-agregar-image-upload-area">
            {formData.imagen ? (
              <div className="admin-food-modal-agregar-image-preview">
                <img
                  src={URL.createObjectURL(formData.imagen)}
                  alt="Preview"
                  className="admin-food-modal-agregar-preview-image"
                />
              </div>
            ) : (
              <div className="admin-food-modal-agregar-image-placeholder">
                <div className="admin-food-modal-agregar-image-icon">📷</div>
                <p>Imagen no cargada</p>
              </div>
            )}
          </div>
        </div>

        {/* Botones de acción */}
        <div className="admin-food-modal-agregar-actions">
          <button className="admin-food-modal-agregar-btn-cancel" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="admin-food-modal-agregar-btn-confirm"
            onClick={handleConfirmClick}
            disabled={isProcessing}
          >
            {isProcessing ? 'Procesando...' : 'Confirmar'}
          </button>
        </div>
      </div>

      {/* Renderizar popups condicionalmente */}
      {showConfirmationPopup && <ConfirmationPopup />}
      {showSuccessPopup && <SuccessPopup />}
    </div>
  );
};

export default ModalAgregarPlato;