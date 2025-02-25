const { Controller } = require('@farahub/framework/foundation');
const { Auth, Workspace, Injection, Validator, Lang } = require('@farahub/framework/facades');
const NotificationsListValidator = require('../validators/NotificationsListValidator');


class AuthenticatedController extends Controller {

    /**
     * The controller name
     * 
     * @var string
     */
    name = 'Authenticated';

    /**
     * The controller base path
     * 
     * @var string
     */
    basePath = '/self';

    /**
     * The controller routes
     * 
     * @var array
     */
    routes = [
        {
            type: 'api',
            method: 'get',
            path: '/notifications',
            handler: 'list',
        }
    ];

    /**
     * Get list or user notifications
     * 
     * @param {*} req request
     * @param {*} res response
     * 
     * @return void
     */
    list() {
        return [
            Auth.authenticate('jwt', { session: false }),
            Workspace.resolve(this.app),
            Injection.register(this.module, 'authenticated.list'),
            Validator.validate(new NotificationsListValidator()),
            async function (req, res, next) {
                try {

                    const { wsConnection: connection, inject } = req;
                    const Notification = connection.model('Notification');

                    const args = req.query;

                    let search = {
                        notifiable: req.user.id
                    };


                    if (args && args.unread) {
                        search = {
                            ...search,
                            readAt: null
                        }
                    }

                    const sort = args && args.sort ? args.sort : "-createdAt";

                    const query = Notification
                        .find(search)
                        .sort(sort);

                    const total = await Notification.find(search).count();

                    if (args && args.page > -1) {
                        const perPage = args.perPage || 25;
                        query.skip(args.page * perPage)
                            .limit(perPage)
                    }

                    let data = await query
                        .populate([
                            { path: 'references.reference' }
                        ])
                        .select('-__v -notifiable')
                        .lean({ virtuals: true });

                    data = Lang.translate(data);

                    return res.json({ ok: true, data, total })
                } catch (error) {
                    next(error);
                }
            }
        ]
    }
}

module.exports = AuthenticatedController;