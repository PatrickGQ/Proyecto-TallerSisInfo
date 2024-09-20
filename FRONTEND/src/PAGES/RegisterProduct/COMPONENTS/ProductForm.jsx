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
            Subir imagen <span>*</span>
          </label>
          <input
            type="file"
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