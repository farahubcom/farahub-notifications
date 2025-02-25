const NotificationHandler = require("./NotificationHandler");
const DatabaseChannel = require('../channels/DatabaseChannel');
const MailChannel = require('../channels/MailChannel');
const SmsChannel = require('../channels/SmsChannel');


class Notification {

    // /**
    //  * All available notification channels
    //  * 
    //  * @var Object
    //  */
    // static channels = {
    //     database: DatabaseChannel,
    //     mail: MailChannel,
    //     sms: SmsChannel
    // }

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

    // /**
    //  * Register A Notify method for send notification
    //  * 
    //  * @param {object} config
    //  * @returns {function} return middleware
    //  */
    // static register(app, config = this.defaultConfig) {

    //     /**
    //      * User data for send notification
    //      * 
    //      * @param notification
    //      */
    //     return notification => (
    //         new NotificationHandler(app, this, config || this.defaultConfig, notification)
    //     ).setChannels(this.channels).handle()
    // }

    /**
     * Create new notification
     * 
     * @returns {Promise<Notification>} Created notification
     */
    static async createNew(data, { connection, inject }) {
        try {
            const Notification = this.model('Notification');

            // create instance
            const notification = new Notification(data);

            // inject pre save hooks
            await inject('preSave', { notification, data })

            // save document
            await notification.save();

            // inject post save hooks
            await inject('postSave', { notification, data })

            // return modified notification
            return notification;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Mark notification as reac
     * 
     * @returns void
     */
    async markAsRead() {
        this.readAt = new Date();

        await this.save();
    }

    //
}

module.exports = Notification;