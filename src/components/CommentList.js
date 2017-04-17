import React from 'react'
import Comment from './Comment.js'

class CommentList extends React.Component{
    render() {
        var commentNode = comment => {
            return (
                <Comment author={comment.author} key={comment.id}>
                    {comment.text}
                </Comment>
            );
        }
        return (
            <div className="commentList">
                {this.props.data.map(commentNode)}
            </div>
        );
    }
}
export default CommentList;