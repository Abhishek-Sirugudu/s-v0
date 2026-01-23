import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) { super(props); this.state = { hasError: false }; }
    static getDerivedStateFromError(error) { return { hasError: true }; }
    componentDidCatch(error, errorInfo) {
        // console.error("Critical Error:", error, errorInfo); 
    }
    render() {
        if (this.state.hasError) {
            return (
                <div className="flex items-center justify-center h-screen bg-slate-50 text-slate-900">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-2">Something went wrong.</h1>
                        <button onClick={() => window.location.reload()} className="px-4 py-2 bg-indigo-600 text-white rounded">Reload Application</button>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}
export default ErrorBoundary;
