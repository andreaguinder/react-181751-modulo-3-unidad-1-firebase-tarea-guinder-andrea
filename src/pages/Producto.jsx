import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import ProductDetail from '../components/ProductDetail/ProductDetail';
import Loader from '../components/Loader/Loader';

function Producto() {
  const { id } = useParams(); 
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const docRef = doc(db, 'productos', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProducto({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error("No se encontró el producto en Firestore");
        }
      } catch (err) {
        console.error("Error al traer el detalle de Firestore:", err);
      }
    };

    if (id) {
      obtenerProducto();
    }
  }, [id]);

  if (!producto) return <Loader />;

  return (
    <ProductDetail
      title={producto.title}
      image={producto.image}
      category={producto.category}
      description={producto.description}
      price={producto.price}
    />
  );
}

export default Producto;