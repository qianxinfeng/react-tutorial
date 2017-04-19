import React from 'react';
import ReactMixin from 'react-mixin';
import TodoList from './TodoList.js';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      items:["123","xxxx"],
      text:""
    }
  }
  handleSubmit(e){
    e.preventDefault();
    let text=this.state.text;
    if(!text){
      return false;
    }
    var nextItems=this.state.items.concat([text]);
    this.setState({items:nextItems,text:""});
  }
  handleDelete(index){
    let nextItems=this.state.items;
    nextItems.splice(index,1);
    this.setState({items:nextItems});
  }
  render(){
    return (
      <div >
        <h3>TODO</h3>
        <TodoList items={this.state.items} onDelete={this.handleDelete.bind(this)}/>
        <form onSubmit={this.handleSubmit.bind(this)}>
           <input valueLink={this.linkState('text')} />
           <button>{'Add #' + (this.state.items.length + 1)}</button>
        </form>
      </div>
    );
  }
}
ReactMixin.onClass(App, React.addons.LinkedStateMixin);
export default App;