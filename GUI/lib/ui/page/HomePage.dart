import 'package:flutter/material.dart';

/// HomePage class
class HomePage extends StatefulWidget {
  HomePage({Key key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}


class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('JSON: become TS')
      ),
      body: Column(
        children: <Widget>[
          Expanded(
            child: Row(
              children: <Widget>[
                Flexible(
                  flex: 1,
                  child: Container(color: Colors.red),
                ),
                Flexible(
                  flex: 1,
                  child: Container(color: Colors.green),
                ),
              ],
            ),
          ),
          SizedBox(
            width: double.infinity,
            child: RaisedButton(
              child: Text('Convert'),
              onPressed: () {},
            ),
          )
        ],
      ),
    );
  }
}
