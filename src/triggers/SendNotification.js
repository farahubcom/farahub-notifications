const { Trigger } = require('@farahub/framework/foundation');

class SendNotification extends Trigger {

    /**
     * Name of the task
     * 
     * @var string
     */
    name = "Send notification";

    /**
     * Identifier of the task
     * 
     * @var string
     */
    identifier = "send-notification";

    /**
     * Handle the task
     * 
     * @return bool
     */
    handle(params, data) {
        console.log('Sending notification with params & data:: ' + JSON.stringify({ data, params }));
        // 
    }
}

module.exports = SendNotification;