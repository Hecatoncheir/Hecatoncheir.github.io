abstract class GitHubResourceInterface {
  Future<void> authorize();
  Future<void> setUpUserAccessToken({required String accessToken});
}

class GitHubResource implements GitHubResourceInterface {
  final String clientId;
  final String clientSecret;

  static const String userIdentityRequestIri =
      'https://github.com/login/oauth/authorize';

  GitHubResource({
    required this.clientId,
    required this.clientSecret,
  });

  @override
  Future<void> authorize() async {}

  String? accessToken;
  @override
  Future<void> setUpUserAccessToken({required String accessToken}) async =>
      this.accessToken = accessToken;
}
