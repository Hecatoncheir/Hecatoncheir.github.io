import 'package:json_annotation/json_annotation.dart';

part 'article_data.g.dart';

@JsonSerializable()
class ArticleData {
  String path;

  ArticleData({
    required this.path,
  });

  factory ArticleData.fromJson(Map<String, dynamic> json) =>
      _$ArticleDataFromJson(json);

  Map<String, dynamic> toJson() => _$ArticleDataToJson(this);
}
