import React, { useState, useEffect } from 'react';
import './ModalAgregarPlato.css'; // Your CSS file
import type { PlatoData } from '../pages/VisualizarHistorial';
import type { Categoria } from '../../../vistaMenuPlatos/services/categoriaMenuService';
import type { Plato } from '../../../vistaMenuPlatos/services/platosCatalogoService';

interface ModalEditarPlatoProps {
  onClose: () => void;
  onConfirm: (platoData: PlatoData) => Promise<void>;
  onEliminar: (platoId: number) => Promise<void>; // Nueva prop para eliminar
  categorias: Categoria[] | null;
  platoAEditar: Plato;
}

// Validation error interface for type safety
interface ValidationErrors {
  nombre?: string;
  descripcion?: string;
  categoria?: string;
  precio?: string;
  imagen?: string;
  estado?: string;
}

// Validation rules - centralized for maintainability
const VALIDATION_RULES = {
  nombre: {
    minLength: 3,
    maxLength: 50,
    pattern: /^[a-zA-ZÀ-ÿ\s\-']+$/, // Letters, spaces, hyphens, apostrophes
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
    maxSize: 5 * 1024 * 1024, // 5MB limit
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  }
};

const ModalEditarPlato: React.FC<ModalEditarPlatoProps> = ({
  onClose,
  onConfirm,
  onEliminar, // Nueva prop
  categorias,
  platoAEditar
}) => {
  // Form data state - initialized with existing dish data
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    categoria: '',
    precio: 0,
    estado: false,
    imagen: null as File | null
  });

  // Error tracking for validation feedback
  const [errors, setErrors] = useState<ValidationErrors>({});

  // Form submission state for conditional validation display
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Popup control states for user confirmation flow
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Estados para la funcionalidad de eliminación
  const [showDeleteConfirmationPopup, setShowDeleteConfirmationPopup] = useState(false);
  const [showDeleteSuccessPopup, setShowDeleteSuccessPopup] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Track if user has selected a new image
  const [imagenCambiada, setImagenCambiada] = useState(false);

  // Initialize form with existing dish data when component mounts
  useEffect(() => {
    if (platoAEditar && categorias) {
      // Find category name by matching ID
      const categoriaEncontrada = categorias.find(cat =>
        cat.IDCategoria === platoAEditar.Info.Categoria
      );

      // Populate form with existing dish information
      setFormData({
        nombre: platoAEditar.Info.NombrePlato || '',
        descripcion: platoAEditar.Info.Descripcion || '',
        categoria: categoriaEncontrada?.Info.Nombre || '',
        estado: platoAEditar.Info.Estado,
        precio: platoAEditar.Info.Precio || 0,
        imagen: null // Existing image handled separately
      });
    }
  }, [platoAEditar, categorias]);

  // Individual field validation functions with detailed error messages
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

  const validateCategoria = (categoria: string): string | undefined => {
    if (!categoria) {
      return 'Debe seleccionar una categoría';
    }
    return undefined;
  };

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

  // Image validation - more flexible for editing existing dishes
  const validateImagen = (imagen: File | null): string | undefined => {
    // Image is optional if dish already has an image
    if (!imagen && !platoAEditar.Info.Imagen) {
      return 'Debe seleccionar una imagen';
    }

    // Validate new image if user selected one
    if (imagen) {
      if (imagen.size > VALIDATION_RULES.imagen.maxSize) {
        return 'La imagen no puede ser mayor a 5MB';
      }
      if (!VALIDATION_RULES.imagen.allowedTypes.includes(imagen.type)) {
        return 'Solo se permiten imágenes JPG, PNG, WebP o GIF';
      }
    }

    return undefined;
  };

  // Comprehensive form validation that returns all errors
  const validateForm = (): ValidationErrors => {
    const newErrors: ValidationErrors = {};

    // Run all validation functions and collect errors
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

  // Real-time field validation for immediate feedback
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    let value: string | number | boolean = e.target.value;

    // Special handling for numeric inputs
    if (e.target.type === 'number') {
      const asNumber = (e.target as HTMLInputElement).valueAsNumber;
      value = isNaN(asNumber) ? 0 : asNumber;
    }

    // Special handling for estado field
    if (name === 'estado') {
      value = e.target.value === 'activo';
    }

    // Update form state
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate field in real-time if form has been submitted
    if (isSubmitted) {
      const fieldError = validateField(name as keyof ValidationErrors, value);
      setErrors(prev => ({
        ...prev,
        [name]: fieldError
      }));
    }
  };

  // Handle image upload with validation
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    // Update form state with new image
    setFormData(prev => ({
      ...prev,
      imagen: file || null
    }));

    // Mark that image has been changed
    setImagenCambiada(true);

    // Validate image in real-time if form has been submitted
    if (isSubmitted) {
      const imageError = validateImagen(file || null);
      setErrors(prev => ({
        ...prev,
        imagen: imageError
      }));
    }
  };

  // Handle form submission with comprehensive validation
  const handleConfirmClick = () => {
    setIsSubmitted(true);

    // Validate entire form
    const validationErrors = validateForm();
    setErrors(validationErrors);

    // If no errors, show confirmation popup
    if (Object.keys(validationErrors).length === 0) {
      setShowConfirmationPopup(true);
    } else {
      // Scroll to first error for better UX
      const firstErrorField = Object.keys(validationErrors)[0];
      const errorElement = document.getElementById(firstErrorField);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        errorElement.focus();
      }
    }
  };

  // Si usas la versión alternativa de PlatoData, usa esta versión:
