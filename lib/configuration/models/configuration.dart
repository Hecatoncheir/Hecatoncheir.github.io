import 'package:json_annotation/json_annotation.dart';

import 'article_data.dart';
import 'pages.dart';

export 'article_data.dart';
export 'pages.dart';

part 'configuration.g.dart';

@JsonSerializable(anyMap: true, explicitToJson: true)
class ConfigurationModel {
  List<ArticleData> articles;
  Pages pages;

  ConfigurationModel({
    required this.articles,
    required this.pages,
  });

  factory ConfigurationModel.fromJson(Map<String, dynamic> json) =>
      _$ConfigurationModelFromJson(json);

  Map<String, dynamic> toJson() => _$ConfigurationModelToJson(this);
}
