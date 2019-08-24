# vue-sample-element

[![Build Status](https://travis-ci.org/Thirosue/vue-sample-element.svg?branch=master)](https://travis-ci.org/Thirosue/vue-sample-element)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> A Vue.js use Element sample

## Required

* Docker
* Chrome (for e2e)

## BackEnd

### Run BackEnd API

```
$ docker-compose -f backend-compose.yml up -d
```

### Stop BackEnd API

```
$ docker-compose -f backend-compose.yml down
```

### Swagger

http://localhost:18081/admin/swagger-ui.html

### 接続先情報

* テストユーザ

```
sample@sample.com / password
```

* db

```
$ docker exec -ti sample-db /bin/bash
root@sample-db:/# mysql -h localhost -P 3306 -uroot -ppassw0rd sample
```

## FrontEnd

### Project setup
```
yarn
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Run your end-to-end tests
```
yarn test:e2e
```

### Run your unit tests
```
yarn test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## All

### Run All

```
$ docker-compose up -d
$ docker ps
CONTAINER ID        IMAGE                                   COMMAND                  CREATED             STATUS              PORTS                                NAMES
6b9b91623b24        mirrored1976/sample-vue-front:latest    "nginx -g 'daemon of…"   2 minutes ago       Up 2 minutes        0.0.0.0:8080->80/tcp                 sample-vue
fae5dba7d720        mirrored1976/sample-api:latest          "java -Dspring.datas…"   9 minutes ago       Up 9 minutes        0.0.0.0:18081->18081/tcp             sample-api
fe6635562bca        mirrored1976/sample-db:latest           "docker-entrypoint.s…"   9 minutes ago       Up 9 minutes        33060/tcp, 0.0.0.0:13306->3306/tcp   sample-db
```

### Stop All

```
$ docker-compose down
```
