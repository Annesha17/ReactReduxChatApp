import React from 'react';
import uuid from 'uuid';
import {createStore} from 'redux';

function reducer(state,action){
    //including message id for every message added
    const newMessage={
        text:action.text,
        timestamp:Date.now(),
        id:uuid.v4()
    };
    if(action.type==='ADD_MESSAGE'){
        return{
            messages:state.messages.concat(newMessage)
        }
    }
    //deleting messages based on message id passed as action.id
     else if (action.type === 'DELETE_MESSAGE') {
    return {
      messages:state.messages.filter((message)=>(
          message.id!==action.id
      ))
    };
  } else {
    return state;
  }
}

const initialState={messages:[]}

const store=createStore(reducer,initialState)

class App extends React.Component {
  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
  }

  render() {
    const messages = store.getState().messages;

    return (
      <div className='ui segment'>
        <MessageView messages={messages} />
        <MessageInput />
      </div>
    );
  }
}

class MessageInput extends React.Component {
  state = {
    value: '',
  };

  onChange = (e) => {
    this.setState({
      value: e.target.value,
    })
  };

  handleSubmit = () => {
    store.dispatch({
      type: 'ADD_MESSAGE',
      text: this.state.value,
    });
    this.setState({
      value: '',
    });
  };

  render() {
    return (
      <div className='ui input'>
        <input
          onChange={this.onChange}
          value={this.state.value}
          type='text'
        />
        <button
          onClick={this.handleSubmit}
          className='ui primary button'
          type='submit'
        >
          Submit
        </button>
       </div>
    );
  }
}

class MessageView extends React.Component {
  handleClick = (id) => {
    store.dispatch({
      type: 'DELETE_MESSAGE',
      id:id
    });
  };

  render() {
    const messages = this.props.messages.map((message, index) => (
      <div
        className='comment'
        key={index}
        onClick={() => this.handleClick(message.id)}
      >
        <div className='text'> {/* Wrap message data in `div` */}
          {message.text}
          <span className='metadata'>@{message.timestamp}</span>
        </div>
      </div>
    ));
    return (
      <div className='ui center aligned basic segment'>
        <div className='ui comments'>
          {messages}
        </div>
      </div>
    );
  }
}

export default App;