const express = require('express');
const app = express();
const http = require('http'); // for creating a server
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

app.use(express.json());
app.use(cors());
const dbService = require('./dbService');
const { request } = require('express');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // or 'Client'
});

const server = http.createServer(app); // wrap express in HTTP server
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

//app.listen(process.env.PORT, () => console.log('app is running'));
app.set('io', io);

// Routes and DB logic go here...

server.listen(process.env.PORT || 7000, () => {
    console.log(`Server running on port ${process.env.PORT || 7000}`);
});

io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
});

app.get('/loadForkTable/:name', (request, response) => {
    const db = dbService.getDbServiceInstance();

    const result = db.loadForkTable();

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});


app.get('/loadForkInfo/:ID', (request, response) => {
    const { ID } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.loadForkInfo(ID);

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});



app.get('/loadAllData', (request, response) => {
    const db = dbService.getDbServiceInstance();

    const result = db.loadAllData();

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});


app.post('/insertForklift', (request, response) => {
    const { id } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.insertForklift(id);

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});

app.post('/updateID/:forkID', async (request, response) => {
    const newID = request.body.ID;
    const oldID = request.params.forkID;

    const db = dbService.getDbServiceInstance();

    const result = await db.updateID(newID, oldID);

    const updatedData = await db.loadAllData();
    const io = request.app.get('io');
    io.emit('forklift-update', updatedData);

    response.json({ success: result });
});

app.post('/updateName/:forkID', async (request, response) => {
    const newName = request.body.name;
    const ID = request.params.forkID;

    const db = dbService.getDbServiceInstance();

    const result = await db.updateName(newName, ID);

    const updatedData = await db.loadAllData();
    const io = request.app.get('io');
    io.emit('forklift-update', updatedData);

    response.json({ success: result });
});

app.post('/updateStatus/:forkID', async (request, response) => {
    const status = request.body.status;
    const ID = request.params.forkID;

    const db = dbService.getDbServiceInstance();

    const result = await db.updateStatus(status, ID);

    const updatedData = await db.loadAllData();
    const io = request.app.get('io');
    io.emit('forklift-update', updatedData);

    response.json({ success: result });
});

app.post('/updateLat/:forkID', async (request, response) => {
    const newLat = request.body.lat;
    const ID = request.params.forkID;

    const db = dbService.getDbServiceInstance();

    const result = await db.updateLat(newLat, ID);

    const updatedData = await db.loadAllData();
    const io = request.app.get('io');
    io.emit('forklift-update', updatedData);

    response.json({ success: result });
});

app.post('/updateLng/:forkID', async (request, response) => {
    const newLng = request.body.lng;
    const ID = request.params.forkID;

    const db = dbService.getDbServiceInstance();

    const result = await db.updateLng(newLng, ID);

    const updatedData = await db.loadAllData();
    const io = request.app.get('io');
    io.emit('forklift-update', updatedData);

    response.json({ success: result });
});

app.post('/deleteForklift', async (request, response) => {
    const { id } = request.body;

    const db = dbService.getDbServiceInstance();

    const result = await db.deleteForklift(id);
    
    const updatedData = await db.loadAllData();
    const io = request.app.get('io');
    io.emit('forklift-update', updatedData);

    response.json({ data: true });
});


