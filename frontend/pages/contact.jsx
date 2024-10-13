import { useState } from 'react';
import ContactCode from '../components/ContactCode';
import styles from '../styles/ContactPage.module.css';
import axios from 'axios';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  // Honeypot state (should remain empty if it's a human user)
  const [honey, setHoney] = useState('');

  const submitForm = async (e) => {
    e.preventDefault();

    // If the honeypot field is filled, it's likely a bot
    if (honey) {
      alert('Bot detected!');
      return;
    }

    try {
      // Send a POST request to the backend using Axios
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/contact/mail`, {
        name,    // values from your form's state
        email,
        subject,
        message,
        honey   // honeypot field, should be empty
      });
  
      // If the request is successful
      if (res.status === 200) {
        alert('Your response has been received!');
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
        setHoney(''); // Reset the honeypot field
      }
    } catch (error) {
      // Handle error
      alert('There was an error. Please try again in a while.');
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <h3 className={styles.heading}>Reach Out Via Socials</h3>
        <ContactCode />
      </div>
      <div>
        <h3 className={styles.heading}>Or Fill Out This Form</h3>
        <form className={styles.form} onSubmit={submitForm}>
        
          <div className={styles.flex}>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              name="subject"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              id="message"
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          
          {/* Honeypot field - hidden input */}
          <div style={{ display: 'none' }}>
            <label htmlFor="honey">Do not fill this field</label>
            <input
              type="text"
              name="honey"
              id="honey"
              value={honey}
              onChange={(e) => setHoney(e.target.value)} // honeypot state
            />
          </div>
          
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: { title: 'Contact' },
  };
}

export default ContactPage;
