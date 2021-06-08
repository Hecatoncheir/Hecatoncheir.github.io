import 'package:json_annotation/json_annotation.dart';

part 'github.g.dart';

@JsonSerializable(anyMap: true, checked: false, explicitToJson: true)
class GitHub {
  String clientId;
  String clientSecret;

  GitHub({
    required this.clientId,
    required this.clientSecret,
  });

  factory GitHub.fromJson(Map<String, dynamic> json) => _$GitHubFromJson(json);

  Map<String, dynamic> toJson() => _$GitHubToJson(this);
}
