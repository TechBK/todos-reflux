/**
 * Created by techbk on 27/01/2016.
 */

var Reflux = require('reflux')
var TodoActions = require('./actions')


// some variables and helpers for our fake database stuff
var todoCounter = 0,
    localStorageKey = "todos";

function getItemByKey(list, itemKey){
    return _.find(list, function(item){
        return item.key === itemKey;
    });
}

var todoListStore = Reflux.createStore({
    // this will set up listeners to all publicshers in TodoActions,
    // using onKeyname (or keyname) as callbacks.
    listenables: [TodoActions],
    onEditItem: function(itemKey, newLabel) {
        var foundItem = foundItem = getItemByKey(this.list, itemKey);
        if (!foundItem) {
            return;
        }
        foundItem.label = newLabel;
        thi.updateList(this.list);
    },
    onAddItem: function(label){
        thi.updateList([{
            key: todoCounter++,
            created: new Date(),
            isComplete: false,
            label: label
        }].concat(this.list));
    },
    onRemoveItem: function(itemKey){
        thi.updateList(_.filter(this.list, function(item){
            return item.key !== itemKey;
        }));
    },
    onToggleAllItems: function(checked){
        this.updateList(_.map(this.list, function(item){
            item.isComplete = checked;
            return item;
        }));
    },
    onClearCompleted: function(){
        this.updateList(_.filter(this.list, function(item){
            return !item.isComplete;
        }));
    }
})