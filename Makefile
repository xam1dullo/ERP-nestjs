start:
	npm start
dev:
	npm run start:dev
build:
	npm run start:build
seed:
	npm run seed
seed-refresh:
	npm run seed:refresh
tslint:
	npm run lint:tslint
prettier:
	npm run lint:prettier
test:
	npm run test
coverage:
	npm run coverage


# Docker Commands
docker-build:
	docker-compose build

docker-up:
	docker-compose up

docker-up-detach:
	docker-compose up -d

docker-down:
	docker-compose down

docker-stop:
	docker-compose stop

docker-restart:
	docker-compose restart

docker-logs:
	docker-compose logs -f

docker-prune:
	docker system prune -a --volumes -f

# Aliases for common tasks
docker-clean-build:
	docker-compose down && docker system prune -a --volumes -f && docker-compose up --build

docker-rebuild:
	docker-compose down && docker-compose up --build
