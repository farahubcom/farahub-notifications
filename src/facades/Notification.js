const NotificationHandler = require("../models/NotificationHandler");
const DatabaseChannel = require('../channels/DatabaseChannel');
const MailChannel = require('../channels/MailChannel');
const SmsChannel = require('../channels/SmsChannel');


class Notification {

    /**
     * All available notification channels
     * 
     * @var Object
     */
    static channels = {
        database: DatabaseChannel,
        // mail: MailChannel,
        sms: SmsChannel
    }

    // /**
    //  * Notification channels default configs
    //  * 
    //  * @var Object
    //  */
    // static defaultConfig = {
    //     mail: {
    //         host: 'mail.mortezavahdati.ir',
    //         port: 587,
    //         auth: {
    //             user: 'test@mortezavahdati.ir',
    //             pass: 'MA1996fa@1234',
    //         },
    //         secure: false,
    //         tls: { rejectUnauthorized: false },
    //     },
    //     sms: {
    //         //
    //     }
    // };

    /**
     * Register A Notify method for send notification
     * 
     * @param {object} config
     * @returns {function} return middleware
     */
    static register(app, workspace, connection, config) {

        /**
         * User data for send notification
         * 
         * @param notification
         */
        return notification => (
            new NotificationHandler(app, workspace, connection, config, notification)
        ).setChannels(this.channels).handle()
    }
}

module.exports = Notification;