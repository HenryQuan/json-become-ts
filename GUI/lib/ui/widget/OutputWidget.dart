import 'package:flutter/material.dart';

class OutputWidget extends StatelessWidget {
  const OutputWidget({
    Key? key,
    required this.output,
  }) : super(key: key);

  final String output;

  @override
  Widget build(BuildContext context) {
    final outputList = this.output.split('\n');
    return Scrollbar(
      child: ListView.builder(
        itemCount: outputList.length,
        padding: EdgeInsets.all(8),
        itemBuilder: (context, index) {
          return Text(
            outputList[index],
            style: TextStyle(fontSize: 16),
          );
        },
      ),
    );
  }
}
