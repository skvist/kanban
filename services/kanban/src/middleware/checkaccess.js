var Item = require('../models/item');
var Board = require('../models/board');

/**
 * Middleware for verifying the user based on token.
 *
 * @return error or next()
 */
module.exports = () => {
    return async (req, res, next) => {
        // console.log(req.decoded);

        if (!req.decoded) {
            return res.status(403).send({
                success: false,
                status: 403,
                title: "NoDecodedTOken",
                description: 'No decoded JWT token found',
            });
        }

        const username = req.decoded.username;

        //console.log('Decoded: ', req.decoded);
        // First we get the item and retrive the board id that we want to check
        const boardId = await Item.findById(req.params.id, (err, item) => {
            if (err) {
                console.log(err);
                return res.json({ success: false, title: err.name, message: err.message });
            } else if (!item) {
                return res.json({
                    success: false,
                    title: "ItemDoesNotExist",
                    message: `The Item with does not exist.`
                });
            }
            //console.log(item.board);
            return item;
        });

        //console.log('item boardID: ', boardId.board);

        // Then we get the board so that we can check if the owner and/or users
        // have access to the board/item.
        // console.log('item boardID: ', boardId.board);
        const board = await Board.findById(boardId.board, (err, document) => {
            if (err) {
                console.log(err);
                return res.json({ success: false, title: err.name, message: err.message });
            } else if (!document) {
                return res.json({
                    success: false,
                    title: "BoardDoesNotExist",
                    message: `The Board with does not exist.`
                });
            }
            // console.log('Board:', document);
            return document;
        });

        // console.log('board owner: ', board.owner);
        // console.log('board users: ', board.users);

        if (board.owner === username || board.users.indexOf(username) > -1) {
            return next();
        } else {
            return res.status(403).send({
                success: false,
                status: 403,
                title: "NotAuthorized",
                description: 'You are not authorized.',
            });
        }
    };
};
