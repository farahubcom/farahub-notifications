const mongoose = require("mongoose");
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');

const { Schema } = mongoose;
const { ObjectId } = mongoose.Types;

const NotificationSchema = new Schema({
    notifiable: { type: ObjectId, ref: 'User', required: true },
    title: { type: Map, of: String },
    content: { type: Map, of: String },
    url: { type: String },
    references: [{
        reference: {
            type: ObjectId,
            refPath: 'references.onModel'
        },
        onModel: String,
        url: String,
    }],
    readAt: Date,
    createdAt: { type: Date, required: true }
}, {

    /**
     * Name of the collection
     * 
     * @var string
     */
    collection: "notifications:notifications",
});

NotificationSchema.plugin(mongooseLeanVirtuals);

module.exports = NotificationSchema;