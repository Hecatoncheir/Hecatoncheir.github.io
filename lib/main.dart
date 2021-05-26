import 'package:flutter/material.dart';

import 'package:logging/logging.dart';

import 'application/application.dart';

void main() {
  // WidgetsFlutterBinding.ensureInitialized();
  prepareLogger();
  runApp(Application());
}

void prepareLogger() {
  Logger.root.level = Level.ALL;
  Logger.root.onRecord.listen((record) {
    final message = record.loggerName +
        ': ' +
        record.level.name +
        ': ' +
        record.time.toString() +
        ': ' +
        record.message;

    // ignore: avoid_print
    print(message);
  });
}
