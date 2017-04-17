import React from 'react';

var TodoList = React.createClass({
    render() {
        var createItem = (itemText, index) => {
            return <li key={index}>{itemText}<button onClick={e=>this.props.onDelete(index)}>x</button></li>
        };
        return <ul>{this.props.items.map(createItem)}</ul>;
    }
});
export default TodoList;