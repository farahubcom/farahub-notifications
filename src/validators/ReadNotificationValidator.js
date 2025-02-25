const mongoose = require("mongoose");
const { Doc } = require("@farahub/framework/facades");

const { ObjectId } = mongoose.Types;


class ReadNotificationValidator {

    /**
     * The validator rules
     * 
     * @returns {object}
     */
    rules() {
        return {
            notificationId: {
                in: ["params"],
                isMongoId: {
                    bail: true
                },
                custom: {
                    options: (value, { req }) => {
                        const Notification = req.wsConnection.model('Notification')

                        return Doc.resolve(value, Notification).then(notification => {
                            if (!notification)
                                return Promise.reject(false);
                            return Promise.resolve(true);
                        })
                    },
                    bail: true
                },
                customSanitizer: {
                    options: (value, { req }) => {
                        return ObjectId(value);
                    }
                }
            }
        }
    }

    /**
     * Custom validation formatter
     * 
     * @returns {func}
     */
    toResponse(res, { errors }) {
        return res.status(404).json({
            ok: false,
            message: 'Category not found'
        })
    }
}

module.exports = ReadNotificationValidator;