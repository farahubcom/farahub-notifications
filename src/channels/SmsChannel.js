const { SmsHandler } = require("@farahub/sms/facades");

class SmsChannel {

    /**
     * the application instance
     */
    app;

    /**
     * the workspace instance
     */
    workspace;

    /**
     * the db connection to access connection models
     */
    connection;

    /**
     * Create channel instance
     * 
     * @param {object} config 
     */
    constructor(app, workspace, connection, config) {
        this.app = app;
        this.workspace = workspace;
        this.connection = connection;

        // if (!('sms' in config)) {
        //     throw new Error('sms config is mixing')
        // }
    }

    /**
     *
     * @param notifiable
     * @param {Notification} notification
     */
    async send(notifiable, notification) {

        if (notifiable && notifiable.phone) {
            let data = notification.toSms(notifiable);

            const handler = SmsHandler.make(this.workspace, this.connection);
            const sms = await handler.sendMessage(data.content, [notifiable.phone]);

            if(typeof notification.afterSms == "function")
                notification.afterSms(sms);

            return sms;
        }
    }
}

module.exports = SmsChannel;