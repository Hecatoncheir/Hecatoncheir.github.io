import 'package:flutter/material.dart';
import 'package:flutter/services.dart' show rootBundle;

import 'package:flutter_markdown/flutter_markdown.dart';

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
        body: buildLayout(),
      ),
    );
  }

  Widget buildLayout() {
    return FutureBuilder<String>(
        future: () async {
          const path = 'assets/pages/about.md';

          final markdownText = await loadAsset(
            context: context,
            path: path,
          );

          return markdownText;
        }(),
        initialData: '',
        builder: (context, snapshot) {
          final markdown = snapshot.data;

          return Row(
            children: [
              Expanded(
                child: Column(
                  children: [
                    Expanded(
                      child: SingleChildScrollView(
                        child: MarkdownBody(
                          selectable: true,
                          data: markdown!,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          );
        });
  }

  Future<String> loadAsset({
    required BuildContext context,
    required String path,
  }) async {
    return await rootBundle.loadString(path);
  }

  // Future<String> _loadAsset({
  //   required BuildContext context,
  //   required String path,
  // }) async {
  //   return await DefaultAssetBundle.of(context).loadString(path);
  // }
}
