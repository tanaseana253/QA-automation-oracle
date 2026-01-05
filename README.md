## API Testing (Postman)

This project includes automated API tests created using Postman.

### Tested Endpoints
- POST /projects – create a new project
- GET /projects – retrieve all projects

### Test Coverage
- Validated HTTP status codes (200, 201)
- Validated response structure and data types
- Extracted dynamic project ID from POST response
- Stored and reused variables using Postman environments
- Verified data persistence by asserting created projects exist in GET responses

### Example Test Flow
1. Send POST request to create a project
2. Capture returned project ID dynamically
3. Send GET request and assert the created project exists in the response

### Screenshots
![Postman API Tests Passed](postman-get-test-passed.jpg)
![Postman API Tests Passed](postman-post-test-passed.jpg)
