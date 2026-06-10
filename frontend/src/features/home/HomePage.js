import "./home.css";
import Navbar from "../../components/navbar/navbar.jsx";
import Header from "../../components/header/header.jsx";
import Product from "../../components/product/product.jsx";
import { platos } from "../../mockData/platos.js";

const Home = () => {
  return (
    <section className="home">
      <Navbar />
      <div className="content">
        <Header />
        <div className="platos">
          {platos.map((plato) => (
            <Product
              nombre={plato.nombre}
              precio={plato.precio}
              img={plato.img}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
