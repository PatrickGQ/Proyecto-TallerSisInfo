const ProductForm = () => {
  return (
    <div>
      <form>
        <label>
            Nombre del Producto <span>*</span>
        </label>
        <input
        />
        <label>
            Precio <span>*</span>
        </label>
        <input
        />
        <label>
            ID para el producto<span>*</span>
        </label>
        <input
        />
        <button
            type="submit">
            Agregar Producto
        </button>
      </form>
    </div>
  );
};

export default ProductForm;