import 'package:json_annotation/json_annotation.dart';

part 'article_data.g.dart';

@JsonSerializable(anyMap: true, checked: false, explicitToJson: true)
class ArticleData {
  String path;

  ArticleData({
    required this.path,
  });

  factory ArticleData.fromJson(Map<String, dynamic> json) =>
      _$ArticleDataFromJson(json);

  Map<String, dynamic> toJson() => _$ArticleDataToJson(this);
}
