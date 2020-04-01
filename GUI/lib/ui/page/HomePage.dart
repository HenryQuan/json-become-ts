import 'package:GUI/core/converter/Converter.dart';
import 'package:GUI/core/converter/WritterDart.dart';
import 'package:GUI/core/converter/WritterKotlin.dart';
import 'package:GUI/core/converter/WritterTS.dart';
import 'package:GUI/ui/page/AboutPage.dart';
import 'package:GUI/ui/widget/OutputWidget.dart';
import 'package:flutter/foundation.dart';
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
  String jsonName;
  // This handles pasting text from clipboard
  final controller = TextEditingController();
  // This is for indicating the text field of name input
  final nameKey = GlobalKey<FormState>();
  // For web, divider needs to be at least 1 in length to be visible
  final double dividerLength = kIsWeb ? 1 : 0;

  int selectedChip = 0;
  final List<Converter> converters = [
    Converter('Dart', (String jsonString, String jsonName) => WritterDart(jsonString, jsonName)),
    Converter('TypeScript', (String jsonString, String jsonName) => WritterTS(jsonString, jsonName)),
    Converter('Kotlin', (String jsonString, String jsonName) => WritterKotlin(jsonString, jsonName)),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('JSON: Become TS'),
        actions: <Widget>[
          IconButton(
            icon: Icon(Icons.info_outline), 
            onPressed: () => Navigator.push(context, 
              MaterialPageRoute(builder: (c) => AboutPage(), fullscreenDialog: true)
            ),
            tooltip: 'About JSON: Become TS',
          ),
        ],
      ),
      // Builder is used to show snack bar
      body: buildBody(context),
      bottomNavigationBar: Builder(builder: (c) {
        return BottomAppBar(
          child: buildBottomButtons(c),
        );
      }),
    );
  }

  /// The main body of `HomePage`
  SafeArea buildBody(BuildContext context) {
    return SafeArea(
      child: Column(
        children: <Widget>[
          Expanded(
            child: Row(
              children: <Widget>[
                Expanded(
                  child: buildLeftForm(),
                ),
                VerticalDivider(width: dividerLength),
                Expanded(
                  child: Column(
                    children: <Widget>[
                      ConstrainedBox(
                        constraints: BoxConstraints(maxHeight: 64),
                        child:ListView.builder(
                          scrollDirection: Axis.horizontal,
                          itemCount: converters.length,
                          padding: EdgeInsets.all(8),
                          itemBuilder: (context, index) {
                            final converter = converters[index];
                            return Padding(
                              padding: const EdgeInsets.only(right: 8),
                              child: InputChip(
                                label: Text(converter.name),
                                selected: index == selectedChip,
                                onPressed: () {
                                  setState(() {
                                    selectedChip = index;
                                  });
                                },
                              ),
                            );
                          },
                        ),
                      ),
                      Divider(height: 0),
                      Expanded(
                        child: OutputWidget(output: output)
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  /// This `Row` contains three `FlatButton` with `icons`
  Row buildBottomButtons(BuildContext context) {
    return Row(
      children: <Widget>[
        Expanded(
          child: Tooltip(
            message: 'Paste JSON string from clipboard',
            child: FlatButton.icon(
              icon: Icon(Icons.content_paste),
              label: Text('Paste'),
              onPressed: () {
                // Paste text into input
                Clipboard.getData(Clipboard.kTextPlain).then((value) {
                  controller.text = value.text;
                  // NOTE: Update input as well here so that it won't be null because text field wasn't changed
                  this.input = value.text;
                });

                // Clear up outputs
                setState(() {
                  this.output = null;  
                });
              },
            ),
          ),
        ),
        Expanded(
          child: Tooltip(
            message: 'JSON -> Code',
            child: FlatButton.icon(
              icon: Icon(Icons.compare_arrows),
              label: Text('Convert'),
              onPressed: () {
                if (nameKey.currentState.validate()) {
                  final writter = converters[selectedChip].writter(this.input, this.jsonName);
                  if (writter.isValid()) {
                    setState(() {
                      this.output = writter.toString();
                    });
                  } else {
                    // Select the line that has an error
                    controller.selection = writter.errorSelection(input) ?? TextSelection;
                    // Show a snack bar
                    Scaffold.of(context).showSnackBar(
                      SnackBar(
                        content: Text(writter.errorMessage),
                      ),
                    );
                  }
                }
              },
            ),
          ),
        ),
        Expanded(
          child: Tooltip(
            message: 'Copy generated code into clipboard',
            child: FlatButton.icon(
              icon: Icon(Icons.content_copy),
              label: Text('Copy'),
              onPressed: () {
                String text = "Nothing was copied...";
                // I think it will crash if you copy `null`
                if (this.output != null) {
                  Clipboard.setData(ClipboardData(text: this.output));
                  text = "Output has been copied :)";
                }

                // Show a snack bar
                Scaffold.of(context).showSnackBar(
                  SnackBar(
                    duration: Duration(seconds: 1),
                    content: Text(text),
                  ),
                );
              },
            ),
          ),
        ),
      ],
    );
  }

  /// This `Form` contains two `TextFormField` for validation
  Form buildLeftForm() {
    return Form(
      key: nameKey,
      child: Column(
        children: <Widget>[
          Center(
            child: Padding(
              padding: const EdgeInsets.all(8.0),
              child: TextFormField(
                validator: (value) {
                  if (value.isEmpty) return '*name is necessary';
                  return null;
                },
                decoration: InputDecoration.collapsed(
                  hintText: 'Name',
                ),
                autocorrect: false,
                autofocus: false,
                onChanged: (t) => this.jsonName = t,
              ),
            ),
          ),
          Divider(height: dividerLength),
          Expanded(
            child: Container(
              margin: EdgeInsets.all(8),
              child: Scrollbar(
                child: TextFormField(
                  validator: (value) {
                    if (value.isEmpty) return '*this field must not be empty';
                    return null;
                  },
                  controller: controller,
                  expands: true,
                  keyboardType: TextInputType.multiline,
                  maxLines: null,
                  enableInteractiveSelection: true,
                  decoration: InputDecoration.collapsed(
                    hintText: 'JSON',
                  ),
                  autocorrect: false,
                  autofocus: false,
                  onChanged: (t) => this.input = t,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
