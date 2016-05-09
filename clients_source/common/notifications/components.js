import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import cnames from 'classnames';

class Notification extends Component {
  constructor(props) {
    super(props);

    this.timeoutToEaseOut = null;
    this[String(props.data.id)] = null

    this.state = {
      notificationMounted: false,
      showTimeEnded: false
    }

    this.deleteNotification = this.deleteNotification.bind(this);
    this.notificationEaseOut = this.notificationEaseOut.bind(this);
  }

  deleteNotification() {
    let { deleteNotification, data } = this.props;
    deleteNotification(data.id);
  }

  // componentWillUnmount() {
  //   this.setState({});
  // }

  notificationEaseOut() {
    // console.log('notifications.easeOutcalled');
    let id = String(this.props.data.id);
    window.clearTimeout(this[id]);

    this.setState({
      showTimeEnded: true
    });


    let { easingDuration } = this.props;
    setTimeout(() => {
      this.deleteNotification();
    }, easingDuration)
  }

  componentDidMount() {
    let { showDuration, easingDuration, data } = this.props;
    let timerDuration = showDuration + easingDuration;

    // When component is mounted we starting the timer to ease out this notification
    this[String(data.id)] = setTimeout(() => {
      this.notificationEaseOut();
    }, timerDuration);

    // console.log('mount', this);
    // Set that notification is mounted in state
    setTimeout(() => {
      this.setState({
        notificationMounted: true
      });
    }, 50);
  }

  render() {
    let { data, animationName } = this.props;
    let { notificationMounted, showTimeEnded } = this.state;

    console.log(data.id, this);

    let notificationCName = cnames({
      [`is-${data.type}`]: data.type !== null,
      "notification": true,
      [`${animationName}-enter`]: !notificationMounted,
      [`${animationName}-leave`]: showTimeEnded,
    });

    return (
      <div className={notificationCName}>
        <button
          className="delete"
          onClick={() => this.notificationEaseOut()}
        ></button>
        <p>{data.message + " " + data.id}</p>
      </div>
    );
  }
}

Notification.propTypes = {
  // data: PropTypes.objectOf({
  //   id: PropTypes.number.isRequired,
  //   type: PropTypes.string,
  //   message: PropTypes.string.isRequired
  // }).isRequired,
  showDuration: PropTypes.number.isRequired,
  animationName: PropTypes.string.isRequired,
  easingDuration: PropTypes.number.isRequired,
  deleteNotification: PropTypes.func.isRequired
}

class Notifications extends Component {
  constructor() {
    super();
    this.state = {
      notes: []
    }
  }

  render() {
    let { notifications } = this.props;
    return (
      <div className="notification-box">
        {notifications.reverse().map(note =>
          <Notification
            key={note.id}
            data={note}
            {...this.props}
          />
        )}
      </div>
    );
  }
}

Notifications.propTypes = {
  notifications: PropTypes.array.isRequired,
  showDuration: PropTypes.number.isRequired,
  animationName: PropTypes.string.isRequired,
  easingDuration: PropTypes.number.isRequired,
  deleteNotification: PropTypes.func.isRequired
}

export default Notifications;