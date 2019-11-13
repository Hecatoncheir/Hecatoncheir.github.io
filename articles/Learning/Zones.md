
[Zone class](https://api.dartlang.org/1.12.1/dart-async/Zone-class.html)

Часто, программа генерирует не перехваченное исключение и прекращает выполнение. Это может означать что код работает не правильно и его нужно исправить. Но иногда исключения могут происходить по ошибке коммуникации, аппаратных сбоев и тому подобное. Для демонстрации проблемы, используем *HTTP* сервер в качестве примера:

```dart

import 'dart:io';

main() {
  runServer();
}

runServer() {
  HttpServer
  .bind(InternetAddress.ANY_IP_V4, 8080)
  .then((server) {
    server.listen((HttpRequest request) {
      request.response.write('Hello, world!');
      request.response.close();
    });
  });
}

```

В случае возникновения ошибок в функции *runServer*, выполнение кода в главной функции *main* может быть остановлено. Завершение программы в таких случаях может быть не желательно.

Как можно решить эту проблему? Мы можем обернуть наш код в блок **try/catch** и перехватить все исключения, и тогда всё будет работать отлично:

```dart

main() {
  try {
    runServer();
  } on Error catch(e) {
    // ...
  }
}

```

Это универсальное решение и используется часто. Поэтому будет лучше написать для этого отдельную функцию (*wrapper*):

```dart

wrapper(Function body, {Function onError}) {
  try {
    body();
  } on Error catch(e) {
    if (onError != null) {
      onError(e);
    }
  }
}

main() {
  wrapper(runServer, onError:(e) {
    // ...
  });
}

```

Аргумент *body* представляет собой любой код, который находится в блоке *try/catch* внутри *wrapper*. Функция **wrapper** использует функцию *onError* для обработки всех пойманных исключений. Использование **wrapper** - хорошая практика, её использование рекомендуется и в других подобных ситуациях. Это и есть **Zone**.

> **Заметка:** **Zone** это настраиваемый контекст выполнения, который обрабатывает асинхронные задачи и пойманные исключения.

Что зоны могут:

-	в критичных ситуациях, они позволяют обрабатывать исключения правильно
-	дают возможность обработки нескольких асинхронных операций в одной группе
-	могут иметь неограниченное количество вложенных зон

Каждая зона создаёт контекст, вроде защищённой территории, где находится выполняемый код. В дополнение ко всему, зоны имеют локальные переменные и могут определять *microtasks*, создавать одноразовые или повторяющиeся таймеры, выводить информацию, и сохранять *трасировку стека (stack trace)* для отладки.

## Простой пример

Изменим код, для использования зоны вместо функции *wrapper*:

```dart

import 'dart:io';
import 'dart:async';

main() {
  runZoned(runServer, onError:(e) {
    // ...
  });
}

```

Функция **runZoned** это обёртка. По умолчанию, библиотека *async* неявно создаёт *root* зону и присваивает её статической переменной **current** (read-only) в текущем классе **Zone**. Таким образом, у нас есть активная зона, которая всегда доступна нам в функции **runZoned**. Когда функция **runZoned** запускается, то она порождает новую зону вложенную в *root* и уже внутри этого контекста запускается функция *runServer*. Для создания новой вложенной зоны нужно использовать метод **fork** текущей зоны.

> **Заметка:** Зона может быть создана только с помощью метода **fork** текущей зоны.

## Вложение зон

Допустим мы хотим отдать статичный файл с нашего сервера. Что бы сделать это правильно, мы создадим новую вложенную зону и защитим наш код с помощью функции **runZoned**:

```dart

runServer() {
  HttpServer
  .bind(InternetAddress.ANY_IP_V4, 8080)
  .then((server) {
    server.listen((HttpRequest request) {
      runZoned(() {
        readFile(request.uri.path).then((String context){
          request.response.write(context);
          request.response.close();
        });
      }, onError:(e) {
        request.response.statusCode = HttpStatus.NOT_FOUND;
        request.response.write(e.toString());
        request.response.close();
      });
    });
  });
}


Future<String> readFile(String fileName) {
  switch (fileName.trim()) {
    case "/":
    case "/index.html":
    case "/favicon.ico":
      return new Future.sync(() => "Hello, world!");
  }
  return new Future.sync(() =>
      throw new Exception('Resource is not available'));
}

```

Внутри вложенной зоны, мы вызываем функцию **readFile** и передаём в параметре имя ресурса, и уже эта функция возвращает содержание. Если доступа к ресурсу нет, функция *readFile* генерирует исключение, и программа ловит его в функции **onError**, которая зарегистрирована в качестве обработчика ошибок для зоны. Если обработчик ошибок не указан, исключение будет всплывать вверх по иерархии зон пока не обработается в какой-нибудь из родительских зон или не достигнет верхнего уровня и завершит программу.

## Значения зон

Пришло время обсудить аутентификацию на нашем сервере, потому как некоторые ресурсы не должны быть доступны для каждого желающего. Будем следовать идеи аутентификации основанной на токенах (token) которые передаются на сервер с каждым запросом. Мы создадим map *токенов* для того что бы запомнить всех авторизованных клиентов, и затем создадим форк новой зоны для аутентификации. Затем мы будем просматривать токен клиента переданного в заголовке. Когда мы будем получать map токенов из свойства зоны - **current**, мы передадим их в зону с помощью **zoneValues**, как показанно ниже:

```dart
runServer() {
  HttpServer
  .bind(InternetAddress.ANY_IP_V4, 8080)
  .then((server) {
    Set tokens = new Set.from(['1234567890']);
    server.listen((HttpRequest request) {
      runZoned((){
        authenticate(request.headers.value('auth-token'));
      }, zoneValues: {'tokens': tokens}, onError:(e){
        request.response.statusCode = HttpStatus.UNAUTHORIZED;
        request.response.write(e.toString());
        request.response.close();
      });

      runZoned(() {
        readFile(request.uri.path).then((String context){
          request.response.write(context);
          request.response.close();
        });
      }, onError:(e) {
        request.response.statusCode = HttpStatus.NOT_FOUND;
        request.response.write(e.toString());
        request.response.close();
      });
    });
  });
}
```

Аутентификация сравнивающая переданный токен с имеющимися выглядит следующим образом:

```dart
authenticate(String token) {
  Set tokens = Zone.current['tokens'];
  if (!tokens.contains(token)) {
    throw new Exception('Access denied');
  }
}
```

В предыдущем коде, мы использовали локальные переменные зон (zone-local) для отслеживания токенов и аутентификации клиентов. Переменные были введены в зону с помощью аргумента **zoneValues** функции **runZoned**. Наша переменная *tokens* работает как статичная переменная в асинхронном контексте.

> **Заметка:** Локальные переменные зон выглядят как статичные переменные и доступны только внутри зоны.

Теперь проверим наш код на стороне сервера. Мы установим расширение *Postman* [http://www.getpostman.com/](http://www.getpostman.com/) для отправления запросов из Dartium. Первый запрос *https://localhost:8080* который мы отправим без *auth-token* вернет *Exception: Access denied*. Этот запрос не был авторизованным потому как отсутствует токен. Добавив его в HTTP заголовки и отправив запрос повторно мы получим строку *Hello, world!* Наш запрос авторизован.

Спецификация зон
----------------

Сейчас мы хотим добавить информацию о каждом запросе к серверу и авторизации в логи. Не рекомендуется включать функцию **log** во все возможные места. У зон есть функция *print* которая выводит сообщение как строку. Сообщение функции *print* всплывает вверх по иерархии вложенных зон пока одна из родительских зон не перехватит его или не попадёт на самый вверх в зону *root*. Таким образом, нам нужно только переписать функцию *print* в классе **ZoneSpecification** и передавать сообщения для логирования. Мы создадим новую *zoneSpecification* c функцией для перехвата и вызова функции *log*.

```dart
//…
main() {
  runZoned(runServer(),
    zoneSpecification: new ZoneSpecification(
      print:(self, parent, zone, message) {
        log(message);
      }
    ),
    onError:(e) {
    // ...
  });
}

```

Функция *log* выводит *message* стандартно печатая сообщения:

```dart
log(String message) {
  print(message);
}
```

В следующем примере, мы выведем запрашиваемый путь:

```dart
runServer() {
  HttpServer
  .bind(InternetAddress.ANY_IP_V4, 8080)
  .then((server) {
    Set tokens = new Set.from(['1234567890']);
    server.listen((HttpRequest request) {
      runZoned((){
        Zone.current.print('Resource ${request.uri.path}');
        authenticate(request.headers.value('auth-token'));
//…

```

Имейте в виду, что перехватывающие сообщения функции ожидают получить следующие четыре аргумента:

```bash
print:(Zone self, ZoneDelegate parent, Zone zone, String message)
```

Первые три из них всегда одни и те же:

-	**self:** Этот аргумент представляет зону которая обрабатывает функцию обратного вызова.

-	**parent:** Этот аргумент предоставляет **ZoneDelegate** родительской зоны, и мы можем использовать это для связи с родителем зоны.

-	**zone:** Этот аргумент первым получает запрос (до того как он начнет всплытие по иерархии)

Четвертый аргумент зависит от функции. В нашем примере это *message*, которое будет напечатано.

> **Заметка:** *ZoneSpecification* это единственный путь для переопределения специфичных для зон функций.

## Взаимодействие зон 

Посмотрим как связь между родительской и вложенными зонами может быть полезна в рамках сервера:

```dart

//…    
Set tokens = new Set.from(['1234567890']);
bool allowPrintContent = false;
    server.listen((HttpRequest request) {
      runZoned((){
//…
      });
      runZoned(() {
        readFile(request.uri.path).then((String context){
          Zone.current.print(context);
          request.response.write(context);
          request.response.close();
        });
      }, zoneValues: {'allow-print':allowPrintContent},
      zoneSpecification: new ZoneSpecification(
          print: (Zone self, ZoneDelegate parent, Zone zone, String message) {
            if (zone['allow-print']) {
              parent.print(zone, message);
            }
          }),
      onError:(e) {
//…
```

Мы добавили булеву переменную *allowPrintContent* для управления операцией *print*. Для печати контента страницы, когда обрабатывается Future значение readFile, мы вызываем функцию print внутри зоны. Мы вводим *allowPrintContent* как значение ключа *allow-print* для *zoneValues*, и на конец внутри переопределённой функции *print* мы добавляем условие которое печатает содержимое страницы только если *allow-print* является *true* значением.

Мы запрашиваем *index.html* с помощью расширения Postman и в качестве результата получаем:

```bash
Resource /index.html
Hello, world!
```

Как и ожидалось, код выводит информацию поступающую от всех вложенных зон.Теперь изменив значение на *false* и перезапустив сервер, на этот же запрос мы получаем сообщение только от первой зоны:

```dart
Resource /index.html
```

Взаимодействие между зонами может быть удобно организовано с помощью переменных зон (zone variables).

## Отслеживание выполнения зон
Сервер содержит две зоны. Первый используется для проверки аутентификации, второй используется для чтения статических файлов и отправки их обратно клиенту. Как узнать сколько времени требуется каждому статическому файлу для загрузки и обработки? Зоны поддерживают несколько методов для выполнения переданных им функций. Мы можем переопределить **run** метод в **ZoneSpecification** для расчёта времени затраченного функцией для обработки запроса. В нашем примере мы используем **Stopwatcher** как таймер. Мы обработаем каждый запрос и выведем время сразу после отправки ответа обратно клиенту, как показано в следующем примере:

```dart

//…
runServer() {
  HttpServer
  .bind(InternetAddress.ANY_IP_V4, 8080)
  .then((server) {
    Set tokens = new Set.from(['1234567890']);
    bool allowPrintContent = true;
    Stopwatch timer = new Stopwatch();
    server.listen((HttpRequest request) {
      runZoned((){
//…
      });
      runZoned(() {
        readFile(request.uri.path).then((String context){
          Zone.current.print(context);
          request.response.write(context);
          request.response.close();
          Zone.current.print(
              "Process time ${timer.elapsedMilliseconds} ms");
        });
      }, zoneValues: {'allow-print':allowPrintContent},
      zoneSpecification: new ZoneSpecification(
        print: (Zone self, ZoneDelegate parent, Zone zone, String message) {
          if (zone['allow-print']) {
            parent.print(zone, message);
          }
        },
        run: (Zone self, ZoneDelegate parent, Zone zone, f) 
          => run(parent, zone, f, timer)
      ),
      onError:(e) {
        request.response.statusCode = HttpStatus.NOT_FOUND;
        request.response.write(e.toString());
        request.response.close();
      });
    });
  });
}

```

Теперь переопределим **run** функцию в **zoneSpecification:** для вызова глобальной функции **run** с **timer**:

```dart

run(ZoneDelegate parent, Zone zone, Function f, Stopwatch timer) {
  try {
    timer.start();
    return parent.run(zone, f);
  } finally {
    timer.stop();
  }
}

```

В глобальной функции **run**, мы совершаем трюк, вызывая оригинальную функцию из родительской зоны. Мы намеренно обернули функцию в **try/catch** блок, останавливая таймер до того как в зону будет возвращён результат. Запросим какой-нибудь ресурс теперь:

```dart
Resource /index.html
Hello, world!
Process time 54 ms
```

Теперь у нас есть профилированная информация каждого запроса обрабатывающегося на сервере. В дополнение к стандартной функции **run**, зоны имеют **runUnary** и **runBinary** функции, для передачи одного или дух дополнительных аргументов выполняемых внутри зоны.