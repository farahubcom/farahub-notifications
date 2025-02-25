class NotificationCreated {

    /**
     * Created notification
     * 
     * @var Notification
     */
    notification;

    /**
     * Workspace connection
     * 
     * @var Connection
     */
    connection;

    /**
     * Create event instance
     * 
     * @constructor
     * @param {Notification} notification Created notification
     * @param {Connection} connection Workspace connection
     */
    constructor(notification, connection) {
        this.notification = notification;
        this.connection = connection;
    }
}

module.exports = NotificationCreated;