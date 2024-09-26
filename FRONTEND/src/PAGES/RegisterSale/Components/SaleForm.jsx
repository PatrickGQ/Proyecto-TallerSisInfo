import { useState, useEffect } from "react";

const SaleForm = () => {
  const [form, setForm] = useState({
    productName: "",
    quantity: 1,
    price: 0,
    discount: 0,
    tax: 15,  // Impuesto fijo del 15%
    totalAmount: 0,
    date: "",  // Nueva propiedad para almacenar la fecha seleccionada
    time: "",  // Nueva propiedad para almacenar la hora automáticamente
  });
  
  const [step, setStep] = useState(1);  // Controla los pasos (1: Ingreso, 2: Confirmación, 3: Método de pago)
  const [paymentMethod, setPaymentMethod] = useState("");  // Almacena el método de pago seleccionado

  // Cálculo del total
  useEffect(() => {
    const subtotal = form.price * form.quantity;
    const discountAmount = (form.discount / 100) * subtotal;
    const subtotalWithDiscount = subtotal - discountAmount;
    const taxAmount = (form.tax / 100) * subtotalWithDiscount;  // Impuesto fijo
    const total = subtotalWithDiscount + taxAmount;
    setForm((prevForm) => ({
      ...prevForm,
      totalAmount: total.toFixed(2),
    }));
  }, [form.price, form.quantity, form.discount]);

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
    const currentTime = new Date().toLocaleTimeString(); // Obtener la hora actual en formato local
    setForm((prevForm) => ({
      ...prevForm,
      time: currentTime, // Asignar la hora al formulario
    }));
    setStep(2);  // Cambiamos al paso de confirmación
  };

  // Confirmar la venta y mostrar opciones de pago
  const handleConfirm = () => {
    setStep(3);  // Cambiamos al paso de selección de método de pago
  };

  // Manejar el cambio del método de pago
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // Finalizar la compra y mostrar el mensaje de agradecimiento
  const handleFinish = () => {
    alert("¡Gracias por comprar en Los Pollos Hermanos!");
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

          {/* Nuevo campo para seleccionar la fecha */}
          <label>Fecha de Compra <span>*</span></label>
          <input type="date" name="date" value={form.date} onChange={handleChange} required />

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
          <p><strong>Impuestos:</strong> {form.tax}%</p> {/* Impuesto fijo */}
          <p><strong>Fecha de Compra:</strong> {form.date}</p>  {/* Mostrar la fecha seleccionada */}
          <p><strong>Hora de Compra:</strong> {form.time}</p>  {/* Mostrar la hora seleccionada */}
          <p><strong>Total a pagar:</strong> {form.totalAmount}</p>

          <button onClick={handleConfirm}>Confirmar Venta</button>
        </div>
      )}

      {step === 3 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h2>Selecciona el método de pago</h2>
          <select onChange={handlePaymentMethodChange} value={paymentMethod}>
            <option value="">Seleccione un método de pago</option>
            <option value="cash">Pago en efectivo</option>
            <option value="qr">Pago por QR</option>
            <option value="card">Pago con tarjeta</option>
          </select>

          {/* Mostrar comportamiento basado en el método de pago seleccionado */}
          {paymentMethod === "cash" && (
            <div>
              <p>Gracias por su compra</p>
              <button onClick={handleFinish}>Finalizar</button>
            </div>
          )}

          {paymentMethod === "qr" && (
            <div>
              <p>Por favor, escanee el código QR para completar el pago:</p>
              <img src="https://example.com/qr-code" alt="Código QR" width="200" />
              <button onClick={handleFinish}>Finalizar</button>
            </div>
          )}

          {paymentMethod === "card" && (
            <div>
              <p>Por favor, registre su tarjeta (esta función se implementará en el futuro).</p>
              <button onClick={handleFinish}>Finalizar</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SaleForm;
