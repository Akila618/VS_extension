import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
export function activate(context: vscode.ExtensionContext) {

	console.log('GUI extension is now active!');

	// const disposable = vscode.commands.registerCommand('sample.helloWorld', () => {
	// 	vscode.window.showInformationMessage('Hello World from sample- updated!');
	// });

	// context.subscriptions.push(disposable);
	context.subscriptions.push(
        vscode.commands.registerCommand('sample.openGUI', () => {
            const panel = vscode.window.createWebviewPanel(
                'pythonIntegrationGUI', // Identifier
                'Python Integration GUI', // Title
                vscode.ViewColumn.One, // Column to show in
                { enableScripts: true } // Enable JS in Webview
            );

            // HTML content for the Webview
            panel.webview.html = getWebviewContent(panel.webview, context.extensionPath, 'index');
        })
    );
}

function getWebviewContent(webview: vscode.Webview, extensionPath: string, viewName: string): string {
    const htmlPath = path.join(extensionPath, 'src' ,'res', 'html', `${viewName}.html`);
    let htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    // Replace placeholders (optional) for dynamic content
    htmlContent = htmlContent.replace(
        /{{baseUri}}/g,
        webview.asWebviewUri(vscode.Uri.file(path.join(extensionPath, 'resources'))).toString()
    );

    return htmlContent;
}


export function deactivate() {}
