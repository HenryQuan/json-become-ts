// This is a basic Flutter widget test.
//
// To perform an interaction with a widget in your test, use the WidgetTester
// utility that Flutter provides. For example, you can send tap and scroll
// gestures. You can also use WidgetTester to find child widgets in the widget
// tree, read text, and verify that the values of widget properties are correct.

import 'package:GUI/main.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  testWidgets('Render AboutPage', (WidgetTester tester) async {
    await tester.pumpWidget(MyApp());

    expect(find.byIcon(Icons.info_outline), findsOneWidget);
    // Tap the 'info' icon and trigger a frame.
    await tester.tap(find.byIcon(Icons.info_outline));
    await tester.pumpAndSettle();

    // Basic render checks
    expect(find.text('About'), findsOneWidget);
    expect(find.text('JSON'), findsNothing);
    expect(find.byIcon(Icons.close), findsOneWidget);
  });
}
