#PII Log 
A basic nodejs app demonstrating some (4) implementation technics to prevent logging (Personally Identifiable Info) PII. Like emails, names, phone numbers, Social Insurance Numbers etc. 

These include:
1. Overriding toString() method with method that omits any PII
2. Using a custom logger that removes any identified PII before logging
3. Implementing API's that does not include PII in Url: like using POST instead of GET when sending PII (e.g email) so you include PII in body not url
4. Logging error.stack instead of the whole error, when general errors are caught in try-catch block

I read this blog for inspiration before implementing this.

Reference: 
- https://medium.com/@joecrobak/seven-best-practices-for-keeping-sensitive-data-out-of-logs-3d7bbd12904
###How to run the program:
1. Download and install nodejs from https://nodejs.org/en/
2. On terminal, change directory to this project directory: `cd <path to directory>`
3. Run app: `npm run start`
4. Test: Open an api tester like postman to send post & get requests
- base api: http://localhost:3000
- Add person:
   * POST method: /add-person/
   * body: { firstname: 'js', lastname: 'last', email: 'email@gmail.com', phone: 5145556667, address: 'abracadabra' }
   * You can add as many as you want
- Get person (by id):
   * GET method: /get-person/:id
   * Replace the :id with the id of the person you created (returned upon creation)
- Get person by email:
   * POST method: /get-person-by-email/
   * body: { email: 'email@gmail.com' }
   
Check the console of the program, logs are being created but PII is not being logged.
