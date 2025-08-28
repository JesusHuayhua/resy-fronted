// insertarPlatoService.ts mejorado
import axios, { AxiosError } from "axios";

const PLATOS_INSERTAR_API_URL = 'http://localhost:8081/platos';

export interface PlatoRequest {
    categoria: number; // Ahora es obligatorio
    descripcion: string;
    estado: boolean;
    imagen: string;
    nombre_plato: string;
    precio: number; 
}

export interface PlatoResponse {
    status: string; // Tu backend retorna "ok" como string
}

export async function insertarPlatoService(plato: PlatoRequest): Promise<PlatoResponse> {
    try {
        // Validamos que todos los campos requeridos estén presentes
        if (!plato.nombre_plato || plato.nombre_plato.trim() === '') {
            throw new Error('El nombre del plato es obligatorio');
        }
        
        if (!plato.categoria || plato.categoria <= 0) {
            throw new Error('La categoría es obligatoria y debe ser válida');
        }
        
        if (!plato.descripcion || plato.descripcion.trim() === '') {
            throw new Error('La descripción es obligatoria');
        }
        
        if (!plato.precio || plato.precio <= 0) {
            throw new Error('El precio debe ser mayor a 0');
        }

        // Construimos el payload final
        const payload : PlatoRequest = {
            nombre_plato: plato.nombre_plato,
            categoria: plato.categoria,
            descripcion: plato.descripcion,
            precio: plato.precio,
            imagen: plato.imagen,
            estado: plato.estado
        };

        console.log('Enviando payload al servidor:', payload);

        // Realizamos la petición HTTP
        const response = await axios.post<PlatoResponse>(
            PLATOS_INSERTAR_API_URL,
            payload,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 10000 // 10 segundos de timeout
            }
        );

        // Verificamos que la respuesta sea exitosa
        if (response.status !== 200) {
            throw new Error(`Error del servidor: ${response.status}`);
        }

        return response.data;

    } catch (error) {
        // Manejo detallado de errores
        if (error instanceof AxiosError) {
            if (error.response) {
                // El servidor respondió con un error
                const errorMessage = error.response.data || 'Error desconocido del servidor';
                throw new Error(`Error del servidor (${error.response.status}): ${errorMessage}`);
            } else if (error.request) {
                // No se pudo conectar al servidor
                throw new Error('No se pudo conectar al servidor. Verifica tu conexión a internet.');
            } else {
                // Error en la configuración de la petición
                throw new Error(`Error en la petición: ${error.message}`);
            }
        } else if (error instanceof Error) {
            // Error de validación u otro error conocido
            throw error;
        } else {
            // Error desconocido
            throw new Error('Error desconocido al insertar el plato');
        }
    }
}