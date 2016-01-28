/**
 * Created by quang_000 on 28/01/2016.
 */

var ReactRouter = require('react-router');
var todoListStore = require('./store');
var TodoActions = require('./actions')

var routes = (
    <ReactRouter.Route handler={TodoApp}>
        <ReactRouter.Route name="All" path="/" handler={TodoMain} />
        <ReactRouter.Route name="Completed" path="/completed" handler={TodoMain} />
        <ReactRouter.Route name="Active" path="/active" handler={TodoMain} />
    </ReactRouter.Route>
);

ReactRouter.run(routes, function(Handler){
    React.render(<Handler/>, document.getElementById('todoapp'));
});


// Renders the full application
// RouteHandler will always be TodoMain,
// but with different 'showing' prop (all/completed/active)
var TodoApp = React.createClass({
    // this will cause setState({list:updatedlist})
    // whenever the store does trigger(updatedlist)
    mixins:[Reflux.connect(todoListStore, "list")],
    getInitialState: function(){
        return {
            list: []
        };
    },
    render: function(){
        return (
            <div>
                <TodoHeader />
                <ReactRouter.RouteHandler list={this.state.list} />
                <TodoFooter list={this.state.list} />
            </div>
        )
    }
});

// Renders the headline and the form for creating new todos.
// Used in TodoApp
// Observe that the toogleall button is NOT rendered here,
// but in TodoMain (it is then moved up to the header with CSS)
var TodoHeader = React.createClass({
    handleValueChange: function(evt){
        var text = evt.target.value;
        if (et.which === 13 && text){// hit enter, create new item if field isn't empty
            TodoActions.addItem(text);
            evt.target.value = '';
        } else if (evt.which === 27){// hit escape, clear without creating
            evt.target.value = '';
        }
    },
    render: function(){
        return (
            <header id="header">
                <h1>todos</h1>
                <input id="new-todo" placeholder="What needs to be done?"
                       autoFocus onKeyUp={this.handleValueChange} />
            </header>
        );
    }
});



// Renders the bottom item count, navigation bar and clearallcompleted button
// Used in TodoApp
var TodoFooter = React.createClass({
    propTypes: {
        list: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    },
    render: function() {
        //?????????
        var nbrcompleted = _.filter(this.props.list, "isComplete").length,
            nbrtotal = this.props.list.length,
            nbrincomplete = nbrtotal-nbrcompleted,
            clearButtonClass = React.addons.classSet({hidden: nbrcompleted < 1}),
            footerClass = React.addons.classSet({hidden: !nbrtotal }),
            completedLabel = "Clear completed (" + nbrcompleted + ")",
            itemsLeftLabel = nbrincomplete === 1 ? " item left" : " items left";
        return (
            <footer id="footer" className={footerClass}>
                <span id="todo-count"><strong>{nbrincomplete}</strong>{itemsLeftLabel}</span>
                <ul id="filters">
                    <li>
                        <ReactRouter.Link activeClassName="selected" to="All">All</ReactRouter.Link>
                    </li>
                    <li>
                        <ReactRouter.Link activeClassName="selected" to="Active">Active</ReactRouter.Link>
                    </li>
                    <li>
                        <ReactRouter.Link activeClassName="selected" to="Completed">Completed</ReactRouter.Link>
                    </li>
                </ul>
                <button id="clear-completed" className={clearButtonClass} onClick={TodoActions.clearCompleted}>{completedLabel}</button>
            </footer>
        );
    }
});

