import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar'; // Import the Navbar component
import { useRouter } from 'next/router';
import productsData from '../../data/products.json';
import categoriesData from '../../data/categories.json';
import styles from '../../styles/Home.module.css'; // Reusing styles for now

export default function ProductPage({ product }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return (
        <div className={styles.container}>
            <Head>
                <title>Product Not Found</title>
            </Head>
            <Navbar categories={categoriesData} />
            <main className={styles.main}>
                <h1 className={styles.title}>Product Not Found</h1>
                <p>The product you are looking for does not exist.</p>
                <Link href="/" legacyBehavior><a className={styles.card}>Go back to Home</a></Link>
            </main>
        </div>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{product.name}</title>
        <meta name="description" content={product.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar categories={categoriesData} /> {/* Add the Navbar here */}
      <main className={styles.main}>
        <h1 className={styles.title}>{product.name}</h1>
        <img src={`/${product.image_placeholder}`} alt={product.name} style={{maxWidth: '300px', margin: '20px auto'}} />
        <p className={styles.description}><strong>Description:</strong> {product.description}</p>
        <p><strong>Price:</strong> ${product.price} {product.original_price ? <span style={{textDecoration: 'line-through', color: 'grey'}}>${product.original_price}</span> : null}</p>
        <p><strong>Rating:</strong> {product.rating}/5 stars</p>
        
        <h3>Pros:</h3>
        <ul>
          {product.pros && product.pros.map((pro, index) => <li key={`pro-${index}`}>{pro}</li>)}
        </ul>

        <h3>Cons:</h3>
        <ul>
          {product.cons && product.cons.map((con, index) => <li key={`con-${index}`}>{con}</li>)}
        </ul>

        {product.reviews && product.reviews.length > 0 && (
            <div>
                <h3>User Reviews:</h3>
                {product.reviews.map((review, index) => (
                    <div key={`review-${index}`} style={{border: '1px solid #eee', padding: '10px', margin: '10px 0'}}>
                        <p><strong>{review.user}</strong> (rated: {review.rating}/5):</p>
                        <p>{review.comment}</p>
                    </div>
                ))}
            </div>
        )}

        <div className={styles.affiliateLinkContainer} style={{margin: '20px 0'}}>
          <a href={product.affiliate_link} target="_blank" rel="noopener noreferrer" className={styles.card} style={{display: 'inline-block', background: '#0070f3', color: 'white'}}>
            Cek Harga atau Beli Sekarang &rarr;
          </a>
        </div>

        <div className={styles.backToHomeContainer} style={{marginTop: '1rem'}}>
            <Link href={`/categories/${product.category_id}`} legacyBehavior><a className={styles.card}>&larr; Kembali ke Kategori {categoriesData.find(c=>c.id === product.category_id)?.name}</a></Link>
        </div>
        <div className={styles.backToHomeContainer} style={{marginTop: '1rem'}}>
            <Link href="/" legacyBehavior><a className={styles.card}>&larr; Kembali ke Beranda</a></Link>
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
  const paths = productsData.map(product => ({
    params: { productId: product.id.toString() },
  }));
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const productId = params.productId;
  const product = productsData.find(p => p.id === productId) || null;

  return {
    props: {
      product,
    },
    revalidate: 60, 
  };
}

