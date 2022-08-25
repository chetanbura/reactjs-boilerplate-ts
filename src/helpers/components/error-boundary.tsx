import { Component } from 'react';

import debug from 'debug';
import { Link } from 'react-router-dom';

import { IErrorBoundaryProps, IErrorBoundaryState, TLogType } from '../../interfaces';

const log = debug('data:errorBoundary');

export class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
  public state: IErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(): IErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    let emailContent = error.stack;
    const params: TLogType = {
      type: 'error',
      body: emailContent?.toString(),
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
