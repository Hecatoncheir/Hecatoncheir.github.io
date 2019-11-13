
<p class="column">
  <strong>Интроспекция или самоанализ (introspection)</strong> это способность программы обнаружaть и использовать свою собственную структуру. <strong>Рефлексия (или отражение)</strong> (Reflection) - способность программы использовать самоанализ для проверки и изменения структуры и поведения программы во время выполнения. Рефлексию можно использовать для динамичного создания экземпляра класса или получить тип из существующего объекта и вызывать его методы, или получить доступ к его атрибутам и свойствам. Это делает код более динамичным и позволяет использовать в работе привычные интерфейсы, так что с помощью рефлексии могут быть созданы реальные классы. Другое использование рефлексии состоит в создание инструментов для разработки и отладки и это часто используется в мета-программировании.
</p>

**Существуют два различных подхода к реализации рефлексии:**
  
- получение информации об рефлексии. Этот подход сильно интегрирован с языком и является частью структуры программы. Доступ к программе через рефлексию можно получить используя свойства или методы.
- второй подход основан на разделении информации о структуре программы и её рефлексии. Рефлексивная информация разделяется внутри отдельного объекта ** Зеркала (Mirror) **, который связан с реальными эелементами программы.

Рефлексия в Dart придерживается второго подхода. Более подробную информацию можно найти в оригинальной статье, написанной Gilad Bracha  [http://bracha.org/mirrors.pdf](http://bracha.org/mirrors.pdf).

**Преимущества рефлексии:**

- Рефлексия отдельна от основного кода и не может быть использована для вредоносных целей;
- Поскольку рефлексия не является частью кода, код в результате будет меньше;
- Нет возможности присвоить имена конфликтам между Reflection API и обработанными классами;
- Есть возможность реализации множества различных объектов зеркал с разными уровнями рефлексии;
- Рефлексию можно использовать в приложениях командной строки или web;

## Собственные аннотации
Допустим, нам надо сделать фреймворк для тестирования. Для этого нам понадобится несколько аннотаций, что бы иметь возможность отметить методы в тестируемом классе, которые должны проходить проверку. Следующий код имеет две аннотации. В случае, где нам нужна аннотация только для пометки, мы используем строку-константу **test**. В случае, если мы должны передавать параметры в аннотацию, мы будем использовать класс **Test** с константным конструктором, как показано в следующем коде:

```dart

library test;

// test - аннотация для простой пометки
const String test = "test";

// Test - аннотация с параметрами
class Test {
  // Нужно ли игнорировать тестирование для метода?
  final bool include;
  // Основной constant конструктор
  const Test({this.include:true});

  String toString() => 'test';
}

```

Класс *Test* содержит финализированную (final) переменную инициализированную со значением по умолчанию *true*. Для того, что бы исключить помеченный метод из тестирования, мы должны передать аннотации в качестве параметра *false*:

```dart

library test.case;

import 'test.dart';
import 'engine.dart';

// Тестирование для Engine
class TestCase {
  Engine engine = new Engine();
  
  // Запуск двигателя
  @test
  testStart() {
    engine.start();
    if (!engine.started) throw new Exception("Двигатель должен быть запущен");
  }
  
  // Остановка двигателя
  @Test()
  testStop() {
    engine.stop();
    if (engine.started) throw new Exception("Двигатель необходимо выключить");
  }
  
  // Прогрев двигателя
  @Test(include:false)
  testWarmUp() {
    // ...
  }
} 

```

Здесь мы тестируем класс Engine, вызывая *testStart* и *testStop* методы в классе *TestCase*, и игнорируем метод прогрева двигателя - *testWarmUp*.

Как можно реально использовать аннотации? Аннотации очень хорошо работают вместе с рефлексией (reflection), во время выполнения программы.

## Интроспекция в действии

Для демонстрации **отражений (Mirrors)** мы будем использовать простой **самоанализ (introspection)**.
 Нам понадобится универсальный код, который может получить информацию о любом объекте или классе в программе, для обнаружения его структуры и, возможно, манипуляции методами и свойствами. Для этого подготовим класс **TypeInspector**. Для добавления возможности самоанализа необходимо подключить библиотеку *dart:mirrors*:

```dart

library inspector;

import 'dart:mirrors';
import 'test.dart';

class TypeInspector {
  ClassMirror _classMirror;
  // Создадим самоанализ типа для [type].
  TypeInspector(Type type) {
    _classMirror = reflectClass(type);
  }
}
```

Класс ClassMirror содержит всю информацию о наблюдаемом типе. По факту мы проводим самоанализ в функции reflectClass и возвращаем явный объект Mirror. Затем мы можем вызвать метод **getAnnotatedMethods** и указать интересующую нас аннотацию. Это позволит вернуть список (list) *MethodMirror*, который будет содержать аннотированныe методы. Шаг за шагом мы движемся через все созданные сущьности и вызываем скрытый метод **_isMethodAnnotated**. Если результат выполнения метода _isMethodAnnotated положителен, то мы добавляем обнаруженный метод в список найденных MethodMirror:

```dart 

// Результатом будет список отзеркаленых методов, помеченных [аннотацией].
  List<MethodMirror> getAnnotatedMethods(String annotation) {
    List<MethodMirror> result = [];
    // Получение всех методов
    _classMirror.instanceMembers.forEach(
      (Symbol name, MethodMirror method) {
       if (_isMethodAnnotated(method, annotation)) {
          result.add(method);
       }
    });
    return result;
  }

```

Первый аргумент функци _isMethodAnnotated содержит свойство **metadata**, в котором находится список аннотаций. Второй аргумент этого метода - название аннотации, которое мы хотели бы найти. Переменная **inst** содержит ссылку на оригинальный объект в свойсте **reflectee**. Мы проходим через все аннотированные методы из списка **metadata**, что бы исключить некоторые из них с аннотацией типа Test помеченные как false. Все остальные аннотированные методы необходимо сравнить с названием аннотации:

```dart

// Проверка аннотации [annotation] метода [method].
 bool _isMethodAnnotated(MethodMirror method, String annotation) {
    return method.metadata.any(
      (InstanceMirror inst) {
      // Для класса [Test] проверяется состояние переменной include.
      if (inst.reflectee is Test && 
        !(inst.reflectee as Test).include) {
        // Тест должен быть исключён
        return false;
      }
      // Буквальное сравнение reflectee и annotation 
      return inst.reflectee.toString() == annotation;
    });
  }
}

```

Mirrors в Dart имеют три основные функции для самоанализа:

 - **reflect**: Эта функция используется для самоанализа экземпляра, который передается в качестве параметра и сохраняет результат в *InstanceMirror* или *ClosureMirror*. Для первого мы можем вызывать методы, функции или получать и назначать поля свойства *reflectee*. Для второго мы можем выполнить замыкание.
 
- **reflectClass**: Эта функция отражает объявленный класс и возвращяет *ClassMirror*. Она содержит полную информацию о типе переданном в параметр.

- **reflectType**: Эта функция возвращяет *TypeMirror* и отражает класс, typedef, тип функции или тип переменной.

Так выглядит основной код:

```dart

library test.framework;

import 'type_inspector.dart';
import 'test_case.dart';

main() {
  TypeInspector inspector = new TypeInspector(TestCase);
  List methods = inspector.getAnnotatedMethods('test');
  print(methods);
}

```

Для начала мы создали экземпляр нашего класса *TypeInspector* и передали проверяемый класс, в нашем случае *TestCase*. Далее, вызвали *getAnnotatedMethods* переменной *inspector* и передали название аннотации, *test*. Вот результат выполнения кода:

```dart
[MethodMirror on 'testStart', MethodMirror on 'testStop']
```

Метод *inspector* нашёл методы *testStart* и *testStop* и проигнорировал *testWarmUp* в классе *TestCase*, как нам и было нужно.

## Рефлексия в действии
Мы видели как самоанализ помогает нам найти аннотированные методы. Теперь мы вызовем каждый отмеченный метод для запуска настоящих тестов. Мы сделаем это с помощью рефлексии. Для демонстрации отражения в действии, сделаем класс **MethodInvoker**:

```dart

library executor;

import 'dart:mirrors';

class MethodInvoker implements Function {
  // Вызов метода
  call(MethodMirror method) {
    ClassMirror classMirror = method.owner as ClassMirror;
    // Создание экземпляра класса
    InstanceMirror inst = 
      classMirror.newInstance(new Symbol(''), []);
    // Вызов метода созданного экземпляра
    inst.invoke(method.simpleName, []);
  }
}

```

Так как класс *MethodInvoker* реализует интерфейс **Function** и имеет метод **call**, мы можем вызывать экземпляры этого класса как функции. Для того, что бы вызвать метод, мы должны сначала создать экземпляр класса. Каждый метод *MethodInvoker* имеет свойство *владелец (owner)*, которое ссылается на объект, владеющий этим методом. В нашем случае владельцем *MethodMirror* будет *ClassMirror*. В предыдущем коде мы создали новый экземпляр класса с пустым конструктором, а затем вызвали с помощью *inst* метод по его названию. Во всех случаях, второй параметр оставался пустым. Этот параметр является списком параметров функции.

Теперь мы введём *MethodInvoker* в основной код. В дополнение к *TypeInspector* мы создаём экземпляр класса *MethodInvoker*. Раз за разом мы проходим через методы и отправляем каждый из них в *invoker*. Мы выводим надпись *Успешно выполнено* только в тех случаях, если не обнаружено никаких исключений. Для того, что бы предотвратить завершение программы в случаях не прохождения теста, мы обернём *invoker* в блок *try-catch*, как показано в следующем коде:

```dart
  library test.framework;

  import 'type_inspector.dart';
  import 'method_invoker.dart';
  import 'engine_case.dart';

  main() {
    TypeInspector inspector = new TypeInspector(TestCase);
    List methods = inspector.getAnnotatedMethods(test);
    MethodInvoker invoker = new MethodInvoker();
    methods.forEach((method) {
      try {
        invoker(method);
        print('Успешно выполнено ${method.simpleName}');
      } on Exception catch(ex) {
        print(ex);
      } on Error catch(ex) {
        print("$ex : ${ex.stackTrace}");
      }
    });
  }

```

В результате мы получим следующее:

```dart
Success Symbol("testStart")
Success Symbol("testStop")
```

Что бы доказать, что наша программа не завершится в случае брошенного исключения в тестах, мы изменим код в *TestCase*:

```dart

// Запуск двигателя
@test
testStart() {
  engine.start();
  // !!! Сломаный код, на это есть причина
  if (engine.started)  throw new Exception("Двигатель должен быть запущен");
}

```

Когда мы запустим программу, код в *testStart* потерпит неудачу, но программа продолжит работать пока все тесты не будут завершены:

```dart
Exception: Двигатель должен быть запущен
Success Symbol("testStop")
```

Теперь наша библиотека готова для использования. Она использует самоанализ и рефлексию для отслеживания и вызова помеченных методов любого класса. 

## В общих чертах на примере библиотеке [ExMap](https://github.com/Rasarts/ExMap)
Чаще всего нужно найти свойства помеченный аннотацией и иметь возможность получить данные, как из аннотации, так и из свойства ею помеченного.

Общая схема действия получения всего что нужно, и нельзя забывать о @MirrorsUsed()

Аннотированный класс который будет анализироваться, выглядит следующим образом:
```dart

```

```dart
library ex_map;

@MirrorsUsed(symbols: 'ExMap')
import 'dart:mirrors';

import 'src/map_extended.dart';
export 'src/map_extended.dart';

class ExAMap {
  const ExAMap();
}

class MapKey {
  const MapKey({bool protected});
}

void prepareExMaps() {
  MirrorSystem mirrorSystem = currentMirrorSystem();

  /// Сперва отыскиваются аннотации подходящие по типу ExMap, затем
  /// в библиотеке где аннотации были обнаружены ищутся
  /// аннотированные классы или методы. (Символы аннотированных методов или классов
  /// можно найти при поиске подходящих по типу аннотаций ExMap)
  mirrorSystem.libraries.forEach((Uri uri, LibraryMirror libMir) {
    /// Сперва анализируются все описанные классы и методы библиотек
    libMir.declarations
        .forEach((Symbol annotatedSymbol, DeclarationMirror decMir) {
      /// Для всех найденных аннотаций нужно проверить нужный тип аннотации
      decMir.metadata.forEach((InstanceMirror insMir) {
        /// Если нужный тип аннотаций совпадает, значит в этой библиотеке есть
        /// классы помеченные этой аннотацией.
        if (insMir.reflectee is ExAMap) {
          /// Можно получить значения из самой аннотации
          /// insMir.reflectee
          /// либо в библиотеке где были найдены совпадения найти аннотируемые классы
          libMir.declarations.forEach(
              (Symbol symbolInLibraryWhereAnnotationFound,
                  DeclarationMirror methodOrClass) {
            /// Если аннотированный символ метода или класса совпадаются с символами
            /// метода или класса библиотеки то это та запись что нужно было найти.
            if (annotatedSymbol == symbolInLibraryWhereAnnotationFound) {
              ClassMirror classMirror = methodOrClass;

              Set set = new Set();

              /// Теперь можно находить поля помеченные аннотациями
              classMirror.declarations.forEach((Symbol classMethodOrFieldSymbol,
                  DeclarationMirror classMethodOrField) {
                classMethodOrField.metadata
                    .forEach((InstanceMirror fieldAnnotationMirror) {
                  /// Проверив тип аннотации можно быть уверенным что поле с которым
                  /// можно работать точно соответсвует реально помеченному.
                  if (fieldAnnotationMirror.reflectee is MapKey) {
                    /// Проверка типа
                    /// if((classMethodOrField as VariableMirror).isStatic) {
                    ///   var valueOfField = classMirror.getField(classMethodOrFieldSymbol).reflectee;
                    /// }

                    set.add(MirrorSystem.getName(classMethodOrFieldSymbol));
                  }
                  classMirror.superclass.setField(new Symbol('set'), set);
                });
              });
            }
          });
        }
      });
    });
  });
}

```

