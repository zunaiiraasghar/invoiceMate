@echo off
title InvoiceMate SaaS
cd /d "%~dp0"
if not exist ".venv\Scripts\python.exe" (
  echo Creating virtual environment...
  python -m venv .venv
)
call ".venv\Scripts\activate.bat"
echo Installing required packages...
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
if errorlevel 1 (
  echo.
  echo Package installation failed. Check your internet connection and Python installation.
  pause
  exit /b 1
)
if "%OPENAI_API_KEY%"=="" (
  echo.
  echo No OPENAI_API_KEY found. The app will use its offline helper.
  echo To enable AI, set OPENAI_API_KEY in this terminal before running this file.
)
echo.
echo Starting InvoiceMate at http://127.0.0.1:5000
python app.py
pause
