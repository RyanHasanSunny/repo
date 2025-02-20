import React from 'react';
import '../Styles/Contact.css';

const Contact = () => {
  return (
    <section className="contact">

<div className="contact-Content">
      <div className="contact-info">
        <h3>Contact Information</h3>
        <p>
          <strong>Address:</strong> 1234 Street Name, City Name, United States  <br />
          <strong>Phone:</strong> +123 456 7890 <br />
          <strong>Email:</strong>
        </p>
      </div>
      <div className="Massage-send">
      <h2>Send a Message</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
        consectetur mauris sed, et consectetur elit. Nullam consectetur mauris
        sed, et consectetur elit. </p>
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
      </div>
      </div>
    </section>
  );
};

export default Contact;
