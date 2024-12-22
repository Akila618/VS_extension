import * as vscode from 'vscode';
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
            panel.webview.html = getWebviewContent();
        })
    );
}

function getWebviewContent(): string {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Python Integration</title>
        </head>
        <body>
            <h1>Python Integration GUI</h1>
            <form id="inputForm">
                <label for="input">Enter your input:</label>
                <input type="text" id="input" />
                <button type="button" onclick="sendInput()">Submit</button>
            </form>
            <script>
                const vscode = acquireVsCodeApi();
                function sendInput() {
                    const input = document.getElementById('input').value;
                    vscode.postMessage({ command: 'submitInput', value: input });
                }
            </script>
        </body>
        </html>
    `;
}


export function deactivate() {}
