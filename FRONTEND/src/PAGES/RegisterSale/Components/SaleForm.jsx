import { useState, useEffect } from "react";

const SaleForm = () => {
  const [form, setForm] = useState({
    productName: "",
    quantity: 1,
    price: 0,
    discount: 0,
    tax: 0,  
    totalAmount: 0,
    date: new Date().toISOString().split('T')[0],  // Fecha actual por defecto
    time: "",  
  });

  const [cart, setCart] = useState([]);  // Estado para el carrito
  const [step, setStep] = useState(1);  // Controla los pasos (1: Ingreso, 2: Confirmación, 3: Método de pago)
  const [paymentMethod, setPaymentMethod] = useState("");  // Almacena el método de pago seleccionado
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardHolder: "",
    expirationDate: "",
    cvv: "",
  });
  const [discountMessage, setDiscountMessage] = useState(""); // Estado para el mensaje de descuento

  // Cálculo del total
  useEffect(() => {
    const subtotal = form.price * form.quantity;
    let discountAmount = (form.discount / 100) * subtotal;

    // Comprobar si hoy es jueves y aplicar un descuento adicional del 2%
    const today = new Date();
    const isThursday = today.getDay() === 4; 
    if (isThursday) {
      discountAmount += (2 / 100) * subtotal; 
      setDiscountMessage("¡Hoy es jueves! Aprovecha nuestro descuento del 2% en tu compra.");
    } else {
      setDiscountMessage(""); 
    }

    const subtotalWithDiscount = subtotal - discountAmount;
    const taxAmount = (form.tax / 100) * subtotalWithDiscount;  
    const total = subtotalWithDiscount + taxAmount;
    setForm((prevForm) => ({
      ...prevForm,
      totalAmount: total.toFixed(2),
      discount: isThursday ? 2 : prevForm.discount, 
    }));
  }, [form.price, form.quantity, form.discount]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({
      ...cardDetails,
      [name]: value,
    });
  };

  const handleReview = (e) => {
    e.preventDefault();
    const currentTime = new Date().toLocaleTimeString();
    setForm((prevForm) => ({
      ...prevForm,
      time: currentTime,
    }));
    setStep(2);
  };

  const handleConfirm = () => {
    setStep(3);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
    if (e.target.value !== "card") {
      setCardDetails({
        cardNumber: "",
        cardHolder: "",
        expirationDate: "",
        cvv: "",
      });
    }
  };

  const handleFinish = () => {
    alert("¡Gracias por comprar en Los Pollos Hermanos!");
  };

  const handleCardConfirm = (e) => {
    e.preventDefault();
    alert("Pago con tarjeta confirmado. ¡Gracias por su compra!");
    handleFinish();
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


          <label>Total a pagar</label>
          <input type="number" name="totalAmount" value={form.totalAmount} readOnly />

          {discountMessage && <p style={{ color: 'green' }}>{discountMessage}</p>} {/* Mostrar mensaje de descuento */}

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
          <p><strong>Fecha de Compra:</strong> {form.date}</p>
          <p><strong>Hora de Compra:</strong> {form.time}</p>
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
            <form onSubmit={handleCardConfirm} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label>Número de tarjeta <span>*</span></label>
              <input type="text" name="cardNumber" value={cardDetails.cardNumber} onChange={handleCardChange} required />

              <label>Nombre del titular <span>*</span></label>
              <input type="text" name="cardHolder" value={cardDetails.cardHolder} onChange={handleCardChange} required />

              <label>Fecha de expiración <span>*</span></label>
              <input type="month" name="expirationDate" value={cardDetails.expirationDate} onChange={handleCardChange} required />

              <label>CVV <span>*</span></label>
              <input type="text" name="cvv" value={cardDetails.cvv} onChange={handleCardChange} required />

              <button type="submit">Confirmar Pago</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default SaleForm;
