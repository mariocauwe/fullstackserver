The port on which the express server will listen, is configured via the env variable PORT.

The root of the REST service is located at /api/persons

GET /api/persons
returns all persons

GET /api/persons/<id>
returns a specific person

GET /info
returns the number of persons

DELETE /api/persons/<id>
removes a specific person

POST /api/persons
adds a new person
