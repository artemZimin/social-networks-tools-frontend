image_name:=social-networks-tools-frontend-dev
container_name:=app-frontend

dev.build:
	docker build -t ${image_name} .

dev.start:
	docker run -d --rm -p 3000:3000 --network host --name ${container_name} -v .:/usr/src/app ${image_name}

dev.stop:
	docker kill ${container_name}