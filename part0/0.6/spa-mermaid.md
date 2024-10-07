```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: {"content":"hello3","date":"2024-10-07T12:05:01.567Z"}
    deactivate server
```
