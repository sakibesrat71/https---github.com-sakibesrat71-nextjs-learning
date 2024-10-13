import styles from '../styles/ContactCode.module.css';

const contactItems = [
  
  {
    social: 'email',
    link: 'sakibesrat71@gmail.com',
    href: 'mailto:sakibesrat71@gmail.com',
  },
  {
    social: 'github',
    link: 'sakibesrat71',
    href: 'https://github.com/sakibesrat71',
  },
  {
    social: 'linkedin',
    link: 'Esrat Sakib',
    href: 'https://www.linkedin.com/in/esrat-sakib-79a2a01a3/',
  },
  {
    social: 'x',
    link: '@esratsakib',
    href: 'https://x.com/EsratSakib',
  },
  {
    social: 'whatsapp',
    link: '01872550409',
    href: 'https://wa.link/a61un1',
  },
];

const ContactCode = () => {
  return (
    <div className={styles.code}>
      <p className={styles.line}>
        <span className={styles.className}>.socials</span> &#123;
      </p>
      {contactItems.slice(0, 8).map((item, index) => (
        <p className={styles.line} key={index}>
          &nbsp;&nbsp;&nbsp;{item.social}:{' '}
          <a href={item.href} target="_blank" rel="noopener">
            {item.link}
          </a>
          ;
        </p>
      ))}
      {contactItems.slice(8, contactItems.length).map((item, index) => (
        <p className={styles.line} key={index}>
          &nbsp;&nbsp;{item.social}:{' '}
          <a href={item.href} target="_blank" rel="noopener">
            {item.link}
          </a>
          ;
        </p>
      ))}
      <p className={styles.line}>&#125;</p>
    </div>
  );
};

export default ContactCode;
