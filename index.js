require('dotenv').config()
const webpush = require('web-push');

const app = require('express')();
app.use(require('body-parser').json());

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webpush.setVapidDetails('mailto:saurabhdaware99@gmail.com', publicVapidKey, privateVapidKey);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
  

app.post('/subscribe', (req, res) => {
    const subscription = req.body;
    res.status(201).json({});

    const payload = JSON.stringify({
        title: 'Title Comming from backend!', 
        body: "Body coming from backend!!"
    });

    webpush.sendNotification(subscription, payload)
        .catch(error => {
            console.error(error.stack);
        });
});

app.listen(process.env.PORT || 3000, () => console.log("Server running :D"));