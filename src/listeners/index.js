const NotificationCreated = require("../events/NotificationCreated");
const BroadcastNotificationCreated = require("./BroadcastNotificationCreated");


module.exports = new Map([
    [
        NotificationCreated, [
            BroadcastNotificationCreated,
        ],
    ]
]);