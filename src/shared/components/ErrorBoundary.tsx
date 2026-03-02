import React from 'react';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="flex flex-col items-center justify-center min-h-[200px] p-6 gap-4">
          <div className="text-4xl">⚠️</div>
          <h2 className="text-white text-lg font-semibold">Something went wrong</h2>
          <p className="text-slate-400 text-sm text-center">{this.state.error?.message}</p>
          <button
            onClick={() => this.setState({ hasError: false, error: undefined })}
            className="bg-teal-500 hover:bg-teal-600 text-white rounded-xl px-4 py-2 text-sm"
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
