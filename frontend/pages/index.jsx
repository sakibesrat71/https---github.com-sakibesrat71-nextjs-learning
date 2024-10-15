import { useEffect, useState } from 'react';
import Link from 'next/link';
import Illustration from '../components/Illustration';
import styles from '../styles/HomePage.module.css';
import axios from 'axios';

export default function HomePage() {
  const [data, setData] = useState(null);
  const [text, setText] = useState(''); // This will hold the currently typed text
  const [index, setIndex] = useState(0); // This is the index of the current word
  const [isDeleting, setIsDeleting] = useState(false); // To control the typing or deleting phase
  const [typingSpeed, setTypingSpeed] = useState(150); // Typing speed

  useEffect(() => {
    const fetchData = async () => {
      const storedData = sessionStorage.getItem('meData');

      if (storedData) {
        setData(JSON.parse(storedData));
      } else {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/me/latest`);
          const fetchedData = response.data;
          sessionStorage.setItem('meData', JSON.stringify(fetchedData));
          setData(fetchedData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data && data.beenAroundTheBlockOf) {
      const handleTyping = () => {
        const words = data.beenAroundTheBlockOf;
        const currentWord = words[index];
        const isTyping = !isDeleting;

        if (isTyping) {
          // Add the next character
          setText((prev) => currentWord.substring(0, prev.length + 1));
          if (text === currentWord) {
            // Pause after typing full word
            setTimeout(() => setIsDeleting(true), 1000);
          }
        } else {
          // Remove the last character
          setText((prev) => currentWord.substring(0, prev.length - 1));
          if (text === '') {
            // Move to the next word after deleting
            setIsDeleting(false);
            setIndex((prevIndex) => (prevIndex + 1) % words.length);
          }
        }
      };

      const timeout = setTimeout(handleTyping, typingSpeed);

      return () => clearTimeout(timeout);
    }
  }, [text, isDeleting, index, data]);

  // Conditionally render only if data is available
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.background}>
          <h2>SOFTWARE</h2>
          <h2>ENGINEER</h2>
        </div>
        <div className={styles.foreground}>
          <div className={styles.content}>
            <h1 className={styles.name}>Esrat Ebtida Sakib</h1>
            <h6 className={styles.bio}>{text}</h6> {/* Show the animated text here */}
            <Link href="/projects">
              <button className={styles.button}>View Work</button>
            </Link>
            <Link href="/contact">
              <button className={styles.outlined}>Contact Me</button>
            </Link>
          </div>
          <Illustration className={styles.illustration} />
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: { title: 'Home' },
  };
}
