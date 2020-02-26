import React from 'react';
import { connect } from 'react-redux';

import InfiniteScroll from 'react-infinite-scroller';

import { loadInitialMessagesRequest } from '../redux/actions/MessagesAction';



class MessageListComponent extends React.Component {

    loadMoreMessages() {
        console.log('load more');
    }

    componentDidUpdate() {
        const messagesElement = document.querySelector(".messages");
        if(messagesElement) {
            const scrollSize = messagesElement.scrollHeight;
            messagesElement.scrollTo(0, scrollSize);
        }
    }

    render() {

        //if itsn't logged hide form
        if (!this.props.isLoggedIn) {
            return null;
        }

        return (
            <React.Fragment>
                <div style={{ height: '150px', width: '400px', 'overflow': 'auto' }} className='messages'>
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={this.loadMoreMessages.bind(this)}
                        hasMore={true}
                        isReverse={true}
                        useWindow={false}
                        initialLoad={false}
                        threshold={10}
                    >
                        {this.props.messagesHistory && this.props.messagesHistory.map((message, index) =>
                            <div key={index}>{message.nick} says: {message.content}</div>)
                        }
                    </InfiniteScroll>
                </div>
                <ul>
                    {this.props.messagesHistory && this.props.messagesHistory.map((message, index) =>
                        <li key={index}>{message.nick} says: {message.content}</li>)
                    }
                </ul>
            </React.Fragment>
        );
    }
}

const mapStateProps = (state) => {
    return {
        isLoggedIn: state.login.isLoggedIn,
        messagesHistory: state.messages.messagesHistory,
    }
}

export default connect(mapStateProps)(MessageListComponent);