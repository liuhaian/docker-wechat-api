### Description
Docker images with:
- docker.io/Nginx:latest
- docker.io/Node.js:slim with Express,Mongoose,Wechat-api
- docker.io/MongoDB:latest
- docker.io/BusyBox:latest

### About Path:
- ./build						Build the Nodejs and PHP images folder
- ./nginx_conf			Nginx host config files folder
- ./www_nodejs			Nodejs website files folder
- ./mongodb_data		MonboDB data folder

### About the app.js(./build/node-with-wechat-api/app.js)
* Support multi websites,example:
  * ./www_nodejs/a.com/index.js
  * ./www_nodejs/b.com/index.js
* Support hot deployment:
  * When modified the website index.js file(example:./www_nodejs/a.com/index.js), app.js will reload this file, Without rebooting node.js program

### How to use:
- $ git clone https://github.com/gzlock/docker-wechat-api.git
- $ cd ./docker-wechat-api/
- $ docker-compose up -d

### Config
- mongo-express account: admin,password: pass

### BTW
/build/php/Dockerfile come from TommyLau

### MIT License
