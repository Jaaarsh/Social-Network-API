const {Thought, User} = require('../models');

// Thoght controller
const thoughtController = {
    createThought({params, body}, res) {
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate({ _id: params.userId}, {$push: {thoughts: _id}}, {new: true});
        })
        .then(thoughtData => {
            if(!thoughtData) {
                res.status(404).json;
                return;
            }
            res.json(thoughtData)
        })
        .catch(err => res.json(err));
    },

    getAllThought(req,res) {
        Thought.find({})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(thoughtData => res.json(thoughtData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    getThoughtById({params}, res) {
        Thought.findOne({ _id: params.id })
        .populate({path: 'reactions',select: '-__v'})
        .select('-__v')
        .then(thoughtsData => {
            if(!thoughtsData) {
            res.status(404).json({message: 'No thoughts with this ID!'});
            return;
        }
        res.json(thoughtsData)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },


    updateThought({params, body}, res) {
        Thought.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-___v')
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({message: 'No thought with this ID'});
                return;
            }
                res.json(thoughtData);
        })
        .catch(err => res.json(err));
    },


    deleteThought({params}, res) {
        Thought.findOneAndDelete({_id: params.id})
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({message: 'No thought with this ID'});
                return;
            }
            res.json(thoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    addReaction({params, body}, res) {
        Thought.findOneAndUpdate({_id: params.thoughtId}, {$push: {reactions: body}}, {new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(thoughtData => {
        if (!thoughtData) {
            res.status(404).json({message: 'No thought with this ID'});
            return;
        }
        res.json(thoughtData);
        })
        .catch(err => res.status(400).json(err))

    },

    deleteReaction({params}, res) {
        Thought.findOneAndUpdate({_id: params.thoughtId}, {$pull: {reactions: {reactionId: params.reactionId}}}, {new : true})
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({message: 'No thought with this ID'});
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => res.status(400).json(err));
    }

};

module.exports = thoughtController;