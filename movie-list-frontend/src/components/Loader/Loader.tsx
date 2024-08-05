import React from "react";

const Loader = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-cyan-950 p-4">
            <div className="text-4xl font-bold text-white mr-4 animate-pulse">
                Loading...
            </div>
            <div className="loader"></div>
        </div>
    );
};

export default Loader;
