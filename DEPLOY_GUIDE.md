# 🚀 Guía Completa: Publicar en GitHub Pages

## Paso 1: Crear cuenta en GitHub

Si no tienes cuenta:
1. Ve a [github.com](https://github.com)
2. Click "Sign up"
3. Crea cuenta gratuita
4. Verifica tu email

## Paso 2: Crear repositorio

1. Click en **"New repository"** (botón verde)
2. **Repository name:** `dar-klinca-defense` (o el nombre que quieras)
3. **Description:** "Sitio web de DarKlinca Defense - Puños de defensa personal"
4. **Visibility:** Public (para que sea accesible)
5. **NO marques** "Add a README file"
6. Click **"Create repository"**

## Paso 3: Subir tu código

### Opción A: GitHub Desktop (Más fácil)

1. **Descarga GitHub Desktop:** [desktop.github.com](https://desktop.github.com)
2. Instala y abre
3. **File → Add local repository**
4. Selecciona: `C:\Users\user\Desktop\web-defensa`
5. **Publish repository**
6. Selecciona tu cuenta de GitHub
7. Pon nombre del repo: `dar-klinca-defense`
8. Click **"Publish repository"**

### Opción B: Línea de comandos

```bash
# En PowerShell, ve a tu carpeta:
cd C:\Users\user\Desktop\web-defensa

# Configura Git (pon tu nombre y email):
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"

# Agrega archivos:
git add .

# Commit:
git commit -m "Primer commit - Sitio web DarKlinca Defense"

# Conecta con GitHub (reemplaza TU_USUARIO y NOMBRE_REPO):
git remote add origin https://github.com/TU_USUARIO/NOMBRE_REPO.git

# Sube:
git push -u origin main
```

## Paso 4: Activar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Click en **"Settings"** (engranaje)
3. En el menú izquierdo: **"Pages"**
4. En **"Source"**: selecciona **"Deploy from a branch"**
5. En **"Branch"**: selecciona **"main"** y carpeta **"/ (root)"**
6. Click **"Save"**

## Paso 5: ¡Tu sitio está vivo!

Después de 1-2 minutos, verás en la parte superior:
```
Your site is published at https://TU_USUARIO.github.io/NOMBRE_REPO/
```

**Ejemplo:** `https://johndoe.github.io/dar-klinca-defense/`

## 🎯 Características de GitHub Pages

### ✅ Gratuito
- Sin costo alguno
- Sin límites de ancho de banda
- Sin límites de visitas

### ✅ Confiable
- Hosting de Microsoft/GitHub
- 99.9% uptime
- CDN global

### ✅ Fácil de actualizar
- Sube cambios → automáticamente se actualiza
- Historial completo de versiones

### ✅ SEO Friendly
- URLs limpias
- Compatible con Google Analytics
- Meta tags funcionan

## 🔧 Configuración adicional (Opcional)

### A. Dominio personalizado
1. Compra dominio ($10-15/año en Namecheap)
2. En Settings → Pages → Custom domain
3. Agrega tu dominio
4. Configura DNS (GitHub te da las instrucciones)

### B. Google Analytics
1. Crea cuenta en [analytics.google.com](https://analytics.google.com)
2. Obtén tu Tracking ID
3. Agrega este código en `<head>` de `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🚨 Importante

### Archivos que NO subir:
- ❌ Carpeta `productos/` (imágenes originales)
- ❌ Archivos `.env` (si los tienes)
- ❌ `setup.bat` (no necesario en producción)

### Para actualizar el sitio:
1. Haz cambios en tu código local
2. `git add .`
3. `git commit -m "Descripción del cambio"`
4. `git push`
5. Espera 1-2 minutos → sitio actualizado

## 🔍 Verificar que funciona

1. Abre tu URL de GitHub Pages
2. Prueba el carrito de compras
3. Envía un mensaje de contacto (si configuraste Formspree)
4. Verifica que las imágenes cargan
5. Prueba en móvil

## 🆘 Solución de problemas

### "Page not found"
- Espera 5-10 minutos después de activar Pages
- Verifica que seleccionaste "main" branch

### Imágenes no cargan
- Verifica que las rutas sean correctas: `images/nombre.jpg`
- Asegúrate de que los archivos están en la carpeta `public/`

### Formulario no envía
- Configura Formspree si quieres emails reales
- Sin configuración, solo valida campos

## 💡 Próximos pasos

1. **Comparte tu URL** en redes sociales
2. **Agrega más productos** si quieres
3. **Configura Analytics** para ver visitas
4. **Optimiza SEO** con meta descriptions
5. **Agrega blog** si quieres más contenido

## 📞 Soporte

- **GitHub Pages docs:** [pages.github.com](https://pages.github.com)
- **GitHub Desktop:** [desktop.github.com](https://desktop.github.com)
- **Comunidad:** [github.community](https://github.community)

¿Necesitas ayuda con algún paso específico?</content>
<parameter name="filePath">c:\Users\user\Desktop\web-defensa\DEPLOY_GUIDE.md