import React from 'react';

import debug from 'debug';
import { Link } from 'react-router-dom';

const log = debug('data:errorBoundary');

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    let emailContent = error.stack;
    const params = {
      type: 'error',
      body: emailContent.toString(),
      subject: 'Triggered by error boundary',
      action: 'ErrorBoundary',
    };
    log('Triggered by error boundary', params);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-page">
          <h2>Oops! Something went wrong.</h2>
          <span>
            Hang tight - we&lsquo;ve notified the team, and we&lsquo;re taking you back to the
            homepage.
            <br />
            <Link to="/">Click here to be redirected now</Link>
          </span>
        </div>
      );
    }
    return this.props.children;
  }
}
