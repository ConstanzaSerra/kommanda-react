const Product = ({ nombre, img, precio }) => {
  return (
    <div className="card">
      <h3>{nombre}</h3>
      <img src={img} />
      <p className="price">{precio}</p>
    </div>
  );
};

export default Product;
