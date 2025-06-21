// servicioRecuperarContrasenia.ts

// Servicio para recuperar contraseña
export async function recuperarContrasenia(correo: string): Promise<string | null> {
    try {
        const response = await fetch('http://localhost:8080/recuperar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ correo }),
        });
        if (!response.ok) throw new Error('Error en la recuperación');
        const data = await response.json();
        return data.token || null;
    } catch (error) {
        return null;
    }
}
