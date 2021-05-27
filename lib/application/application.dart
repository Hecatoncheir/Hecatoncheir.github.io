import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

import 'package:rework_2021/configuration/configuration.dart';

class Application extends StatefulWidget {
  const Application({
    Key? key,
  }) : super(key: key);

  @override
  _ApplicationState createState() => _ApplicationState();
}

class _ApplicationState extends State<Application> {
  @override
  void initState() {
    super.initState();

    _prepareDependencies();
  }

  late final ConfigurationInterface _configuration;

  Future<void> _prepareDependencies() async {
    const _configurationYAMLPath = 'assets/configuration.yaml';
    _configuration = Configuration();
    final config = await _configuration.open(_configurationYAMLPath);
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Text('Application'),
      ),
    );
  }
}
