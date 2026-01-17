.PHONY: help up down build restart logs bash composer npm npm-dev npm-build artisan tinker migrate seed fresh

help:
	@echo "Comandos disponibles:"
	@echo "  make up              - Levantar contenedores"
	@echo "  make down            - Detener contenedores"
	@echo "  make build           - Construir imágenes"
	@echo "  make restart         - Reiniciar contenedores"
	@echo "  make logs            - Ver logs en tiempo real"
	@echo "  make bash            - Entrar a bash del contenedor app"
	@echo "  make composer        - Ejecutar composer install"
	@echo "  make npm             - Ejecutar npm install"
	@echo "  make npm-dev         - Ejecutar npm run dev"
	@echo "  make npm-build       - Ejecutar npm run build"
	@echo "  make artisan         - Ejecutar comandos artisan (ej: make artisan cmd='migrate')"
	@echo "  make tinker          - Entrar a tinker"
	@echo "  make migrate         - Ejecutar migraciones"
	@echo "  make seed            - Ejecutar seeders"
	@echo "  make fresh           - Reset DB y re-seed"

up:
	docker-compose up -d
	@echo "✓ Contenedores levantados"
	@echo "  App: http://localhost:8000"
	@echo "  Vite: http://localhost:5173"

down:
	docker-compose down
	@echo "✓ Contenedores detenidos"

build:
	docker-compose build
	@echo "✓ Imágenes construidas"

restart: down up

logs:
	docker-compose logs -f

bash:
	docker-compose exec app bash

composer:
	docker-compose run --rm app composer install

npm:
	docker-compose run --rm node npm install

npm-dev:
	docker-compose up node

npm-build:
	docker-compose run --rm node npm run build

artisan:
	docker-compose run --rm app php artisan $(cmd)

tinker:
	docker-compose exec app php artisan tinker

migrate:
	docker-compose run --rm app php artisan migrate

seed:
	docker-compose run --rm app php artisan db:seed

fresh:
	docker-compose run --rm app php artisan migrate:fresh --seed
