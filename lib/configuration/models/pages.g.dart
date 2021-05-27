// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'pages.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Pages _$PagesFromJson(Map<String, dynamic> json) {
  return Pages(
    about: Page.fromJson(json['about'] as Map<String, dynamic>),
  );
}

Map<String, dynamic> _$PagesToJson(Pages instance) => <String, dynamic>{
      'about': instance.about,
    };

Page _$PageFromJson(Map<String, dynamic> json) {
  return Page(
    title: PageTitle.fromJson(json['title'] as Map<String, dynamic>),
    path: json['path'] as String,
  );
}

Map<String, dynamic> _$PageToJson(Page instance) => <String, dynamic>{
      'title': instance.title,
      'path': instance.path,
    };

PageTitle _$PageTitleFromJson(Map<String, dynamic> json) {
  return PageTitle(
    en: json['en'] as String,
    ru: json['ru'] as String,
  );
}

Map<String, dynamic> _$PageTitleToJson(PageTitle instance) => <String, dynamic>{
      'en': instance.en,
      'ru': instance.ru,
    };
