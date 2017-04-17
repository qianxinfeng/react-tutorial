import React from 'react'
import http from 'axios'
class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            author: "",
            text: ""
        }

    }
    handleAuthorChange(e) {
        this.setState({ author: e.target.value });
    }
    handleTextChange(e) {
        this.setState({ text: e.target.value });
    }
    handleSubmit(e) {
        e.preventDefault();
        var author = this.state.author.trim();
        var text = this.state.text.trim();
        if (!author || !text) {
            return false;
        }
        this.props.onCommentSubmit({ author, text });
        this.setState({ author: '', text: '' });
    }
    render() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit.bind(this)}>
                <div>
                    <input type="text"
                        value={this.state.author}
                        placeholder="Your name"
                        onChange={this.handleAuthorChange.bind(this)} />
                </div>
                <div>
                    <textarea
                        value={this.state.text}
                        placeholder="Say something..."
                        onChange={this.handleTextChange.bind(this)} />
                </div>
                <input type="submit" value="Post" />
            </form>
        );
    }
}
export default CommentForm;