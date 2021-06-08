import 'package:json_annotation/json_annotation.dart';
import 'package:rework_2021/configuration/models/github.dart';

import 'article_data.dart';
import 'pages.dart';

export 'article_data.dart';
export 'pages.dart';

part 'configuration.g.dart';

@JsonSerializable(anyMap: true, checked: false, explicitToJson: true)
class ConfigurationModel {
  GitHub gitHub;
  Pages pages;
  List<ArticleData> articles;

  ConfigurationModel({
    required this.gitHub,
    required this.pages,
    required this.articles,
  });

  factory ConfigurationModel.fromJson(Map<String, dynamic> json) =>
      _$ConfigurationModelFromJson(json);

  Map<String, dynamic> toJson() => _$ConfigurationModelToJson(this);
}
