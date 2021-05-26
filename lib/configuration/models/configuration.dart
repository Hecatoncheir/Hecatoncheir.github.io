import 'package:json_annotation/json_annotation.dart';

import 'article_data.dart';
export 'article_data.dart';

part 'configuration.g.dart';

@JsonSerializable(anyMap: true, explicitToJson: true)
class ConfigurationModel {
  List<ArticleData> articles;

  ConfigurationModel({
    required this.articles,
  });

  factory ConfigurationModel.fromJson(Map<String, dynamic> json) =>
      _$ConfigurationModelFromJson(json);

  Map<String, dynamic> toJson() => _$ConfigurationModelToJson(this);
}
