### Description
Docker images with:
- docker.io/Nginx:latest
- docker.io/PHP:5.6.12-fpm with MongoDB,gd,ldap,mbstring,mcrypt,mysql,mysqli,pdo_mysql,zip extensions.
- docker.io/Node.js:latest with Express,Mongoose,Body-parser,Cookie-parser
- docker.io/MongoDB:latest
- docker.io/MySQL:latest
- docker.io/BusyBox:latest

### About Path:
- ./build						Build the Nodejs and PHP images folder
- ./nginx_conf			Nginx host config files folder
- ./www_php					PHP website files folder
- ./www_nodejs			Nodejs website files folder
- ./mysql_data			MySQL data folder
- ./mongodb_data		MonboDB data folder

### About the app.js(./build/nodejs/app.js)
* Support multi websites,example:
  * ./www_nodejs/a.com/index.js
  * ./www_nodejs/b.com/index.js
* Support hot deployment:
  * When modified the website index.js file(example:./www_nodejs/a.com/index.js), app.js will reload this file, Without rebooting node.js program

### How to use:
- $ git clone https://github.com/gzlock/docker-web-server.git
- $ cd ./docker-web-server/
- $ docker-compose up -d

### Config
- mysql root password: DROWSSAP
- mongo-express account: admin,password: pass

### BTW
/build/php/Dockerfile come from TommyLau

### MIT License
