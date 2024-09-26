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
  
  const [step, setStep] = useState(1);  // Controla los pasos (1: Ingreso, 2: Confirmación)

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

  // Pasar al paso de confirmación
  const handleReview = (e) => {
    e.preventDefault();
    setStep(2);  // Cambiamos al paso de confirmación
  };

  // Confirmar la venta (enviar al backend)
  const handleConfirm = () => {
    console.log(form);  // Aquí iría la lógica para enviar el formulario al backend
    alert("Venta confirmada y registrada.");
  };

  // Volver al formulario para hacer cambios
  const handleBack = () => {
    setStep(1);  // Volvemos al paso del formulario
  };

  return (
    <div>
      {step === 1 && (
        <form onSubmit={handleReview} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <label>Nombre del Producto <span>*</span></label>
          <input type="text" name="productName" value={form.productName} onChange={handleChange} required />

          <label>Cantidad <span>*</span></label>
          <input type="number" name="quantity" value={form.quantity} onChange={handleChange} required />

          <label>Precio <span>*</span></label>
          <input type="number" name="price" value={form.price} onChange={handleChange} required />

          <label>Descuento aplicado (%) <span>*</span></label>
          <input type="number" name="discount" value={form.discount} onChange={handleChange} required />

          <label>Impuestos aplicados (%) <span>*</span></label>
          <input type="number" name="tax" value={form.tax} onChange={handleChange} required />

          <label>Total a pagar</label>
          <input type="number" name="totalAmount" value={form.totalAmount} readOnly />

          <button type="submit">Revisar Pedido</button>
        </form>
      )}

      {step === 2 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h2>Confirmación del Pedido</h2>
          <p><strong>Producto:</strong> {form.productName}</p>
          <p><strong>Cantidad:</strong> {form.quantity}</p>
          <p><strong>Precio:</strong> {form.price}</p>
          <p><strong>Descuento:</strong> {form.discount}%</p>
          <p><strong>Impuestos:</strong> {form.tax}%</p>
          <p><strong>Total a pagar:</strong> {form.totalAmount}</p>

          <button onClick={handleBack}>Volver a editar</button>
          <button onClick={handleConfirm}>Confirmar Venta</button>
        </div>
      )}
    </div>
  );
};

export default SaleForm;
