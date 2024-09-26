import React from 'react';
import '../Styles/Contact.css';

const Contact = () => {
  return (
    <section className="contact">
      <h2>Contact</h2>
      <form className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" placeholder="Your Name" required />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Your Email" required />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" placeholder="Your Message" rows="5" required></textarea>
        </div>

        <button type="submit" className="submit-btn">Send Message</button>
      </form>
    </section>
  );
};

export default Contact;
