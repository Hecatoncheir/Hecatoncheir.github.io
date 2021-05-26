library configuration;

import 'dart:convert';

import 'package:flutter/services.dart';
import 'package:logging/logging.dart';
import 'package:yaml/yaml.dart';

import 'interface.dart';
import 'models/configuration.dart';

export 'interface.dart';
export 'models/configuration.dart';

class Configuration implements ConfigurationInterface {
  ConfigurationModel? _configurationModel;

  @override
  ConfigurationModel? getConfig() => _configurationModel;

  @override
  Future<ConfigurationModel> open(String path) async {
    try {
      Map<String, dynamic> configuration;

      final _configurationYAML = await rootBundle.loadString(path);

      configuration = Map<String, dynamic>.from(loadYaml(_configurationYAML));

      _configurationModel = ConfigurationModel.fromJson(configuration);
    } on Exception catch (exception) {
      Logger('Configuration').warning(json.encode({
        'Message': 'Exception',
        'Details': {'Exception': exception.toString()}
      }));
    }

    return _configurationModel!;
  }
}
