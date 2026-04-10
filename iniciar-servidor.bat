@echo off
title Realizzare App — Servidor Local
color 0A

echo.
echo  ============================================
echo   REALIZZARE APP — Iniciando servidor local
echo  ============================================
echo.
echo  Acesse em: http://localhost:8081
echo  Pressione Ctrl+C para parar o servidor.
echo.

cd /d "%~dp0"
npx expo start --web --clear

pause
