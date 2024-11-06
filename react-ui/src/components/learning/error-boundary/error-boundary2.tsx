import React, { Component, ReactNode } from "react";

interface ErrorBoundary2Props {
  children: ReactNode; // Type the 'children' prop as ReactNode
}

interface ErrorBoundary2State {
  hasError: boolean;
  errorMessage: string;
}

class ErrorBoundary2 extends Component<
  ErrorBoundary2Props,
  ErrorBoundary2State
> {
  state: ErrorBoundary2State = {
    hasError: false,
    errorMessage: "",
  };

  static getDerivedStateFromError(error: Error) {
    // Update state to show the fallback UI
    return {
      hasError: true,
      errorMessage: error.message,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log the error or send it to a service
    console.log(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, errorMessage: "" });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong: {this.state.errorMessage}</h2>
          <button onClick={this.handleReset}>Reset</button>
        </div>
      );
    }

    return this.props.children; // Render the children if no error occurred
  }
}

export default ErrorBoundary2;
