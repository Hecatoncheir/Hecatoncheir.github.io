Для автоматического обновления файла стилей при его изменении есть, к примеру, не плохое расширение называемое [**Css auto reload**](https://chrome.google.com/webstore/detail/css-auto-reload/fiikhcfekfejbleebdkkjjgalkcgjoip), за авторством *Allen.M*. Оно, конечно работает, но только с *.css* файлами. Что если необходимо отслеживать изменения нескольких файлов, среди которых не только *.css* стили? Решения на этот счет тоже есть, для Dart есть пакет [**watcher**](https://pub.dartlang.org/packages/watcher), но речь пойдет не о нем. Я опишу gem [**Guard**](http://guardgem.org/) и как его настроить для удобной работы в связке с LiveReload в Dart проекте.

### Guard 
- позволяет автоматизировать различные задачи при изменении файла или каталога.

Установить guard можно с помощью команды *gem*:
```bash
gem install guard
gem install gurad-livereload
gem install guard-compass
gem install gurad-ctags-bundler #ctags должен быть уже установлен в системе.
```
Так же для guard есть нужные нам расширения, которые мы заодно можем установить, как показано выше.

### LiveReload
- позволяет обеспечить связь между клиентом и сервером, и обеспечивает отправку уведомлений об обновлении файлов, для перезагрузки страниц браузером.

Понадобится [**LiveReload**](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) расширение для браузера.

Для сервера его можно установить с помощью команды:
```bash
pip install livereload 
```

### Compass
- предназначен для увеличения уровня абстракции CSS кода и упрощения файлов каскадных таблиц стилей, для его работы необходим **Sass**.

Sass и Compass устанавливаются как показано ниже:
```bash
gem install sass
gem install compass
```

В корне самого проекта *Compass* ожидает увидеть файл настроек под названием *config.rb*. Можно воспользоваться командой *compass init*. Содержание может быть, примерно таким:

```ruby
preferred_syntax = :scss
http_path = '/'
css_dir = 'build/web/stylesheets/'
sass_dir = 'web/stylesheets/'
images_dir = 'web/images'
javascripts_dir = 'web/scripts'
relative_assets = true
line_comments = true
output_style = :compressed

require 'breakpoint'
require 'susy'
```
*Breakpoint* и *susy* указывать не обязательно, только в случаях когда они нужны.

Теперь при запуске команды *compass watch* стили, при изменении, будут компилироваться в директорию *build/web/stylesheets/*, где им и место.
Для того что бы стили компилировались по команде *pub build*, необходимо добавить пакет *sass* в зависимость и настроить трансформацию в *pubspec.yaml*:

```dart
dependencies: 
  sass: any
transformers:
- sass:
    style: compact                
    compass: true
    copy-sources: false
```

### Ctags
Я предпочитаю использовать [**Universal Ctags**](https://ctags.io/).
 - он нужен для удобного нахождения свойств тегов определенных в других файлах проекта. Он поможет, к примеру, определить нахождение класса в стилях, и его быстрое открытие из редактирования html файла не заставит себя ждать. В *vim* он помогает перемещаться по файлам проекта с помощью *<c-p>*. Состояние всех его служебных файлов типа *.tags* необходимо обновлять, что бы всегда иметь актуальные возможности взаимодействия.

 Для OSX устанавливается с помощью *brew*:
```bash
 brew tap universal-ctags/universal-ctags
 brew install --HEAD universal-ctags
```
 На Linux ставится легко с помощью *Autotools*:
```bash
$ autoreconf -vfi
$ ./configure --prefix=/where/you/want # defaults to /usr/local
$ make
$ make install # may require extra privileges depending on where to install
```
После установки, выполняемые файлы будут находится *$prefix/bin/*.

### Guardfile
Теперь нужно настроить сам *Guard*. Можно выполнить *guard init* в корне проекта или проста создать файл с именем *Guardfile* и следующем содержанием:
```ruby
group :development do
  guard :livereload do
    watch(%r{.+\.(css|js|html?)$})
  end

  guard 'ctags-bundler', :src_path => ["web", "lib"] do
    watch(/^(app|lib|)\/.*\.(css|js|html|dart|rb)$/)
    watch('Gemfile.lock')
  end

  if File.exists?("./config.rb")
    # Будем компилировать стили при запуске guard
  puts `compass compile --time --quiet`

  guard :compass do
    watch(%r{(.*)\.s[ac]ss$})
    end
  end

end
```
Для наблюдения за файлами указываются не сложные регулярные выражения.

Теперь при выполнении команды **guard -i** будет запущен сервер и скомпилированы стили. Параллельным процессом можно запустить компиляцию *dart* файлов командой *pub serve --force-poll*. Открывая *localhost:8080* и запуская *LiveReload* расширение в браузере, мы получаем моментальные  обновления при изменения файлов. Можно обойтись и без *pub serve*, открывая к примеру *build/web/index.html* в браузере на прямую. LiveReload работает с Guard и может работать с файлами локально.

В Vim при редактировании можно включить автосохранение *:autosave* и тогда обновления будут отражаться в браузере еще быстреe:

[**YouTube**](http://youtu.be/sSlGonSMSuM)

[![ScreenShot](https://raw.githubusercontent.com/Rasarts/Dart-Starter-Kit/preview/2015-03-14%2001_10_42.gif)](http://youtu.be/sSlGonSMSuM)