import axios from "axios";
import type { PlatoData } from "../pages/VisualizarHistorial";


const PLATOS_ACTUALIZAR_API_URL = 'http://localhost:8081/platos';

export interface PlatoActualizarRequest {
    id_plato: number,
    categoria: number;
    descripcion: string;
    estado: boolean;
    imagen: string;
    nombre_plato: string;
    precio: number;
}

export interface PlatoActualizarResponse {
    status: string;
}

// Declaramos la funcion service.

export async function actualizarPlatoService(plato: PlatoActualizarRequest): Promise<PlatoActualizarResponse> {
    // Se construye el payload.
    const payload = plato;
    // Ahora mandamos la solicitud.
    const response = await axios.put<PlatoActualizarResponse>(
        PLATOS_ACTUALIZAR_API_URL,
        payload,
        {
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 10000
        }
    )

    if (response.status !== 200) {
        throw new Error(`Error del servidor: ${response.status}`);
    }

    return response.data;

}