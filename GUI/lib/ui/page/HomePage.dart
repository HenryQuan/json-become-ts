import 'package:GUI/core/converter/Converter.dart';
import 'package:GUI/core/converter/WritterDart.dart';
import 'package:GUI/core/converter/WritterKotlin.dart';
import 'package:GUI/core/converter/WritterTS.dart';
import 'package:GUI/ui/page/AboutPage.dart';
import 'package:GUI/ui/widget/OutputWidget.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:url_launcher/url_launcher.dart';

/// HomePage class
class HomePage extends StatefulWidget {
  HomePage({Key? key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  String input = '';
  String output = '';
  String jsonName = '';
  bool forceMap = false;
  // This handles pasting text from clipboard
  final controller = TextEditingController();
  // This is for indicating the text field of name input
  final nameKey = GlobalKey<FormState>();
  // For web, divider needs to be at least 1 in length to be visible
  final double dividerLength = kIsWeb ? 1 : 0;

  int selectedChip = 0;
  final List<Converter> converters = [
    Converter(
        'Dart',
        (String jsonString, String jsonName, int threshold) =>
            WritterDart(jsonString, jsonName, threshold)),
    Converter(
        'TypeScript',
        (String jsonString, String jsonName, int threshold) =>
            WritterTS(jsonString, jsonName, threshold)),
    Converter(
        'Kotlin',
        (String jsonString, String jsonName, int threshold) =>
            WritterKotlin(jsonString, jsonName, threshold)),
  ];

  @override
  Widget build(BuildContext context) {
    return Banner(
      location: BannerLocation.bottomEnd,
      message: 'WIP',
      color: Colors.blue,
      child: Scaffold(
        appBar: AppBar(
          title: Text('JSON: Become TS'),
          leading: IconButton(
            icon: Icon(Icons.help_outline),
            onPressed: () {
              showDialog(
                context: context,
                builder: (BuildContext context) {
                  // return object of type Dialog
                  return AlertDialog(
                    title: Text('How does it work?'),
                    content: Text(
                        'JSON: Become TS helps you to generate classes that you can use as a base.\nSimply paste your json string and give it a name. Then, choose the language you want to convert to and press Convert.\n' +
                            'This is not perfect and often you need to adjust generated classes manually.\n\n' +
                            'If you have found any issues, please open an issue on GitHub.\nHenry'),
                    actions: [
                      TextButton(
                        child: new Text('GitHub'),
                        onPressed: () {
                          launch(
                            'https://github.com/HenryQuan/json-become-ts/issues',
                          );
                          Navigator.of(context).pop();
                        },
                      ),
                      TextButton(
                        child: new Text('OK'),
                        onPressed: () {
                          Navigator.of(context).pop();
                        },
                      ),
                    ],
                  );
                },
              );
            },
            tooltip: 'How does it work',
          ),
          actions: <Widget>[
            IconButton(
              icon: Icon(Icons.info_outline),
              onPressed: () => Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (c) => AboutPage(),
                  fullscreenDialog: true,
                ),
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
      ),
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
                    children: [
                      ConstrainedBox(
                        constraints: BoxConstraints(maxHeight: 64),
                        child: ListView.builder(
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
                      Expanded(child: OutputWidget(output: output)),
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
            child: TextButton.icon(
              icon: Icon(Icons.content_paste),
              label: Text('Paste'),
              onPressed: () {
                // Paste text into input
                Clipboard.getData(Clipboard.kTextPlain).then((value) {
                  final clipboardText = value?.text ?? '';
                  controller.text = clipboardText;
                  // NOTE: Update input as well here so that it won't be null because text field wasn't changed
                  this.input = clipboardText;
                });

                // Clear up outputs
                setState(() {
                  this.output = '';
                });
              },
            ),
          ),
        ),
        Expanded(
          child: Tooltip(
            message: 'JSON -> Code',
            child: TextButton.icon(
              icon: Icon(Icons.compare_arrows),
              label: Text('Convert'),
              onPressed: () {
                if (nameKey.currentState?.validate() ?? false) {
                  final writter = converters[selectedChip].writter(
                      this.input, this.jsonName, this.forceMap ? 0 : 10);
                  if (writter.isValid()) {
                    setState(() {
                      this.output = writter.toString();
                    });
                  } else {
                    // Select the line that has an error
                    controller.selection =
                        writter.errorSelection(input) ?? TextSelection;
                    // Show a snack bar
                    ScaffoldMessenger.of(context).showSnackBar(
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
            child: TextButton.icon(
              icon: Icon(Icons.content_copy),
              label: Text('Copy'),
              onPressed: () {
                String text = "Nothing was copied...";
                Clipboard.setData(ClipboardData(text: this.output));
                text = "Output has been copied :)";

                // Show a snack bar
                ScaffoldMessenger.of(context).showSnackBar(
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
          Row(
            children: <Widget>[
              Expanded(
                child: Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: TextFormField(
                    validator: (value) {
                      if (value?.isEmpty ?? true) return '*name is necessary';
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
              Row(
                children: <Widget>[
                  Text('Force map'),
                  Checkbox(
                      value: this.forceMap,
                      onChanged: (mode) {
                        setState(() {
                          this.forceMap = mode ?? false;
                        });
                      }),
                ],
              ),
            ],
          ),
          Divider(height: dividerLength),
          Expanded(
            child: Container(
              margin: EdgeInsets.all(8),
              child: Scrollbar(
                child: TextFormField(
                  validator: (value) {
                    if (value?.isEmpty ?? true)
                      return '*this field must not be empty';
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
