# LEXCODE X

Aplicacion web construida con React, React Router y Vite.

## Desarrollo local

Requiere Node.js 20.19+ o 22.12+.

```bash
npm install
npm run dev
```

Vite mostrara la URL local en la terminal (normalmente `http://localhost:5173`).

## Verificacion de produccion

```bash
npm run lint
npm run build
```

La compilacion genera los archivos estaticos en `dist/`.

## Despliegue en Vercel

1. Sube el repositorio a GitHub, GitLab o Bitbucket.
2. En Vercel, selecciona **Add New > Project** e importa el repositorio.
3. Deja el framework como **Vite** y usa estos valores si Vercel no los detecta automaticamente:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
4. Selecciona **Deploy**. Los despliegues posteriores se ejecutaran al actualizar la rama conectada.

`vercel.json` configura el fallback de las rutas de React Router para que las URL internas, como `/iniciativas`, funcionen tambien al abrirlas directamente o al recargar la pagina.

### Variables de entorno

Actualmente la aplicacion usa datos locales de ejemplo y no necesita variables para desplegarse. Si se conecta el backend, configura `VITE_API_URL` en **Project Settings > Environment Variables** con la URL publica del API para los entornos correspondientes. Las variables con prefijo `VITE_` se incluyen en el codigo del navegador; no guardes secretos en ellas.
