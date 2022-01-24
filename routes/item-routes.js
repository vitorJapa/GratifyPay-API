const express = require('express');
const {addItem,
        getAllItem,
        getItem,
        updateItem,
        deleteItem
      } = require('../controllers/itemController');

const router = express.Router();

router.post('/item', addItem );
router.get('/items', getAllItem);
router.get('/item/:id', getItem);
router.put('/item/:id', updateItem);
router.delete('/item/:id', deleteItem);


module.exports = {
    routes: router
}