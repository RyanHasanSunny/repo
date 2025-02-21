import React, { useState } from 'react';
import '../Styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    // If there are errors, set them and stop submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Send form data to the backend
    try {
      const response = await fetch('https://rgbserver.onrender.com/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' }); // Clear form after submission
      } else {
        setErrors({ submit: 'Failed to send message. Please try again later.' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'Failed to send message. Please try again later.' });
    }
  };

  return (
    <section className="contact">
      <div className="contact-Content">
        <div className="contact-info">
          <h3>Contact Information</h3>
          <div className="contact-info-item">
          <p>
            <strong>Address:</strong> Dhaka, Bangladesh <br />
            <strong>Phone:</strong> +8801799340834 <br />
            <strong>Email:</strong> ryanhasansunny31@gmail.com
          </p>

          <div className="social-media">
            <a
              href="https://www.linkedin.com/in/ryan-hasan-sunny-4b4b2b1b8/"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab"> Facebook</i>
            </a>

            <a
              href="https://www.linkedin.com/in/ryan-hasan-sunny-4b4b2b1b8/"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab"> Artstation</i>
            </a>

            <a
              href="https://www.linkedin.com/in/ryan-hasan-sunny-4b4b2b1b8/"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab"> Linkedin</i>
            </a>
            
            </div>
          </div>

        </div>
        <div className="Massage-send">
          <h2>Send a Message</h2>
          <p>
            You can send me a message using the form below. I'll get back to you as soon as possible.
          </p>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={handleInputChange}
                required
              ></textarea>
              {errors.message && <span className="error">{errors.message}</span>}
            </div>

            <button type="submit" className="submit-btn">
              Send Message
            </button>
          </form>
          {submitted && (
            <p className="success-message">Your message has been sent successfully!</p>
          )}
          {errors.submit && <p className="error">{errors.submit}</p>}
        </div>
      </div>
    </section>
  );
};

export default Contact;