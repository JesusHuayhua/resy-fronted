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

src/
├── features/
│   ├── auth/
│   │   ├── pages/            # LoginPage, RegisterPage
│   │   ├── components/       # FormLogin, Logo, FooterAuth
│   │   ├── hooks/            # useLogin (useEffect para fetch)
│   │   └── services/         # login(), register() → llamadas al API
│   │
│   ├── reservas/
│   │   ├── pages/            # ReservasPage, NuevaReservaPage
│   │   ├── components/       # MesaCard, Calendario, Footer
│   │   ├── hooks/            # useFetchReservas, useCrearReserva
│   │   └── services/         # getReservas(), postReserva()
│   │
│   └── pedidos/
│       ├── pages/            # MenuPage, CarritoPage
│       ├── components/       # ItemCard, CarritoResumen, Header
│       ├── hooks/            # useFetchMenu, useAgregarAlCarrito
│       └── services/         # getMenu(), postPedido()
│
├── shared/
│   └── components/           # Header, Footer, Button, Modal, etc.
│
├── utils/                    # formateadores, validadores, helpers puros
├── router/                   # AppRouter.tsx → definición de rutas
├── App.tsx                   # Entrada de la app
└── main.tsx                    # Montaje de React
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