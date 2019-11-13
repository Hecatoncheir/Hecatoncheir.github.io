Часто бывает так, что код написанный на скорую руку нуждается в форматировании. Для того, что бы не вводить каждый раз одни и те же команды, мы автоматизируем этот процесс. И воспользуемся для этого пакетом **Grinder**.

## Grinder
 - библиотека позволяет автоматизировать рабочие процессы.

[*Документация*](http://www.dartdocs.org/documentation/grinder/0.7.2/index.html#grinder)

*Установка:*
```bash
pub global activate grinder
```

В *pubspec.yaml* укажем зависимость пакета:

```yaml
dev_dependencies:
  grinder: any
```

Так же, нам понадобится **dart_style**:

*Установка:*
```bash
pub global activate dart_style
```

## Csscomb
 - форматирование *css* стилей, поддерживает форматирование *sass* файлов.

[*Репозиторий*](https://github.com/csscomb/csscomb.js)

Для установки нужен [**NodeJs**](https://nodejs.org/)

*Установка:*
```bash
npm install csscomb -g
```

*Csscomb* может форматировать стили, таким образом, каким мы захотим. Для этого сконфигурируем правила форматирования и создадим файл *.csscomb.json* в корне проекта:

```javascript
{
    "remove-empty-rulesets": true,
    "always-semicolon": true,
    "color-case": "lower",
    "block-indent": "  ",
    "color-shorthand": true,
    "element-case": "lower",
    "leading-zero": true,
    "sort-order-fallback": "abc",
    "space-before-colon": "",
    "space-after-colon": " ",
    "space-before-combinator": " ",
    "space-after-combinator": " ",
    "space-between-declarations": "\n",
    "space-before-opening-brace": " ",
    "space-after-opening-brace": "\n",
    "space-after-selector-delimiter": " ",
    "space-before-selector-delimiter": "",
    "space-before-closing-brace": "\n",
    "tab-size": true,
    "unitless-zero": true,
    "vendor-prefix-align": true,
    "strip-spaces": true,
    "sort-order": [ [ "$variable" ], [ "$include" ], [ "top", "left", "right","bottom" ], [ "margin", "padding" ], [ "border", "background" ] ]
}
```

## @Task()

Директория */tool/* в корне проекта будет содержать наши задачи для *Grinder*. Введём *grinder:init* или создадим файл *grind.dart* в директории *tool* сами:

```dart
import 'package:grinder/grinder.dart';
import 'dart:io';

const sourceDirectories = const [
  'bin',
  'example',
  'lib',
  'test',
  'tool',
  'web'
];

main(args) => grind(args);

@Task('Форматирование всех файлов .dart')
dartFormat() => DartFmt.format(sourceDirectories);

@Task('Форматирование стилей')
stylesFormat(){
  run('csscomb',arguments:['web']);
  log('Styles formated');
}

@Task('Форматирование кода')
@Depends(dartFormat,stylesFormat)
format(){
  log('All sources formated');
}

```

Теперь при вводе команды *grind format* стили и код dart будут аккуратно отформатированы. Так же, можно выполнять задачи отдельно друг от друга командами: *grind dart-format* и *grind styles-format*.