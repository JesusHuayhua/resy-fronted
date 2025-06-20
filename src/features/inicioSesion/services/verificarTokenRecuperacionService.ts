// Servicio para verificar token de recuperación
export async function verificarTokenRecuperacion(correo: string, token: string): Promise<boolean> {
    try {
        const bodyData = { correo, token };
        console.log('Body enviado a la API:', bodyData);
        const response = await fetch('http://localhost:8080/recuperar/verificar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyData),
        });
        if (!response.ok) return false;
        const data = await response.json();
        console.log('Respuesta de la API:', data);
        return data.status === 'ok';
    } catch (error) {
        return false;
    }
}
