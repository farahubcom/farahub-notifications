const { Listener } = require('@farahub/framework/foundation');


class BroadcastNotificationCreated extends Listener {

    /**
     * handle the event
     * 
     * @param {Login} event event
     */
    async handle(event) {

        this.app.io.sockets
            .to("user:".concat(event.notification.notifiable))
            .emit('notifications:notificationCreated', { notification: event.notification });

        //
    }
}


module.exports = BroadcastNotificationCreated;