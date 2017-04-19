import React from 'react'
import ReactMixin from 'react-mixin'
import http from 'axios'
class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            author: "",
            text: ""
        }

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
                        placeholder="Your name"
                        valueLink={this.linkState('author')}/>
                </div>
                <div>
                    <textarea
                        placeholder="Say something..."
                        valueLink={this.linkState('text')}/>
                </div>
                <input type="submit" value="Post" />
            </form>
        );
    }
}
ReactMixin.onClass(CommentForm,React.addons.LinkedStateMixin);
export default CommentForm;