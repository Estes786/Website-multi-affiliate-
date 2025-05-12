import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar'; // Import the Navbar component
import { useRouter } from 'next/router';
import productsData from '../../data/products.json';
import categoriesData from '../../data/categories.json';
import styles from '../../styles/Home.module.css'; // Reusing styles for now

export default function CategoryPage({ category, products }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!category) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Category Not Found</title>
        </Head>
        <Navbar categories={categoriesData} /> {/* Add the Navbar here */}
        <main className={styles.main}>
          <h1 className={styles.title}>Category Not Found</h1>
          <p>The category you are looking for does not exist.</p>
          <Link href="/" legacyBehavior><a className={styles.card}>Go back to Home</a></Link>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Category: {category.name}</title>
        <meta name="description" content={`Products in category ${category.name}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar categories={categoriesData} /> {/* Add the Navbar here */}
      <main className={styles.main}>
        <h1 className={styles.title}>Category: {category.name}</h1>
        <p className={styles.description}>{category.description}</p>

        {products.length > 0 ? (
          <div className={styles.grid}>
            {products.map(product => (
              <Link key={product.id} href={`/products/${product.id}`} legacyBehavior>
                <a className={styles.card}>
                  <h2>{product.name} &rarr;</h2>
                  <p>{product.description}</p>
                  <p><strong>Price:</strong> ${product.price}</p>
                  <p><strong>Rating:</strong> {product.rating}/5</p>
                </a>
              </Link>
            ))}
          </div>
        ) : (
          <p>No products found in this category yet. Check back soon!</p>
        )}
        
        <div className={styles.backToHomeContainer} style={{marginTop: '2rem'}}>
            <Link href="/" legacyBehavior><a className={styles.card}>&larr; Back to Home</a></Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Next.js & Vercel
        </a>
      </footer>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = categoriesData.map(category => ({
    params: { category: category.id.toString() },
  }));
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const categoryId = params.category;
  const category = categoriesData.find(cat => cat.id === categoryId) || null;
  const categoryProducts = category ? productsData.filter(product => product.category_id === categoryId) : [];

  return {
    props: {
      category,
      products: categoryProducts,
    },
    revalidate: 60,
  };
}

