# Coding Engine

The Coding Engine (`js/codingEngine.js`) provides a client-side execution environment to test user-submitted JavaScript code against predefined test cases. It is used as the core for the "Coding Challenge" mode.

## Architecture

1. **Web Worker Isolation**
   To ensure that the execution of arbitrary user code does not block the main UI thread (e.g. from infinite loops) and has limited access to the DOM, the engine dynamically constructs a Web Worker payload containing the user's code.

2. **Execution Flow**
   - The UI loops through 5 distinct coding problems based on role (SE/DA) and difficulty.
   - For each problem, the user inputs their solution.
   - `codingEngine.executeCode(code, testCases)` is invoked.
   - The user's code is extracted and injected into a blob string.
   - Importantly, **`eval()` and `new Function()` are NOT used**. The code string is directly serialized into the Blob and executed natively as JavaScript.
   - A `Worker` is spun up from the `Blob` URL.
   - Test cases are passed to the worker via `postMessage`.
   - The worker executes the target function against the provided arguments, comparing the result via `JSON.stringify` to determine deep equality.
   - Results are sent back to the main thread via `postMessage`.
   - After intermediate feedback, the UI progresses to the next question.

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
Refer to `SECURITY.md` for detailed security caveats regarding the use of Web Workers without `eval`.
