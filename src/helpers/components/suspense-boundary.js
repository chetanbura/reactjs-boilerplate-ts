import { Component, Suspense } from 'react';

import debug from 'debug';

import { Loader } from '../../ui/core';

const log = debug('data:errorBoundary');

export class SuspenseBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true }; // Update state so the next render will show the fallback UI.
  }

  componentDidCatch(error) {
    let operationName = 'Lazy loading';
    if (
      sessionStorage.getItem('crashed') &&
      sessionStorage.getItem('crashed') === window.location.href
    ) {
      log({ params: 'SuspenseBoundary crashed more than once' });
      sessionStorage.removeItem('crashed');
      operationName = 'Lazy loading - hard fail';
    } else {
      log('SuspenseBoundary crashed once');
      sessionStorage.setItem('crashed', window.location.href);
      operationName = 'Lazy loading - soft fail';
    }
    let emailContent = {
      graphqlError: { operationName },
      urlLocation: window.location.href,
      message: error.stack,
    };
    const params = {
      type: 'error',
      body: JSON.stringify(emailContent),
      subject: 'Triggered by suspense boundary',
      action: 'SuspenseBoundary',
    };
    log('Triggered by error boundary', params);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="center-align">
          <h2>Oops! Something went wrong.</h2>
          <p>
            Well, this is awkward. An error occurred while content was loading.
            <br />
            <a href={window.location.href}>Click here</a> to reload or go to the{' '}
            <a href={window.location.origin}>homepage</a>.
          </p>
        </section>
      );
    }

    return <Suspense fallback={this.props.fallBack || <Loader />}>{this.props.children}</Suspense>;
  }
}
