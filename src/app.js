const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

const Logger = require('./logger');
const { v4: uuidv4 } = require('uuid');
const Person = require('./person');

const DB = new Map();

app.get('/', function (req, res){
   res.send('App is running!');
});

app.post('/add-person/', function (request, response) {
    try{
        const body = request.body;
        if(body) {
            let pass = true;
            DB.forEach( (value, key) =>{
                if(value.email === body.email) pass = false;
            });

            if(pass) {
                const person = new Person(uuidv4(), body.firstname, body.lastname, body.email, body.phone, body.address);
                DB.set(person.id, person);
                Logger.info('new person created', person);          //this will log out id of user since Person.toString is overriden
                response.status(201).send(person);
            } else {
                response.status(400).send('user already exists');
            }
        } else {
            response.status(400).send('invalid body');
        }
    } catch (e) {
        // don't print whole error or e.message to avoid data leak. Source of error will be found by stack trace
        Logger.error('add-person error', e.stack);
        response.status(500).end();
    }
});

//using id in url instead of pii like email to get user
app.get('/get-person/:id', function (req, res){
    try{
        const id = req.params.id;
        Logger.info('Calling get-person with id: ', id);  // at least logging id than pii
        if(DB.has(id)) {
            const person = DB.get(id);
            res.status(200).send(person);
        } else {
            res.status(404).send('invalid id');
        }
    } catch (e) {
        Logger.error('get-person error', e.stack);
        res.status(500).end();
    }
});

app.post('/get-person-by-email/', function (req, res) {
    try{
        const body = req.body;
        //sending email as body rather than in url. Does break REST principle GET vs POST but adds abit more security
        if(body && body.email) {
            Logger.info('Called get-person-by-email ', body.email);     // this should not log the email
            let person;
            for(let value of DB.values()) {
                if(value.email === body.email) {
                    person = value;
                    break;
                }
            }
            if(person) res.status(200).send(person);
            else res.sendStatus(404);
        } else {
            res.status(400).send('missing email argument');
        }

    } catch (e) {
        Logger.error('get-person-by-email error', e.stack);
        res.status(500).end();
    }
});

app.listen(3000, ()=>{
    console.log('App listening at http://localhost:3000')
});
