Иногда нужно иметь возможность работать со свойствами объекта так же удобно как с ключами Map'a. С самим объектом удобнее работать когда у него есть хорошие api Map'a. Такой объект хорошо сериализуется и десериализуется.

Существует как минимум два способа это сделать:
  - Расширить класс сущности классом [MapBase](https://api.dartlang.org/stable/1.18.1/dart-collection/MapBase-class.html) и реализовать **keys**, **operator[]**, **operator[]=**, **remove** а так же **clear**.
   
  ```dart
  class Entity extends MapBase {
    Map _entityMap = new Map();
      
    operator [](Object key) {
      return _entityMap[key];
    }

    operator []=(K key, V value) {
      _entityMap[key] = value;
    }

    get keys => _entityMap.keys;
    
    remove(key) {
      _entityMap.remove(key);
    }

    clear() {
      _entityMap.clear();
    }
  }
  ```
    
  - Добавить в класс сущности миксин [MapMixin](https://api.dartlang.org/stable/1.18.1/dart-collection/MapMixin-class.html) и реализовать **keys**, **operator[]**, **operator[]=**, **remove**, **clear**.
  
## Реализация:

Для того что бы было удобнее работать со свойствами класса и иметь небольшое преобразование типов:

```dart
 TestMap map;

  setUp(() {
    map = new TestMap();
  });

  test('has protected fields', () {
    map.id = 1;
    expect(map['id'], equals(1));
  
    map.integerField = '1';
    expect(map['integerField'], equals(1)); // int
  
    map['testField'] = 2;
    expect(map.testField, equals('2')); // String
  });
```

Можно обозначать в конструкторе класса Map из свойств и типов, а самим свойствам назначать get и set:

```dart
class TestMap extends ExtendedMap {
  TestMap({id, integerField, testField}) {
    /// Свойство нельзя будет установить иначе кроме как через специальный метод
    protectedKeys.add('id'); 
    types = {'testField': String, 'integerField': int};
  }
  
  /// Свойство можно будет установить только через оператор "."
  get id => this['id'];
  set id(value) => setProtectedField('id', value); 

  /// Тут можно было бы обозначить типы
  get integerField => this['integerField'];
  set integerField(value) => this['integerField'] = value;

  get testField => this['testField'];
  set testField(value) => this['testField'] = value;
}

```

### Сам *ExtendedMap* нужно сконструировать ледующим образом:

```dart
import 'dart:collection';

class ExtendedMap<K, V> extends Object with MapMixin {

  // Основные get и set поля
  Map _Map = new Map();
  Set _keys = new Set();
  Map _types = new Map();

  Set get keys => _keys;

  Map<String, Type> get types => _types;
  set types(Map typeMap) {
    _types = typeMap;
    _keys = typeMap.keys.toSet();
  }

  Set protectedKeys = new Set();
  
  // Основные методы
   dynamic _checkType({String key, dynamic value, Map types}) {
    if (types[key] == String) {
      return value.toString();
    }

    if (types[key] == int && value != null) {
      return int.parse(value.toString());
    }

    return value;
  }

  Map fromMap(Map map) {
    this.keys.forEach((String extendedKey) {
      _Map[extendedKey] =
          _checkType(key: extendedKey, value: map[extendedKey], types: types);
    });

    return this;
  }

  setProtectedField(K key, V value) {
    keys.add(key);
    protectedKeys.remove(key);
    _Map[key] = value;
    protectedKeys.add(key);
  }

  operator [](Object key) {
    return _Map[key];
  }

  operator []=(K key, V value) {
    if (protectedKeys.contains(key) || !keys.contains(key)) {
      throw new ArgumentError("$key can't be changed");
    }

    _Map[key] = _checkType(key: key.toString(), value: value, types: types);
  }

  remove(key) {
    _Map.remove(key);
  }

  clear() {
    _Map.clear();
  }
  ```
  
  ### Аннотации для трансформера
  
  Сократить объем работы с помощью аннотаций для трансформера:

``` dart 
/// original source    =>   be transformed to   =>   ready for use 
import 'package:ex_map/ex_map.dart';      ///    import 'package:ex_map/ex_map.dart';
                                          ///
@ExMap                                    ///    @ExMap
class ExampleMap extends ExtendedMap {    ///    class ExampleMap extends ExtendedMap {
  @ExKey()                                ///
  int id;                                 ///       ExampleMap({int id, int integerField, String testField}) {
                                          ///         protectedKeys.addAll(['integerField']);
  @ExKey(protected: true, type: int)      ///         types = {'id': int, 'integerField': int, 'testField': String};
  int integerField = 1;                   ///         this.integerField = 1;
                                          ///         this['testField'] = 'test';
  @ExKey(type: String)                    ///       }
  var testField = 'test';                 ///       
}                                         ///       get id => this['id'];
                                          ///       set id(value) => this['id'] = value;
                                          ///
                                          ///       get integerField => this['integerField'];
                                          ///       set integerFieldd(value) => setProtectedField('integerField', value);
                                          ///
                                          ///       get testField => this['testField'];
                                          ///       set testField(value) => this['testField'] = value;
                                          ///    }
```

Как это реализованно можно увидеть в репозитории пакета: 
  [ExMap](https://github.com/Rasarts/ExMap)