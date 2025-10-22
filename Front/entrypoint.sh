#!/bin/sh
set -e

# instala dependências só se a pasta node_modules estiver vazia
if [ ! -d "node_modules" ] || [ -z "$(ls -A node_modules)" ]; then
  echo ">> Instalando dependências..."
  npm install
fi

exec "$@"
