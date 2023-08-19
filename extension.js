const vscode = require("vscode");
const fs = require("fs");
const path = require("path");

function getDependenciesFromPackageJson() {
  let workspaceFolders = vscode.workspace.workspaceFolders;
  if (workspaceFolders) {
    let rootPath = workspaceFolders[0].uri.fsPath;
    let packageJsonPath = path.join(rootPath, "package.json");

    if (fs.existsSync(packageJsonPath)) {
      let packageJson = require(packageJsonPath);
      return packageJson.dependencies ? Object.keys(packageJson.dependencies) : [];
    }
  }
  return [];
}

function getJsFilesFromDirectory(directory) {
  let jsFiles = [];
  let files = fs.readdirSync(directory);

  for (let file of files) {
    let fullPath = path.join(directory, file);
    let stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      jsFiles = jsFiles.concat(getJsFilesFromDirectory(fullPath));
    } else if (path.extname(file) === ".tsx" || path.extname(file) === ".js") {
      jsFiles.push(fullPath);
    }
  }

  return jsFiles;
}

function extractImportedItemsFromContent(content) {
  let importedItems = [];
  let importMatches = content.match(/import {(.*?)} from ['"](.*?)['"]/g);

  if (importMatches) {
    importMatches.forEach((match) => {
      let importMatch = /import {(.*?)} from ['"](.*?)['"]/.exec(match);
      if (importMatch && importMatch[1]) {
        importedItems.push(...importMatch[1].split(",").map((item) => item.trim()));
      }
    });
  }

  return importedItems;
}

function findRangesOfImportedItemsInContent(content, importedItems, document) {
  let ranges = [];

  // Find where the 'return' content starts in the original document.
  const returnStartPosInDocument = document.getText().indexOf(content);

  importedItems.forEach((item) => {
    let itemUsageRegex = new RegExp(`<${item}[^>]*?(?:[^<]*?)<\/${item}>|<${item}[^>]*\/>`, "gs");
    let match;

    while ((match = itemUsageRegex.exec(content)) !== null) {
      let start = returnStartPosInDocument + content.indexOf(match[0]);
      let end = start + match[0].length;

      let startPos = document.positionAt(start);
      let endPos = document.positionAt(end);

      ranges.push(new vscode.Range(startPos, endPos));
    }
  });

  return ranges;
}

function extractReturnContent(fileContent) {
  const returnMatch = fileContent.match(/return\s*\(([\s\S]*?)\)\s*;/);
  if (returnMatch && returnMatch[1]) {
    return returnMatch[1];
  }
  return "";
}

function checkImportsInFiles() {
  let workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders) return;

  let rootPath = workspaceFolders[0].uri.fsPath;
  let srcPath = path.join(rootPath, "src");

  if (!fs.existsSync(srcPath)) {
    vscode.window.showInformationMessage("Couldn't find a 'src' directory.");
    return;
  }

  let activeEditor = vscode.window.activeTextEditor;
  if (!activeEditor) {
    return; // Exit if there's no active editor
  }

  let document = activeEditor.document;
  let jsFiles = getJsFilesFromDirectory(srcPath);

  let highlightDecorationType = vscode.window.createTextEditorDecorationType({
    backgroundColor: "rgba(220,220,220,.35)",
    isWholeLine: false,
  });

  jsFiles.forEach((filePath) => {
    let content = fs.readFileSync(filePath, "utf-8");
    let returnContent = extractReturnContent(content);
    let importedItems = extractImportedItemsFromContent(content);
    let ranges = findRangesOfImportedItemsInContent(returnContent, importedItems, document);
    console.log(ranges, "ranges");

    if (ranges.length > 0) {
      activeEditor.setDecorations(highlightDecorationType, ranges);
    }
  });
}

function activate(context) {
  console.log('Congratulations, your extension "liblinkerjs" is now active!');

  let disposable = vscode.commands.registerCommand("liblinkerjs.checkImports", function () {
    let dependencies = getDependenciesFromPackageJson();
    console.log(dependencies, "dependencies");
    checkImportsInFiles();
  });

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = { activate, deactivate };
