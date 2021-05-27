// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'pages.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Pages _$PagesFromJson(Map json) {
  return Pages(
    about: Page.fromJson(Map<String, dynamic>.from(json['about'] as Map)),
  );
}

Map<String, dynamic> _$PagesToJson(Pages instance) => <String, dynamic>{
      'about': instance.about.toJson(),
    };

Page _$PageFromJson(Map json) {
  return Page(
    title: PageTitle.fromJson(Map<String, dynamic>.from(json['title'] as Map)),
    path: json['path'] as String,
  );
}

Map<String, dynamic> _$PageToJson(Page instance) => <String, dynamic>{
      'title': instance.title.toJson(),
      'path': instance.path,
    };

PageTitle _$PageTitleFromJson(Map json) {
  return PageTitle(
    en: json['en'] as String,
    ru: json['ru'] as String,
  );
}

Map<String, dynamic> _$PageTitleToJson(PageTitle instance) => <String, dynamic>{
      'en': instance.en,
      'ru': instance.ru,
    };
