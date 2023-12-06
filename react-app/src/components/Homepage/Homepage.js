import React from 'react';
import { Link } from 'react-router-dom';

function Homepage() {
    return (
        <div>
            <h1>Find the perfect otter</h1>
            <h2>Join the Ottr community, home to tens of billions of otter photos</h2>
            <Link to="/posts">
                <button>Search for otters</button>
            </Link>
        </div>
    );
}

export default Homepage;
