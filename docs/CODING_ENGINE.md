# Coding Engine

The Coding Engine (`js/codingEngine.js`) provides a client-side execution environment to test user-submitted JavaScript code against predefined test cases. It is used as the final phase in the "Coding Challenge" mode.

## Architecture

1. **Web Worker Isolation**
   To ensure that the execution of arbitrary user code does not block the main UI thread (e.g. from infinite loops) and has limited access to the DOM, the engine dynamically constructs a Web Worker payload containing the user's code.

2. **Execution Flow**
   - The user inputs their solution.
   - `codingEngine.executeCode(code, testCases)` is invoked.
   - The user's code is extracted and injected into a blob string.
   - A `Worker` is spun up from a `Blob` URL.
   - Test cases are passed to the worker via `postMessage`.
   - The worker executes the target function against the provided arguments, capturing successes, failures, and runtime errors.
   - Results are sent back to the main thread via `postMessage`.

3. **Timeouts**
   A timeout (e.g., 2000ms) wraps the execution promise. If the worker does not post back a response within the limit, it is automatically terminated, protecting the application from freezing.

## Test Cases
A test case follows a simple structure:
```json
{
  "args": [[1, 2, 3], 2],
  "expected": [2, 4, 6]
}
```

## Security Considerations
Refer to `SECURITY.md` for detailed security caveats regarding the use of Web Workers.
