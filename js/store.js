/**
 * Created by techbk on 27/01/2016.
 */

var Reflux = require('reflux');
var TodoActions = require('./actions');
var _ = require('lodash');


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
    },
    // called whenever we change a list.
    // normally this would mean a database API call
    updateList: function(list){
        localStorage.setItem(localStorageKey, JSON.stringify(list));
        this.list = list;
        this.trigger(list);
    },
    // this will be called by all listening components
    // as they register their listeners
    getDefaultData: function(){
        var loadedList = localStorage.getItem(localStorageKey);
        if (!loadedList) {
            // If no list is in localstorage, start out with a default one
            this.list = [{
                key: todoCounter++,
                created: new Date(),
                isComplete: false,
                label: 'Rule the web'
            }];
        } else {
            this.list = _.map(JSON.parse(loadedList), function(item) {
                // just resetting the key property for each todo item
                item.key = todoCounter++;
                return item;
            });
        }
        return this.list;
    }
});

module export todoListStore;