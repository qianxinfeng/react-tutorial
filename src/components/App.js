import React from 'react';
import TodoList from './TodoList.js';
var App = React.createClass({
  getInitialState(){
    return {items:["123","xxxx"],text:""};
  },
  onChange(e){
    this.setState({text:e.target.value});
  },
  handleSubmit(e){
    e.preventDefault();
    let text=this.state.text;
    if(!text){
      return false;
    }
    var nextItems=this.state.items.concat([text]);
    this.setState({items:nextItems,text:""});
  },
  handleDelete(index){
    let nextItems=this.state.items;
    nextItems.splice(index,1);
    this.setState({items:nextItems});
  },
  render(){
    return (
      <div >
        <h3>TODO</h3>
        <TodoList items={this.state.items} onDelete={this.handleDelete}/>
        <form onSubmit={this.handleSubmit}>
           <input onChange={this.onChange} value={this.state.text} />
           <button>{'Add #' + (this.state.items.length + 1)}</button>
        </form>
      </div>
    );
  }
});

export default App;