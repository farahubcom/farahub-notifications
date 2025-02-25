const { Socket } = require('@farahub/framework/foundation');


class MainSocket extends Socket {

    /**
     * The socket name
     * 
     * @var string
     */
    name = 'Main';

    /**
     * The socket events
     * 
     * @var array
     */
    events = [
        //
    ];

    /**
     * Get list or user workspaces
     * 
     * @param {*} req request
     * @param {*} res response
     * 
     * @return void
     */
    handler(socket) {
        return async function () {
            //
        }
    }
}

module.exports = MainSocket;