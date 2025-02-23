.PHONY: server
server:
	docker run --rm -p 8080:80 \
		-v $(shell pwd)/local-server/nginx.conf:/etc/nginx/nginx.conf \
		-v $(shell pwd)/docs:/usr/share/nginx/html \
		nginx
