.PHONY: dev preview build network prod

COMPOSE_DEV=docker compose
COMPOSE_PROD=docker compose -f docker-compose.prod.yml
NETWORK=mf_network

network:
	@docker network inspect $(NETWORK) >/dev/null 2>&1 || docker network create $(NETWORK)

dev: network
	$(COMPOSE_DEV) down --remove-orphans
	$(COMPOSE_DEV) build --no-cache
	$(COMPOSE_DEV) up -d

preview:
	cd src && pnpm run build
	$(COMPOSE_DEV) down --remove-orphans
	$(COMPOSE_DEV) build --no-cache
	APP_COMMAND="pnpm run preview" $(COMPOSE_DEV) up -d

prod: network
	$(COMPOSE_PROD) down --remove-orphans
	$(COMPOSE_PROD) build --no-cache
	$(COMPOSE_PROD) up -d

build:
	cd src && pnpm run build