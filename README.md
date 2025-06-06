# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```
//holaaa
You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

## Estructura de carpetas

```lua
resi-backend/
├── public/                     # Archivos estáticos públicos (index.html, favicon, assets)
│   └── index.html
│   └── vite.svg (o logo.svg)
├── src/                        # Código fuente de la aplicación
│   ├── assets/                 # Imágenes, iconos, fuentes, etc.
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   ├── components/             # Componentes React reutilizables y atómicos (botones, tarjetas)
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   └── Button.module.css (o .tailwind.css si usas CSS Modules con Tailwind)
│   │   ├── Card/
│   │   │   ├── Card.tsx
│   │   │   └── index.ts        # Para exportar el componente
│   │   └── common/             # Componentes muy genéricos (ej. Loader, Modal)
│   │       ├── Loader.tsx
│   │       └── Modal.tsx
│   ├── constants/              # Constantes de la aplicación (rutas API, textos, etc.)
│   │   └── api.ts
│   │   └── app.ts
│   ├── hooks/                  # Custom Hooks de React para lógica reutilizable
│   │   ├── useAuth.ts
│   │   └── useDebounce.ts
│   ├── layouts/                # Estructuras de página reutilizables (Header, Footer, Navbar)
│   │   ├── MainLayout.tsx
│   │   └── AuthLayout.tsx
│   ├── pages/                  # Componentes que representan una página completa
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── ProductsPage.tsx
│   │   ├── UsersPage/
│   │   │   ├── UsersPage.tsx
│   │   │   └── UsersPage.module.css
│   │   └── NotFoundPage.tsx
│   ├── services/               # Lógica para interactuar con tu backend (llamadas a la API)
│   │   ├── authService.ts      # Maneja autenticación
│   │   ├── userService.ts      # Consume el servicio de usuarios del backend
│   │   ├── productService.ts   # Consume el servicio de productos del backend
│   │   └── apiClient.ts        # Cliente HTTP base (ej. Axios instance)
│   ├── store/                  # Gestión de estado global (ej. Redux Toolkit, Zustand, Context API)
│   │   ├── index.ts            # Configuración del store
│   │   ├── authSlice.ts        # Slices o módulos para el estado de autenticación
│   │   └── productSlice.ts     # Slices o módulos para el estado de productos
│   ├── styles/                 # Archivos CSS globales y configuración de Tailwind
│   │   ├── index.css           # El archivo principal para Tailwind y CSS base
│   │   └── variables.css       # Si usas variables CSS personalizadas
│   ├── types/                  # Definiciones de tipos TypeScript globales
│   │   ├── auth.d.ts
│   │   ├── user.d.ts
│   │   └── product.d.ts
│   │   └── global.d.ts
│   ├── utils/                  # Funciones de utilidad diversas (formateo, validación)
│   │   ├── helpers.ts
│   │   └── validators.ts
│   ├── App.tsx                 # Componente raíz de la aplicación (manejo de rutas)
│   ├── main.tsx                # Punto de entrada de la aplicación (renderiza App.tsx)
│   └── vite-env.d.ts           # Tipos de entorno de Vite (generado automáticamente)
├── .env                        # Variables de entorno
├── .env.development
├── .env.production
├── .eslintrc.cjs               # Configuración de ESLint para linting
├── .gitignore                  # Archivos y directorios a ignorar por Git
├── package.json                # Dependencias del proyecto y scripts de npm
├── pnpm-lock.yaml (o package-lock.json o yarn.lock) # Bloqueo de dependencias
├── postcss.config.js           # Configuración de PostCSS (necesario para Tailwind)
├── tailwind.config.js          # Configuración de Tailwind CSS
├── tsconfig.json               # Configuración de TypeScript
├── tsconfig.node.json          # Configuración de TypeScript para el entorno Node.js
└── vite.config.ts              # Configuración de Vite
```
