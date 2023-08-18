const vscode = require("vscode");
function activate(context) {
  console.log('Congratulations, your extension "liblinkerjs" is now active!');
  let disposable = vscode.commands.registerCommand("liblinkerjs.helloWorld", function () {
    vscode.window.showInformationMessage("Hello World from LibLinkerJS!");
  });
  context.subscriptions.push(disposable);
}
function deactivate() {}

module.exports = { activate, deactivate };
