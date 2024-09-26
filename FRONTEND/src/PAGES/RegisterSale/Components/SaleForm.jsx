import { useState, useEffect } from "react";

const SaleForm = () => {
  const [form, setForm] = useState({
    productName: "",  
    quantity: 1,     
    price: 0,        
    discount: 0,     
    tax: 0,          
    totalAmount: 0,  
  });

  // Cálculo del total
  useEffect(() => {
    const subtotal = form.price * form.quantity;
    const discountAmount = (form.discount / 100) * subtotal;
    const subtotalWithDiscount = subtotal - discountAmount;
    const taxAmount = (form.tax / 100) * subtotalWithDiscount;
    const total = subtotalWithDiscount + taxAmount;
    setForm((prevForm) => ({
      ...prevForm,
      totalAmount: total.toFixed(2),  
    }));
  }, [form.price, form.quantity, form.discount, form.tax]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);  
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label>
          Nombre del Producto <span>*</span>
        </label>
        <input
          type="text"
          name="productName"
          value={form.productName}
          onChange={handleChange}
          required
        />

        <label>
          Cantidad <span>*</span>
        </label>
        <input
          type="number"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          required
        />

        <label>
          Precio <span>*</span>
        </label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <label>
          Descuento aplicado (%) <span>*</span>
        </label>
        <input
          type="number"
          name="discount"
          value={form.discount}
          onChange={handleChange}
          required
        />

        <label>
          Impuestos aplicados (%) <span>*</span>
        </label>
        <input
          type="number"
          name="tax"
          value={form.tax}
          onChange={handleChange}
          required
        />

        <label>
          Total a pagar <span>*</span>
        </label>
        <input
          type="number"
          name="totalAmount"
          value={form.totalAmount}
          readOnly
        />

        <button type="submit">Registrar Venta</button>
      </form>
    </div>
  );
};

export default SaleForm;
