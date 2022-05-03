const database = require('../config/database');

exports.getAllPosts = (req, res) => {
    database.query('SELECT * FROM posts ORDER BY post_date', (err, result) => {
        if (err) {
            res.status(404).send(err);
        }
        res.status(200).send(result);
    });
};
exports.getOnePost = (req, res) => {
    
    const id = req.params.id;
    database.query('SELECT * FROM posts WHERE post_id = ?', [id], (err, result) => {
        if (err) {
            res.status(404).json({ err });
            throw err;
        }
        res.status(200).send(result);
    });
}

// faire les images plus tard grace a multer
exports.createOnePost = (req, res) => {
    
    const { content, user_id } = req.body;
    const {file} = req;
    database.query('INSERT INTO posts (content, user_id) VALUES (?, ?)',
    [content, user_id],
    (err, result) => {
        if (err) {
            res.status(404).send(err);
        }
        if(file){
            database.query('UPDATE posts SET post_file = ? WHERE post_id = ?', [file, result.insertId], (err, result) => {
                if (err) {
                    res.status(404).send(err);
                }
                res.status(200).send(result);
            });
        }        
        res.status(200).send(result);
    });
}

exports.deleteOnePost = (req, res) => {
    const { id: postId } = req.params;
    database.query('DELETE FROM posts WHERE post_id = ?', [postId], (err, result) => {
        if (err) {
            res.status(404).json({ err });
            throw err;
        }
        if (result) {
            res.status(200).json(result);
        }
    });
}