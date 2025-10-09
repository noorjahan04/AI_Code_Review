export const LANGUAGE_VERSIONS = {
  javascript: "18.15.0",
  typescript: "5.0.3",
  nodejs: "18.16.0",
  python: "3.10.0",
  java: "15.0.2",
  cpp: "10.2.0", 
  c: "10.2.0",   
  html: "5.0",
  css: "3.0",
};

export const CODE_SNIPPETS = {
  javascript: `function greet(name) {
  console.log("Hello, " + name + "!");
}

greet("Alex");`,

  typescript: `type Params = {
  name: string;
}

function greet(data: Params) {
  console.log("Hello, " + data.name + "!");
}

greet({ name: "Alex" });`,

  nodejs: `const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello from Node.js\\n');
});

// Note: Server won't actually listen in Piston environment
console.log('Hello from Node.js!');
console.log('Server code ready (cannot bind to ports in Piston)');`,

  python: `def greet(name):
    print("Hello, " + name + "!")

greet("Alex")`,

  java: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}`,

  cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,

  c: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,

  html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello World</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>Welcome to HTML!</p>
</body>
</html>`,

  css: `body {
  background-color: #f0f0f0;
  color: #333;
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
}

h1 {
  color: #2c3e50;
  text-align: center;
}`,
};