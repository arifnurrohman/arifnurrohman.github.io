var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BPJERV5wJKvkpko9Aiq7bQY67xbIODRZarpde2z5aVORKlnMsjFm-8H0s9Q_Z8P1jAUnF2aiyESwijtd1QYyYwA",
    "privateKey": "b83005aev7j6eblZ9ydxQMuP1-p_Pftlwkp82VvaEUc"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/dom0uAc4NZE:APA91bHUcFAF-WMEqfWmTi6qN0PdfIkP8JUifcVV5rvnNyuoK5PKI4RvZR7NJ_c5ZalH8LEENXUHm4e0y-I1cmKshxG1KLyhnwQ-6OAz-QtWbbQ_Z-Qkj1mDlMqYGebEv_Z7Rjw3NSfy",
    "keys": {
        "p256dh": "BL4SSMWplxvhswnzGmFN4SlOrJhqiDCRmD5i7zHMwuneV+eRsMPnyVLppnhyPmzGxlfAgbm+NHkJ+GW6crCpBeY=",
        "auth": "2XXst23XkQ2/7gRG/dkmYw=="
    }
};
var payload = 'Selamat Data Di Soccer Info';

var options = {
    gcmAPIKey: '250356512739',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);