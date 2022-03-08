import 'package:flutter/material.dart';

/// AboutPage class
class AboutPage extends StatelessWidget {
  AboutPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('About'),
      ),
      body: Center(
        child: Text('More coming soon...'),
      ),
    );
  }
}
