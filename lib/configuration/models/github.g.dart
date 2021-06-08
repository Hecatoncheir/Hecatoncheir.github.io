// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'github.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

GitHub _$GitHubFromJson(Map json) {
  return GitHub(
    clientId: json['clientId'] as String,
    clientSecret: json['clientSecret'] as String,
  );
}

Map<String, dynamic> _$GitHubToJson(GitHub instance) => <String, dynamic>{
      'clientId': instance.clientId,
      'clientSecret': instance.clientSecret,
    };
