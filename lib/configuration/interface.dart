import 'models/configuration.dart';

abstract class ConfigurationInterface {
  Future<ConfigurationModel> open(String path);
  ConfigurationModel? getConfig();
}
