const nodemailer = require('nodemailer')

class MailChannel {

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

        // check mail config is exsits in config
        // if (!('mail' in config)) {
        //     throw new Error('mail config is mixing')
        // }

        this.transporter = nodemailer.createTransport(config.mail)
    }

    async sendEmail({ from, to, subject, html }) {
        await this.transporter.sendMail({ from, to, subject, html });
    };

    /**
     *
     * @param notifiable
     * @param {Notification} notification
     */
    async send(notifiable, notification) {

        const User = this.app.model("User");

        // send message only if notifiable exist & has email address
        if (notifiable && (notifiable instanceof User) && notifiable.email) {

            let message = notification.toMail(notifiable);

            await this.sendEmail(message);
        }
    }
}

module.exports = MailChannel;