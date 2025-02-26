
const { Controller } = require('@farahub/framework/foundation');
const { Auth, Workspace, Injection, Validator, Doc } = require('@farahub/framework/facades');
const ReadNotificationValidator = require('../validators/ReadNotificationValidator')


class MainController extends Controller {

    /**
     * The controller name
     * 
     * @var string
     */
    name = 'Main';

    /**
     * The controller routes
     * 
     * @var array
     */
    routes = [
        {
            type: 'api',
            method: 'post',
            path: '/notification/:notificationId/markAsRead',
            handler: 'markAsRead'
        }
    ];

    /**
     * Mark notification as read
     * 
     * @param {*} req request
     * @param {*} res response
     * 
     * @return void
     */
    markAsRead() {
        return [
            Auth.authenticate('jwt', { session: false }),
            Workspace.resolve(this.app),
            Injection.register(this.module, 'main.markAsRead'),
            Validator.validate(new ReadNotificationValidator()),
            async function (req, res, next) {
                try {

                    const { wsConnection: connection } = req;
                    const Notification = connection.model('Notification');

                    const { notificationId } = req.params;

                    const notification = await Doc.resolve(notificationId, Notification);

                    await notification.markAsRead();

                    return res.json({ ok: true })
                } catch (error) {
                    next(error);
                }
            }
        ]
    }
}

module.exports = MainController;