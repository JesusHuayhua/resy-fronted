// src/components/BaseScreens/PantallaBase.tsx 
// -> Indica solamente la ruta del archivo 
import React from "react";//necesario para definir componentes con JSX
import styles from "./PantallaBase.module.css";//para usar los estilos definidos en ese archivo .css
import FondoDePantalla from "../../assets/FondoPantalla.png";

//esto signfica que define los tipos de datos esperados como props (propiedades) que puede recibir el componente
interface BaseScreenProps {
  children: React.ReactNode;//esto  lo hace obligatorio, es lo que se va a renderizar dentro del componente
}
//define el componente funcional BaseScreen como un componente funcional, usando la interfaz BaseScreenProps
//se extrae los props: children y backgroundImage
export const PantallaBase: React.FC<BaseScreenProps> = ({ children }) => {
    return (
        <div className={styles.baseScreen}>
            {/* Esta es la barra de navegacion superior*/}
            <nav className={styles.navbar}>


                 {/* Esta es la seccion de la imagen*/}
                <div className={ styles.navSection + ' ' + styles.branding } >
                    <img src="src/assets/LogoEmpresa.jpg" alt="Logo de la empresa" className={styles.brandLogo}/>
                </div>

                
                <div className={styles.navSection}>NOSOTROS</div>
                
                <div className={styles.navSection}>GALERÍA</div>
                
                <div className={styles.navSection}>MENÚS</div>
              
                <div className={styles.navSection}>CONTACTO</div>
              
                <div className={styles.navSection + ' ' + styles.reservar}>RESERVAR</div>
                
                <div className={styles.navSection + ' ' +styles.iniciarSesion}>INICIAR SESIÓN</div>
            </nav>
            {/* Contenido principal del documento (<main></main>) */}
            {/* Se cargara el fondo de pantalla asignado */}
            <main 
                className={styles.mainContent} 
                
                style={{ backgroundImage: `url(${FondoDePantalla})` }}
            >
                {children}
            </main>
        </div>
    );
};