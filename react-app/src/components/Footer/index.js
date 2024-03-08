import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Modal from '../FooterModal/Modal';
import './Footer.css';

function Footer() {
    const [modalContent, setModalContent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation();



    function getModalContent(key) {
        switch (key) {
            case 'About Ottr':
                return (
                    <div className="modal-about-ottr">
                        <div className="gif-size">
                            <img src="https://i.imgur.com/YvaKKwZ.gif" alt="About Ottr" />
                        </div>

                        <div className="about-ottr">About Ottr</div>
                        <p>Ottr is a full-stack webapp clone of Flickr with a cute otter twist!</p>
                        <div className="users-otter">Users can use Ottr to search for, post pictures of, <br />like and leave comments on otter pictures and posts.</div>
                        <p>Enjoy your stay! - Min</p>
                    </div >
                );

            case 'Contact Me':
                return (
                    <div className="modal-contact-me">
                        <div className="contact-header">Reach out to me!</div>
                        <div className="linkedin-container">
                            <a href="https://www.linkedin.com/in/min-kim-b2607a18a/" target="_blank" rel="noopener noreferrer">
                                <div className="linkedin-image"><img className="contact-linkedin" src="https://i.imgur.com/zdK8doO.png" alt="LinkedIn" />
                                    <div className="linkedin-link">LinkedIn</div>
                                </div>
                            </a></div>
                        <div className="github-container">
                            <a href="https://github.com/min-kim1109/ottr" target="_blank" rel="noopener noreferrer">
                                <div className="github-image"><img className="contact-github" src="https://i.imgur.com/j0c66UJ.png" alt="GitHub" />
                                    <div className="github-link">GitHub</div>
                                </div>
                            </a>
                        </div>
                        <div className="portfolio-container">
                            <a href="https://min-kim1109.github.io/" target="_blank" rel="noopener noreferrer">
                                <div className="github-image"><img className="contact-portfolio" src="https://i.imgur.com/AXhCbFH.png" alt="Portfolio" />
                                    <div className="portfolio-link">Portfolio</div>
                                </div>
                            </a>
                        </div>

                    </div>
                );
            case 'Stack':
                return (
                    <div className="modal-stack">
                        <div className="about-stack">Technology Used</div>
                        <div className="stack-image-container">
                            <div className="js-container">
                                <div className="js-image"><img src="https://i.imgur.com/GVgsJ1Z.png" alt="JavaScript" /></div>
                                JavaScript
                            </div>
                            <div className="py-container">
                                <div className="python-image"><img src="https://i.imgur.com/9plUBkd.png" alt="Python" /></div>
                                Python
                            </div>
                            <div className="html-container">
                                <div className="html-image"><img src="https://i.imgur.com/pReuvXG.png" alt="HTML" /></div>
                                HTML5
                            </div>
                            <div className="css-container">
                                <div className="css-image"><img src="https://i.imgur.com/yHVskhs.png" alt="CSS" /></div>
                                HTML5
                            </div>
                            <div className="react-container">
                                <div className="react-image"><img src="https://i.imgur.com/XAb0U6M.png" alt="React" /></div>
                                React
                            </div>
                            <div className="redux-container">
                                <div className="redux-image"><img src="https://i.imgur.com/k6nHoCR.png" alt="Redux" /></div>
                                Redux
                            </div>
                            <div className="flask-container">
                                <div className="flask-image"><img src="https://i.imgur.com/kRf035D.png" alt="Flask" /></div>
                                Flask
                            </div>
                            <div className="postgresql-container">
                                <div className="postgresql-image"><img src="https://i.imgur.com/WLkqAcm.png" alt="PostgreSQL" /></div>
                                PostgreSQL
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    }

    const handleFooterClick = (contentKey) => {
        setModalContent(getModalContent(contentKey));
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <footer className="footer-container">
                <div className="footer-content">
                    <div onClick={() => handleFooterClick('About Ottr')}>About Ottr</div>
                    <div onClick={() => handleFooterClick('Contact Me')}>Contact Me</div>
                    <div onClick={() => handleFooterClick('Stack')}>Stack</div>
                    <div>Ottr © 2024</div>
                </div>
            </footer>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {modalContent}
            </Modal>
        </>
    );
}

export default Footer;
