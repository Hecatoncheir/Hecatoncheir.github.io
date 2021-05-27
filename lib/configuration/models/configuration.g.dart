// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'configuration.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ConfigurationModel _$ConfigurationModelFromJson(Map json) {
  return ConfigurationModel(
    articles: (json['articles'] as List<dynamic>)
        .map((e) => ArticleData.fromJson(Map<String, dynamic>.from(e as Map)))
        .toList(),
    pages: Pages.fromJson(Map<String, dynamic>.from(json['pages'] as Map)),
  );
}

Map<String, dynamic> _$ConfigurationModelToJson(ConfigurationModel instance) =>
    <String, dynamic>{
      'articles': instance.articles.map((e) => e.toJson()).toList(),
      'pages': instance.pages.toJson(),
    };
