const database = require('../config/database');

exports.createOneComment = (req, res) => {
    const { content, user_id, post_id } = req.body;
    database.query('INSERT INTO comments (content, user_id, post_id, comment_date) VALUES (?, ?, ?, NOW())',
    [content, user_id, post_id],
    (err, result) => {
        if (err) {
            res.status(404).send(err);
        }
        res.status(200).send(result);
    });
}

exports.getAllComments = (req, res) => {
    database.query('SELECT * FROM comments ORDER BY comment_date', (err, result) => {
        if (err) {
            res.status(404).send(err);
        }
        res.status(200).send(result);
    });
}
exports.getOneComment = (req, res) => {
    const id = req.params.id;
    database.query('SELECT * FROM comments WHERE comment_id = ?', [id], (err, result) => {
        if (err) {
            res.status(404).json({ err });
            throw err;
        }
        res.status(200).send(result);
    });
}

exports.deleteOneComment = (req, res) => {
    const { id: commentId } = req.params;
    database.query('DELETE FROM comments WHERE comment_id = ?', [commentId], (err, result) => {
        if (err) {
            res.status(404).json({ err });
            throw err;
        }
        if (result) {
            res.status(200).json(result);
        }
    });
}