import React, { useState } from "react";

const Admin = (props) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        // Check if token exists
        if (!event.target.token.value) {
            setError("Please enter a token.");
            setLoading(false);
            return;
        }

        try {
            const data = await props.checkToken(event.target.token.value);
            if (!data.success) {
                setError(data.error);
                setLoading(false);
            }
        } catch (err) {
            console.log(err);
            setError("An error occurred.");
            setLoading(false);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh', maxWidth: '30vw' }}>
            <div>
                <h1>Admin</h1>
                <form className="mb-3" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="token" className="form-label">Token</label>
                        <input type="password" className="form-control" id="token" placeholder="Enter token" />
                        <div className="form-text text-muted">
                            Enter the admin token.
                        </div>
                    </div>
                    <div className="d-flex align-items-center">
                        <button type="submit" className="btn btn-dark me-2" disabled={loading}>
                            Submit
                        </button>
                        {loading && (
                            <div className="spinner-border text-dark"></div>
                        )}
                    </div>
                </form>
                {error && (
                    <div className="alert alert-dark alert-dismissible" role="alert">
                        <button type="button" className="btn-close" onClick={() => setError(null)}></button>
                        <strong>Error:</strong> {error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;