#!/bin/sh
echo "Aplicando migraciones..."
flask db upgrade

echo "Iniciando servidor..."
exec gunicorn --timeout 150 --bind 0.0.0.0:5000 app.main:app