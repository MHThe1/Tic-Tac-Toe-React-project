import React from 'react';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <p>Developed by: @mhthe1</p>
            <ul className="social-links">
                <li>
                    <a href="https://github.com/MHThe1" target="_blank" rel="noopener noreferrer">
                        <img src="/icons/github-icon.png" alt="GitHub" />
                    </a>
                </li>
                <li>
                    <a href="https://www.linkedin.com/in/mehedi-hasan-tanvir-5507b0228/" target="_blank" rel="noopener noreferrer">
                        <img src="/icons/linkedin-icon.png" alt="LinkedIn" />
                    </a>
                </li>
                <li>
                    <a href="https://instagram.com/mhthe1" target="_blank" rel="noopener noreferrer">
                        <img src="/icons/instagram-icon.png" alt="Twitter" />
                    </a>
                </li>
            </ul>
        </footer>
    );
}
