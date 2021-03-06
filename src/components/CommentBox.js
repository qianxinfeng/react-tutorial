import React from 'react';
import CommentList from './CommentList.js'
import CommentForm from './CommentForm.js'
import http from 'axios'

class CommentBox extends React.Component {
    get apiUrl(){
        return "http://localhost:3000/comments"
    }
    constructor(props){
        super(props);
        this.state={
            data: []
        }
    }
    loadCommentsFromServer(){
        http.get(this.apiUrl).then(res=>{
            this.setState({data: res.data});
        }).catch(error=>{
            console.error(`get comments error:${error}`);
        })
    }
    handleCommentSubmit(comment){
        http.post(this.apiUrl,comment).then(res=>{
           comment=res.data;
           let newData=this.state.data.concat([comment]);
           this.setState({data:newData});
        }).catch(error=>{
            console.error(`save comment error:${error}`);
        })
    }
    componentDidMount(){
       this.loadCommentsFromServer.bind(this)();
    }
    render() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)} />
            </div>
        );
    }
}
export default CommentBox;