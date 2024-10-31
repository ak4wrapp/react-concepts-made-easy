import React from "react";

interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    console.log("ErrorBoundary: constructor()");

    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    console.log("ErrorBoundary: getDerivedStateFromError()");

    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("ErrorBoundary: Error caught in ErrorBoundary:", error, info);
  }

  render() {
    console.log(
      "ErrorBoundary: render() => this.state.hasError: ",
      this.state.hasError
    );

    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
