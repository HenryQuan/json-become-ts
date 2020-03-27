import 'package:GUI/core/writterDart.dart';
import 'package:GUI/ui/page/AboutPage.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

/// HomePage class
class HomePage extends StatefulWidget {
  HomePage({Key key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  String input;
  String output;
  final controller = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('JSON: become TS'),
        actions: <Widget>[
          IconButton(
            icon: Icon(Icons.info_outline), 
            onPressed: () => Navigator.push(context, 
              MaterialPageRoute(builder: (c) => AboutPage(), fullscreenDialog: true)
            ),
          ),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: <Widget>[
            Expanded(
              child: Row(
                children: <Widget>[
                  Expanded(
                    child: Container(
                      margin: EdgeInsets.all(8),
                      child: TextFormField(
                        controller: controller,
                        expands: true,
                        keyboardType: TextInputType.multiline,
                        maxLines: null,
                        decoration: InputDecoration.collapsed(
                          hintText: 'JSON',
                        ),
                        autocorrect: false,
                        autofocus: false,
                        onChanged: (t) => this.input = t,
                      ),
                    ),
                  ),
                  Expanded(
                    child: ListView(
                      padding: EdgeInsets.all(8),
                      children: <Widget>[
                        SelectableText(output ?? 'Output')
                      ],
                    ),
                  ),
                ],
              ),
            ),
            Row(
              children: <Widget>[
                Expanded(
                  child: FlatButton.icon(
                    icon: Icon(Icons.content_paste),
                    label: Text('Paste'),
                    onPressed: () {
                      // Paste text into input
                      Clipboard.getData(Clipboard.kTextPlain).then((value) {
                        controller.text = value.text;
                      });
                    },
                  ),
                ),
                Expanded(
                  child: FlatButton.icon(
                    icon: Icon(Icons.compare_arrows),
                    label: Text('Convert'),
                    onPressed: () {
                      setState(() {
                        this.output = WritterDart(this.input).toString();
                      });
                    },
                  ),
                ),
                Expanded(
                  child: FlatButton.icon(
                    icon: Icon(Icons.content_copy),
                    label: Text('Copy'),
                    onPressed: () {
                      // I think it will crash if you copy `null`
                      if (this.output != null) {
                        Clipboard.setData(ClipboardData(text: this.output));
                      }
                    },
                  ),
                ),
              ],
            )
          ],
        ),
      ),
    );
  }
}
