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
  testWidgets('Render HomePage', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(MyApp());

    // Basic render checks
    expect(find.text('Paste'), findsOneWidget);
    expect(find.text('Convert'), findsOneWidget);
    expect(find.text('Copy'), findsOneWidget);

    // Tap the 'paste' icon and trigger a frame.
    await tester.tap(find.byIcon(Icons.content_paste));
    await tester.pump();
  });
}