const handleConfirmEdition = async () => {
    setShowConfirmationPopup(false);
    setIsProcessing(true);

    try {
        // Buscar la categoría por nombre para obtener el ID
        const categoriaEncontrada = categorias?.find(cat =>
            cat.Info.Nombre === formData.categoria
        );

        if (!categoriaEncontrada) {
            throw new Error(`No se encontró la categoría "${formData.categoria}"`);
        }

        // Construir el objeto PlatoData con tipos consistentes
        const plato: PlatoData = {
            id_plato: platoAEditar.IDPlato,
            nombre: formData.nombre,
            descripcion: formData.descripcion,
            categoria: formData.categoria,                      // Nombre string
            categoria_id: categoriaEncontrada.IDCategoria,      // ID numérico
            precio: formData.precio,
            imagen: formData.imagen,
            estado: formData.estado
        };

        await onConfirm(plato);

        // Mostrar popup de éxito después de actualización exitosa
        setShowSuccessPopup(true);

    } catch (error) {
        console.error('Error al editar el plato:', error);

        // Manejo de errores mejorado con feedback al usuario
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido al editar el plato';
        alert(errorMessage);

    } finally {
        setIsProcessing(false);
    }
};

  // Handle confirmation cancellation
  const handleCancelConfirmation = () => {
    setShowConfirmationPopup(false);
  };

  // Handle success popup closure and modal cleanup
  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
    onClose();
    window.location.reload(); // Refresh to show changes
  };

  // Funciones para manejar la eliminación del plato
  const handleDeleteClick = () => {
    setShowDeleteConfirmationPopup(true);
  };

  const handleConfirmDelete = async () => {
    setShowDeleteConfirmationPopup(false);
    setIsDeleting(true);

    try {
      // Llamar a la función de eliminación proporcionada por el componente padre
      await onEliminar(platoAEditar.IDPlato);

      // Mostrar popup de éxito después de eliminar exitosamente
      setShowDeleteSuccessPopup(true);

    } catch (error) {
      console.error('Error al eliminar el plato:', error);

      // Manejo de errores mejorado con feedback al usuario
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido al eliminar el plato';
      alert(errorMessage);

    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmationPopup(false);
  };

  const handleCloseDeleteSuccessPopup = () => {
    setShowDeleteSuccessPopup(false);
    onClose();
    window.location.reload(); // Refrescar para mostrar los cambios
  };

  // Helper function to get CSS classes with error state
  const getInputClassName = (fieldName: keyof ValidationErrors, baseClassName: string): string => {
    const hasError = errors[fieldName];
    return hasError ? `${baseClassName} admin-food-modal-agregar-form-input-error` : baseClassName;
  };

  // Get image URL for preview (new image or existing image)
  const getImageUrl = (): string | null => {
    if (formData.imagen) {
      // Show newly uploaded image
      return URL.createObjectURL(formData.imagen);
    } else if (platoAEditar.Info.Imagen) {
      // Show existing image
      return platoAEditar.Info.Imagen;
    }
    return null;
  };

  // Confirmation popup component for editing
  const ConfirmationPopup = () => (
    <div className="admin-food-modal-popup-overlay">
      <div className="admin-food-modal-popup-container">
        <div className="admin-food-modal-popup-header">
          <h3>Confirmar Edición</h3>
        </div>
        <div className="admin-food-modal-popup-content">
          <p>¿Estás seguro de que deseas guardar los cambios en este plato?</p>
          <div className="admin-food-modal-popup-details">
            <strong>Nombre:</strong> {formData.nombre}<br />
            <strong>Categoría:</strong> {formData.categoria}<br />
            <strong>Precio:</strong> ${formData.precio}<br />
            {imagenCambiada && <em>* La imagen será actualizada</em>}
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
            onClick={handleConfirmEdition}
            disabled={isProcessing}
          >
            {isProcessing ? 'Guardando...' : 'Sí, Guardar'}
          </button>
        </div>
      </div>
    </div>
  );

  // Success popup component for editing
  const SuccessPopup = () => (
    <div className="admin-food-modal-popup-overlay">
      <div className="admin-food-modal-popup-container admin-food-modal-popup-success">
        <div className="admin-food-modal-popup-header">
          <div className="admin-food-modal-popup-success-icon">✓</div>
          <h3>¡Éxito!</h3>
        </div>
        <div className="admin-food-modal-popup-content">
          <p>El plato <strong>"{formData.nombre}"</strong> se ha editado correctamente.</p>
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

  // Popup de confirmación para eliminar
  const DeleteConfirmationPopup = () => (
    <div className="admin-food-modal-popup-overlay">
      <div className="admin-food-modal-popup-container admin-food-modal-popup-delete">
        <div className="admin-food-modal-popup-header">
          <h3>Confirmar Eliminación</h3>
        </div>
        <div className="admin-food-modal-popup-content">
          <p>¿Estás seguro de que deseas eliminar este plato?</p>
          <div className="admin-food-modal-popup-details">
            <strong>Plato:</strong> {formData.nombre}<br />
            <strong>Categoría:</strong> {formData.categoria}<br />
            <strong>Precio:</strong> ${formData.precio}
          </div>
          <div className="admin-food-modal-popup-warning">
            <p><strong>⚠️ Atención:</strong> Esta acción no se puede deshacer.</p>
          </div>
        </div>
        <div className="admin-food-modal-popup-actions">
          <button
            className="admin-food-modal-popup-btn-cancel"
            onClick={handleCancelDelete}
          >
            Cancelar
          </button>
          <button
            className="admin-food-modal-popup-btn-delete"
            onClick={handleConfirmDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Eliminando...' : 'Sí, Eliminar'}
          </button>
        </div>
      </div>
    </div>
  );

  // Popup de éxito para eliminar
  const DeleteSuccessPopup = () => (
    <div className="admin-food-modal-popup-overlay">
      <div className="admin-food-modal-popup-container admin-food-modal-popup-success">
        <div className="admin-food-modal-popup-header">
          <div className="admin-food-modal-popup-success-icon">✓</div>
          <h3>¡Plato Eliminado!</h3>
        </div>
        <div className="admin-food-modal-popup-content">
          <p>El plato <strong>"{formData.nombre}"</strong> ha sido eliminado exitosamente.</p>
        </div>
        <div className="admin-food-modal-popup-actions">
          <button
            className="admin-food-modal-popup-btn-success"
            onClick={handleCloseDeleteSuccessPopup}
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
        {/* Modal Header with breadcrumb and close button */}
        <div className="admin-food-modal-agregar-header">
          <span className="admin-food-modal-agregar-breadcrumb">Editar Plato</span>
          <button className="admin-food-modal-agregar-close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Main title section */}
        <div className="admin-food-modal-agregar-title">
          <h2>EDITAR PLATO</h2>
          <h3>Modificar Detalles</h3>
        </div>

        {/* Form section with all input fields */}
        <div className="admin-food-modal-agregar-form">
          {/* Dish Name Field */}
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

          {/* Description Field */}
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

          {/* Category Selection Field */}
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
                {categorias?.map(cat => (
                  <option key={cat.IDCategoria} value={cat.Info.Nombre}>
                    {cat.Info.Nombre}
                  </option>
                ))}
              </select>
              <span className="admin-food-modal-agregar-select-arrow">▼</span>
            </div>
            {errors.categoria && (
              <span className="admin-food-modal-agregar-error-message">
                {errors.categoria}
              </span>
            )}
          </div>
          {/* Campo de estado */}
          <div className="admin-food-modal-agregar-form-group">
            <label htmlFor="estado">Estado *</label>
            <div className="admin-food-modal-agregar-select-container">
              <select
                id="estado"
                name="estado"
                value={formData.estado ? "activo" : "inactivo"}
                onChange={handleInputChange}
                className={getInputClassName('estado', 'admin-food-modal-agregar-form-select')}
              >
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
              <span className="admin-food-modal-agregar-select-arrow">▼</span>
            </div>
            {errors.estado && (
              <span className="admin-food-modal-agregar-error-message">
                {errors.estado}
              </span>
            )}
          </div>

          {/* Price Field */}
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

          {/* Image Upload Field */}
          <div className="admin-food-modal-agregar-form-group">
            <label htmlFor="imagen">Imagen {!platoAEditar.Info.Imagen && '*'}</label>
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
            {!imagenCambiada && platoAEditar.Info.Imagen && (
              <div className="admin-food-modal-agregar-current-image-note">
                <small>* Imagen actual se mantendrá si no seleccionas una nueva</small>
              </div>
            )}
          </div>
        </div>

        {/* Image Preview Section */}
        <div className="admin-food-modal-agregar-image-section">
          <h4>Imagen producto</h4>
          <div className="admin-food-modal-agregar-image-upload-area">
            {getImageUrl() ? (
              <div className="admin-food-modal-agregar-image-preview">
                <img
                  src={getImageUrl()!}
                  alt="Preview"
                  className="admin-food-modal-agregar-preview-image"
                />
                {imagenCambiada && (
                  <div className="admin-food-modal-agregar-image-changed-indicator">
                    <span>Nueva imagen seleccionada</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="admin-food-modal-agregar-image-placeholder">
                <div className="admin-food-modal-agregar-image-icon">📷</div>
                <p>Imagen no disponible</p>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="admin-food-modal-agregar-actions">
          <button
            className="admin-food-modal-agregar-btn-cancel"
            onClick={handleDeleteClick}
            disabled={isDeleting}
          >
            {isDeleting ? 'Eliminando...' : 'Eliminar'}
          </button>
          <button
            className="admin-food-modal-agregar-btn-confirm"
            onClick={handleConfirmClick}
            disabled={isProcessing}
          >
            {isProcessing ? 'Procesando...' : 'Guardar Cambios'}
          </button>
        </div>
      </div>

      {/* Conditional popup rendering */}
      {showConfirmationPopup && <ConfirmationPopup />}
      {showSuccessPopup && <SuccessPopup />}
      {showDeleteConfirmationPopup && <DeleteConfirmationPopup />}
      {showDeleteSuccessPopup && <DeleteSuccessPopup />}
    </div>
  );
};

export default ModalEditarPlato;