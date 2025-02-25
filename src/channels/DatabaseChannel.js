class DatabaseChannel {

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
    constructor(app, connection, config) {
        this.app = app;
        this.connection = connection;

        // if (!('database' in config)) {
        //     throw new Error('database config is mixing')
        // }

        //
    }

    /**
     *
     * @param {User} notifiable
     * @param {Notification} notification
     */
    async send(notifiable, notification) {

        const User = this.app.model("User");

        // send message only if notifiable exist
        if (notifiable && (notifiable instanceof User)) {

            let message = notification.toDatabase(notifiable);

            const Notification = this.connection.model("Notification");
            
            await Notification.create({
                notifiable: notifiable.id,
                data: JSON.stringify(message),
                createdAt: new Date()
            });
        }
    }
}

module.exports = DatabaseChannel;