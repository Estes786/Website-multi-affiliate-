import Link from 'next/link';
import { useRouter } from 'next/router'; // Import useRouter to manage language state conceptually

// This component now expects 'categories' as a prop
const Navbar = ({ categories = [] }) => {
  const router = useRouter();
  // Conceptual: In a real app, language would come from router.locale or a state management solution
  const currentLang = router.query.lang || 'en'; // Default to English

  const handleLanguageChange = (lang) => {
    // In a real app with next-i18next, this would be router.push(router.pathname, router.asPath, { locale: lang })
    // For simulation, we'll just change a query parameter to demonstrate the concept
    router.push(`${router.pathname}?lang=${lang}`, `${router.asPath.split('?')[0]}?lang=${lang}`, { shallow: true });
  };

  return (
    <nav style={{ backgroundColor: '#333', color: 'white', padding: '10px 0', marginBottom: '20px' }}>
      <ul style={{ listStyleType: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 0, padding: 0, flexWrap: 'wrap' }}>
        <li style={{ margin: '5px 15px' }}>
          <Link href={{ pathname: "/", query: { lang: currentLang } }} legacyBehavior><a>Home</a></Link>
        </li>
        {categories.map(category => (
          <li key={category.id} style={{ margin: '5px 15px' }}>
            <Link href={{ pathname: `/categories/${category.id}`, query: { lang: currentLang } }} legacyBehavior>
              <a>{category.name}</a>
            </Link>
          </li>
        ))}
        <li style={{ margin: '5px 15px' }}>
          {/* Placeholder for Search - Can be developed further */}
          <span>Search (TODO)</span>
        </li>
        <li style={{ margin: '5px 15px' }}>
          {/* Placeholder for Community/Newsletter - Can be developed further */}
          <Link href={{ pathname: "#", query: { lang: currentLang } }} legacyBehavior><a>Community/Newsletter</a></Link>
        </li>
        <li style={{ margin: '5px 15px', marginLeft: 'auto' }}> {/* Language switcher to the right conceptually */}
          <select onChange={(e) => handleLanguageChange(e.target.value)} value={currentLang} style={{padding: '5px', backgroundColor: '#555', color: 'white', border: 'none', borderRadius: '3px'}}>
            <option value="en">English</option>
            <option value="id">Bahasa Indonesia</option>
            {/* Add more languages as needed */}
          </select>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
