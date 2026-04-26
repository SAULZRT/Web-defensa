@echo off
REM Script de setup para DarKlinca Defense

echo.
echo ====================================
echo  DarKlinca Defense - Setup Script
echo ====================================
echo.

REM Verificar Node.js
echo Verificando Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js no está instalado
    echo Descargalo en: https://nodejs.org/
    pause
    exit /b 1
)
echo OK: Node.js instalado

REM Ir a carpeta backend
cd backend

REM Verificar si node_modules existe
if not exist "node_modules" (
    echo.
    echo Instalando dependencias...
    call npm install
    if errorlevel 1 (
        echo ERROR: Falló la instalación de dependencias
        pause
        exit /b 1
    )
    echo OK: Dependencias instaladas
) else (
    echo OK: Dependencias ya están instaladas
)

REM Verificar .env
if not exist ".env" (
    echo.
    echo Creando archivo .env...
    copy .env.example .env
    echo OK: Archivo .env creado
    echo.
    echo ⚠️  IMPORTANTE: Abre backend\.env y agrega tus claves de Stripe:
    echo    STRIPE_SECRET_KEY=sk_test_xxxx
    echo    STRIPE_PUBLIC_KEY=pk_test_xxxx
    echo.
    pause
) else (
    echo OK: Archivo .env ya existe
)

echo.
echo ====================================
echo  ✅ Setup completado
echo ====================================
echo.
echo Para iniciar:
echo 1. Abre PowerShell aqui: cd backend y npm start
echo 2. En otra terminal: cd public y python -m http.server 8000
echo 3. Abre navegador: http://localhost:8000
echo.
pause