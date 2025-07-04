import axios from "axios";

const PLATO_ELIMINAR_API_URL = 'http://localhost:8081/platos?id=';

export interface PlatoDeleteResponse {
    status: string;
    message?: string;
}

export async function eliminarPlatoService(id: number): Promise<PlatoDeleteResponse> {
    try {
        // Log para debugging
        console.log('Intentando eliminar plato con ID:', id);
        console.log('URL completa:', PLATO_ELIMINAR_API_URL + id.toString());
        
        const response = await axios.delete<PlatoDeleteResponse>(
            PLATO_ELIMINAR_API_URL + id.toString(),
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                // Timeout para evitar esperas indefinidas
                timeout: 10000
            }
        );
        
        console.log('Respuesta del servidor:', response.data);
        console.log('Status code:', response.status);
        
        return response.data;
    } catch (error) {
        console.error('Error completo al eliminar plato:', error);
        
        if (axios.isAxiosError(error)) {
            if (error.response) {
                // El servidor respondió con un código de estado de error
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
                console.error('Error response headers:', error.response.headers);
                
                throw new Error(`Error ${error.response.status}: ${error.response.data?.message || 'Error al eliminar el plato'}`);
            } else if (error.request) {
                // La petición fue hecha pero no se recibió respuesta
                console.error('No response received:', error.request);
                throw new Error('No se pudo conectar con el servidor');
            } else {
                // Algo más pasó al configurar la petición
                console.error('Request setup error:', error.message);
                throw new Error('Error en la configuración de la petición');
            }
        } else {
            console.error('Unknown error:', error);
            throw new Error('Error desconocido al eliminar el plato');
        }
    }
}