const { Schema, model, Types } = require('mongoose');

const moment = require('moment');

const reactionsSchema = new Schema(
  {
  reactionId: {
      type: Schema.Types.ObjectId,
      default: ()=> new Types.ObjectId()
  },
  reactionBody: {
      type: String,
      required: true,
      maxlength: 280
  },
  username: {
      type: String,
      required: true
  },
  createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
  },
});

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
  },
  username: {
    type: String,
    required: true
  },
  reactions: [reactionsSchema]
})



thoughtSchema.virtual('reactionCount').get(() => {
    return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
