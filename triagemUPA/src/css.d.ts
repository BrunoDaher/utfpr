// Declares CSS files as valid side-effect modules so TypeScript
// doesn't error on bare `import './some-file.css'` statements.
declare module '*.css' {}
