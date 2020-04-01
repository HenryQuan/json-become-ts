
import 'package:flutter/material.dart';

class OutputWidget extends StatelessWidget {
  const OutputWidget({
    Key key,
    @required this.output,
  }) : super(key: key);

  final String output;

  @override
  Widget build(BuildContext context) {
    if (this.output == null) {
      // Match textfield style
      return Align(
        alignment: Alignment.topLeft,
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Text(
            'Output',
            style: TextStyle(fontSize: 16, fontWeight: FontWeight.w500),
          ),
        ),
      );
    } else {
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
}
