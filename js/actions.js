/**
 * Created by techbk on 27/01/2016.
 */

var Reflux = require('reflux');
var TodoActions = Reflux.createActions([
    "toggleItem",
    "toggleAllItems",
    "addItem",
    "removeItem",
    "clearCompleted",
    "editItem"
]);

module.exports = TodoActions