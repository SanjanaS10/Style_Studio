import React from 'react';
import Navbar from './Navbar'; // Assuming Navbar is in the same directory or update the path accordingly
import './Contact.css'; // Save the CSS styles in a separate file, e.g., Contact.css

function Contact() {
    return (
        <div className='cn'>
            <Navbar /> {/* Include the Navbar component */}
            <div className="containert">
                <h2>Contact Us</h2>
                <div className="contact-info">
                    <p>If you have any questions or comments, feel free to reach out!</p>
                    <p><strong>Email:</strong> support@stylestudio.com</p>
                    <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                    <p><strong>Address:</strong> 123 Style Lane, Fashion City, State, Zip</p>
                </div>
            </div>
            <footer>
                <p>
                    Follow us on <a href="#">Instagram</a>, <a href="#">Facebook</a>, <a href="#">Pinterest</a>
                </p>
            </footer>
        </div>
    );
}

export default Contact;
