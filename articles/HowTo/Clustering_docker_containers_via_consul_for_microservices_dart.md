
Разработка микросервисов может оказаться не простой задачей.

### Примерная схема:
<div style="background: #fff; 
            width: 100%; 
            display: block; 
            text-align:center; 
            border-radius: 6px; 
            padding: 10px; 
            overflow: scroll">
![alt text](http://s8.hostingkartinok.com/uploads/images/2016/05/dafb2c17b93fcab29ced9ae38982cab8.png)
</div>

Базы данных для каждого микросервиса, для начала, будут расположены на ноде самого микросервиса.

***Порядок такой***: Сперва на нодах подымается контейнер Consul. И он синхронизируется с кластером, получая информацию о микросервисах, их ip и портах.  Сервисы вроде баз данных подымаются Docker'ом и регистрируются как сервисы в своих нодах в consul. Тот синхронизирует свои настройки с кластером. Затем микросервис на Dart подымается в контейнере docker и регистрируется как микросервис в consul своего нода. Микросервис dart при запуске подключается к consul своего нода и получает информацию о микросервисах необходимых ему для взаимодействия. Таким образом у всех микросервисов свежие данные о местонахождении каждого из нужных ему сервисов для подключения.

## Подготовка кластера.

Взаимодействие между микросервисами нужно обеспечить. Каждый микросервис должен знать о местонахождении остальных, нужных ему, микросервисов.

Каждый микросервис будет регистрировать себя в кластере. И получать информацию о других от туда же.

Устанавливаем [**VirtualBox**](https://www.virtualbox.org/wiki/Downloads) , [**Docker**](https://docs.docker.com/engine/installation) и [**DockerMachine**](https://docs.docker.com/machine/install-machine).


## Настройка

Настраиваем VirtualBox dhcp сервер для выдачи удобных Ip. (Мне так больше нравится. Так удобнее работать локально при разработке, запуская все контейнеры на одном компьютере).

```python
VBoxManage dhcpserver add --netname vboxnet01 --ip 192.168.56.1 --netmask 255.255.255.0  --lowerip 192.168.60.100 --upperip 192.168.70.100 --enable
```

Теперь VirtualBox dhcp сервер будет раздавать ip начиная с 192.168.61.100 - Cluster.

Для того что бы было на чем запускать контейнер, с Consul для мониторинка и хранения информации о микросервисах, создаем простенькую docker машинку:

```dart
docker-machine create --driver "virtualbox" --virtualbox-cpu-count "-1" --virtualbox-disk-size "2560" --virtualbox-memory "2560" --virtualbox-hostonly-cidr "192.168.61.1/24" Cluster
```

Подготавливаем необходимое для запуска окружение:

```bash

# Запускает созданую docker машину
docker-machine start Cluster

# Если нужно генерируем сертификаты заново
docker-machine env Cluster || docker-machine regenerate-certs -f Cluster

# Необходимая информация о запущеной машине должна быть доступна в окружении
eval $(docker-machine env Cluster)

# Каждый раз когда запускается кластер, нужно удалять лишние контейнеры
# даже если кластер был отключен, ведущий узел был переназначен автоматически
# и вновь поднятый сервер получит настройки от остальных нодов в сети.
docker rm -f $(docker ps -a -q)
```

Далее нужно поднять Docker контейнер с Consul. Пока, в примере, настройки для удобной локальной разработки.
Для запуска можно использовать .sh файл:

```dart

cluster="192.168.61.100"

docker run -h Cluster \
    -p $cluster:8300:8300 \
    -p $cluster:8301:8301 \
    -p $cluster:8301:8301/udp \
    -p $cluster:8302:8302 \
    -p $cluster:8302:8302/udp \
    -p $cluster:8400:8400 \
    -p $cluster:8500:8500 \
    -p $cluster:53:53/udp \
    progrium/consul -ui-dir /ui -server  -advertise $cluster -bootstrap-expect 1
```

Ключ -ui-dir задает uri путь к web интерфейсу.
Который выглядит как здесь: [https://demo.consul.io/ui/](https://demo.consul.io/ui/)

Кластер готов и ждет подключение нодов.

## Настройка нода для микросервиса

***node_config.json*** может выглядеть следующим образом:

```javascript
{
  "Datacenter": "dc1", /* Датацентр в который мы определяем сервер */
  "Node": "Cars",  /* Имя узла */
  "Address": "192.168.62.100" /* Тут понятно */
}
```

И для запуска контейнера с Consul можно использовать удобный .sh файл:


```bash
#!/bin/bash

clear

# На этот раз начинать раздовать ip dhtcp серверу лучше начинать с 192.168.62.100 - Cars
VBoxManage dhcpserver add --netname vboxnet01 --ip 192.168.56.1 --netmask 255.255.255.0  --lowerip 192.168.61.100 --upperip 192.168.70.100 --enable

# Назовем эту docker машину  - Cars
docker-machine create --driver "virtualbox" --virtualbox-cpu-count "-1" --virtualbox-disk-size "12560" --virtualbox-memory "2560" --virtualbox-hostonly-cidr "192.168.62.1/24" Cars

docker-machine start Cars
docker-machine env Cars || docker-machine regenerate-certs -f Cars
eval $(docker-machine env Cars)

docker rm $(docker ps -a -q)

cluster="192.168.61.100"
server="192.168.62.100"

#docker run -h Cars -v $PWD/mnt:/$PWDdata \ # - Таким образом можно указать где хранить информацию об узлах и их сервисах. Но в этом пока нет необходимости.

docker run -h Cars \
    -p $server:8300:8300 \
    -p $server:8301:8301 \
    -p $server:8301:8301/udp \
    -p $server:8302:8302 \
    -p $server:8302:8302/udp \
    -p $server:8400:8400 \
    -p $server:8500:8500 \
    -p $server:53:53/udp \
    progrium/consul -server -advertise $server -join $cluster
```

Ключ -join сразу подключает контейнер и регистрирует его в кластере.

Пока это все находится на одном сервере для удобной разработки. Но при необходимост, не большие правки позволят разделить все docker контейнеры на отдельные сервера.

Дальше запускается база данных и регистрируется как сервис в своем ноде (Cars). На примере RethinkDb.

***service.json*** с информацией для подключения к нему:

```javascript
{
  "ID": "CarsDatabase", /* Уникальное название - идетификатор сервиса */
  "Name": "CarsDatabase", /* Имя сервиса, никогда не будет лишним */
  "Tags": [ /* Теги, могут быть полезными, но не обязательные */
    "master", /* Обычно это имя ветки откуда сделать пул для нового разворачивания в другой системе, если потребуется */
    "v1" /* И версия api */
  ],
  "Address": "192.168.62.100",
  "Port": 8000,
  "Check": { /* Позволяет настроить проверку, ее интервал и много полезного для проверки состояния сервиса */
    "Interval": "10s",
    "TTL": "15s"
  }
}
```

О том как настраиваются условия проверки сервисов: [https://www.consul.io/docs/agent/checks.html](https://www.consul.io/docs/agent/checks.html)

Запускаем Docker контейнер и регистрируем сервис:

```dart
clear
docker-machine start Cars
docker-machine env Cars
eval $(docker-machine env Cars)

# Регистрируется в Consul своего нода (Cars)
curl -X PUT -d @service.json http://192.168.62.100:8500/v1/agent/service/register

docker run --name CarsDatabase -v "$PWD:/data" -p 8000:8080 -p 28015:28015 rethinkdb || docker start -ia CarsDatabase
```

Ключ -v "$PWD:/data" указывает где хранить нужные для RethinkDb файлы.

## Запускаем Dart микросервис:
***service.json***:
```dart
{
  "ID": "CarsMicroservice",
  "Name": "CarsMicroservice",
  "Tags": [
    "master",
    "v1"
  ],
  "Address": "192.168.62.100",
  "Port": 8801
}
```

***Dockerfile***:
```dart
FROM google/dart

WORKDIR /microservice

ADD pubspec.* /microservice/
RUN pub get
ADD . /microservice
RUN pub get --offline

CMD []
ENTRYPOINT ["/usr/bin/dart", "bin/microservice.dart"]
EXPOSE 8801/tcp
```

Запуская контейнер на Dart единожды Docker соберет контейнер с нужными пакетами pub. До того момента как понадобится пересоздать контейнер, pub запускать снова будет не нужно, что удобно для разработки. Только нужно помнить, что в это примере, контейнеры при создании нода удаляются. Это уже действия по обстоятельствам.

Ну а для запуска и регистрации микровсервиса в ноде можно, снова, использовать .sh:

```dart
#!/usr/bin/env bash
clear
docker-machine start Cars
docker-machine env Cars
eval $(docker-machine env Cars)

docker rm -f /CarsMicroservice
docker volume rm -f $(docker volume ls -qf dangling=true)

docker build -t someUserFromDockerHub/someImageName .

curl -X PUT -d @service.json http://192.168.62.100:8500/v1/agent/service/register

docker run --net=host -i -t --name CarsMicroservice someUserFromDockerHub/someImageName . -p 8801:8801
```

Таким же образом настраивается и DriversNode.

Получать инфу для подключения к микросервисам можно с помощью consul [RestApi](https://www.consul.io/docs/agent/http.html):

```dart
/// Name of microservice of database
String databaseMicroservice = 'CarsDatabase';

/// Cluster with microservices information
String clusterIp = '192.168.62.100';
int clusterPort = 8500;

/// Функция подготавливающая данные

/// Prepare config
  Future prepareConfig() async {
    var service = await http.get(
        'http://$clusterIp:$clusterPort/v1/catalog/service/$databaseMicroservice');

    Map config = JSON.decode(service.body).first;

    return config;
  }

  getDataBaseIp() async {
    Map dataBaseMicroserviceConfig = await prepareConfig();

    dataBaseIp = dataBaseMicroserviceConfig['ServiceAddress'];
  }
```

Теперь сервисы разделены и ими легко управлять. И они могут получать информацию друг о друге.

Еще нужно рассмотреть Continuous integration (CI). Есть удобные средства такие как [Jenkins](https://jenkins.io/) и [Teamcity](https://www.jetbrains.com/teamcity/). Я использую [GitLab](https://about.gitlab.com/gitlab-ci/) и следовательно я буду описывать инструменты этого сервиса.

Но о CI уже в другой статье.