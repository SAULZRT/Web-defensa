@echo off
REM Script de despliegue para GitHub Pages

echo.
echo ====================================
echo  Despliegue a GitHub Pages
echo ====================================
echo.

REM Verificar si Git está instalado
git --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Git no está instalado
    echo Descargalo en: https://git-scm.com/downloads
    echo O usa GitHub Desktop: https://desktop.github.com
    pause
    exit /b 1
)
echo OK: Git instalado

REM Verificar si estamos en el directorio correcto
if not exist "public\index.html" (
    echo ERROR: No estás en la carpeta del proyecto
    echo Ejecuta este script desde: C:\Users\user\Desktop\web-defensa
    pause
    exit /b 1
)
echo OK: En carpeta del proyecto

echo.
echo Configurando Git...
echo.

REM Configurar Git (pedir datos al usuario)
set /p git_name="Tu nombre completo: "
set /p git_email="Tu email: "
set /p repo_url="URL del repositorio GitHub (https://github.com/usuario/repo.git): "

git config user.name "%git_name%"
git config user.email "%git_email%"

echo.
echo Subiendo archivos a GitHub...
echo.

REM Agregar y subir archivos
git add .
git commit -m "Deploy - Sitio web DarKlinca Defense"
git remote add origin "%repo_url%" 2>nul
git push -u origin main

if errorlevel 1 (
    echo.
    echo ERROR: No se pudo subir a GitHub
    echo Posibles causas:
    echo - URL del repositorio incorrecta
    echo - No tienes permisos
    echo - Rama se llama 'master' en lugar de 'main'
    echo.
    echo Intenta manualmente:
    echo git push -u origin master
    echo.
    pause
    exit /b 1
)

echo.
echo ====================================
echo  ✅ Archivos subidos exitosamente
echo ====================================
echo.
echo Ahora activa GitHub Pages:
echo 1. Ve a tu repositorio en GitHub
echo 2. Settings → Pages
echo 3. Source: Deploy from a branch
echo 4. Branch: main → Save
echo.
echo Tu sitio estará disponible en:
echo https://TU_USUARIO.github.io/NOMBRE_REPO/
echo.
echo (Puede tardar 1-2 minutos en activarse)
echo.
pause