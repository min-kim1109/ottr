import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';

function Homepage() {
    return (
        <div className="homepage-container">
            <div className="background-image-container"></div>
            <div className="content-container">
                <div className="content1">
                    <h1>Find the perfect otter</h1>
                </div>
                <div className="content2">
                    <h2>Join the Ottr community, home to tens of <br />billions of otter photos</h2>
                </div>

                <Link to="/posts" className="otter-button">
                    <button>Search for otters</button>
                </Link>
            </div>
        </div>
    );
}

export default Homepage;
