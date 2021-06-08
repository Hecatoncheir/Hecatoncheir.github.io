// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'configuration.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ConfigurationModel _$ConfigurationModelFromJson(Map json) {
  return ConfigurationModel(
    gitHub: GitHub.fromJson(Map<String, dynamic>.from(json['gitHub'] as Map)),
    pages: Pages.fromJson(Map<String, dynamic>.from(json['pages'] as Map)),
    articles: (json['articles'] as List<dynamic>)
        .map((e) => ArticleData.fromJson(Map<String, dynamic>.from(e as Map)))
        .toList(),
  );
}

Map<String, dynamic> _$ConfigurationModelToJson(ConfigurationModel instance) =>
    <String, dynamic>{
      'gitHub': instance.gitHub.toJson(),
      'pages': instance.pages.toJson(),
      'articles': instance.articles.map((e) => e.toJson()).toList(),
    };
