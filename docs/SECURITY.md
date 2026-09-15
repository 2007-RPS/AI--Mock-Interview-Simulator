# Security Model

The AI-Style Mock Interview Simulator is a client-side application. As a result, its security model primarily concerns the safe execution of dynamic features and avoiding user-generated code vulnerabilities.

## Coding Challenge Execution

The Coding Challenge allows users to submit custom JavaScript which is executed by the system.

### Web Worker "Sandbox"
Code evaluation happens entirely within a Web Worker instantiated via a Blob URL.
- **Benefits:**
  - Isolates the user's script from the main DOM (document, window).
  - Protects the main application state and CSS from being tampered with.
  - Allows us to forcefully terminate the execution (`worker.terminate()`) if it encounters an infinite loop.
- **Limitations:**
  - A Web Worker is NOT a complete security sandbox. 
  - This implementation provides demonstration-level isolation and prevents the coding task from blocking the main UI thread, but it is not equivalent to a production-grade secure code execution sandbox (e.g., a Dockerized backend runner or an iframe with a restrictive Content Security Policy).

### Dynamic Code Execution Practices
To adhere to secure execution best practices:
- The `eval()` function is strictly prohibited in the codebase.
- The `new Function()` constructor has been removed. User code is injected as a parsed string when initializing the Web Worker.
- Functions like `document.write` or assignment to `innerHTML` with unsanitized user content are avoided.
