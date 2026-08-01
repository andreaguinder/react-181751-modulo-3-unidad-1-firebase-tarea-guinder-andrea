import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard/ProductCard';
import styles from '../styles/Pages.module.scss';
import Loader from '../components/Loader/Loader';

// Firestore imports necesarios
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

const Inicio = () => {
  const [productos, setProductos] = useState(null);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const productosRef = collection(db, 'productos');

        // Filtramos por la categoría "women's clothing"
        const q = query(productosRef, where("category", "==", "women's clothing"));
        const querySnapshot = await getDocs(q);

        const docs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setProductos(docs);
      } catch (err) {
        console.error("Error al traer productos de Firestore:", err);
      }
    };

    obtenerProductos();
  }, []);

  if (!productos) return <Loader />;

  return (
    <div className={styles.containerGeneral}>
      <h1>Nuestros Productos</h1>
      <div className={styles.containerProductosInicio}>
        {productos.map(prod => (
          <ProductCard
            key={prod.id}
            id={prod.id}
            image={prod.image}
            title={prod.title}
            price={prod.price}
          />
        ))}
      </div>
    </div>
  );
};

export default Inicio;