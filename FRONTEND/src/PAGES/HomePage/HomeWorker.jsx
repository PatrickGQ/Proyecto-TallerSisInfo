import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import { FaEye, FaBullhorn } from 'react-icons/fa';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeWorker = () => {
  const [motivationalImages, setMotivationalImages] = useState([]);
  const [branchMessages, setBranchMessages] = useState([]);

  // Fetch motivational images
  useEffect(() => {
    const fetchMotivationalImages = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/motivational-images');
        setMotivationalImages(response.data);
      } catch (error) {
        console.error('Error al obtener imágenes motivacionales:', error);
      }
    };
    fetchMotivationalImages();
  }, []);

  // Fetch branch messages
  useEffect(() => {
    const fetchBranchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/branch-messages');
        setBranchMessages(response.data);
      } catch (error) {
        console.error('Error al obtener mensajes de la sucursal:', error);
      }
    };
    fetchBranchMessages();
  }, []);

  // Configuración del carrusel de imágenes motivacionales
  const motivationalSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true, // Efecto de desvanecimiento entre las imágenes
  };

  // Configuración del carrusel de mensajes
  const messagesSliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false, // Quitar las flechas para hacerlo más limpio
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans flex flex-col">

      {/* Carrusel de Imágenes Motivacionales */}
      <section className="my-10">
        <h2 className="text-center text-3xl font-bold mb-6 text-gray-800">Imágenes Motivacionales</h2>
        <Slider {...motivationalSliderSettings} className="max-w-screen-xl mx-auto">
          {motivationalImages.map((image, index) => (
            <div key={index} className="relative transform transition-all hover:scale-105">
              <img
                src={`http://localhost:3000/uploads/${image.imageUrl}`}
                alt={`Motivational image ${index + 1}`}
                className="w-full h-64 sm:h-96 object-cover rounded-xl shadow-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-4 text-white">
                <p className="text-xl">{image.caption}</p>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Sección de mensajes de la sucursal */}
      <section className="bg-gradient-to-r from-blue-500 to-teal-500 text-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Mensajes de la Sucursal</h2>
          <Slider {...messagesSliderSettings} className="max-w-screen-xl mx-auto">
            {branchMessages.map((message, index) => (
              <div key={index} className="bg-white text-gray-800 p-8 rounded-lg shadow-2xl transform hover:scale-105 transition-all">
                <div className="flex items-center justify-center mb-4">
                  <FaBullhorn className="text-3xl text-yellow-400 mr-2" />
                  <p className="text-xl font-semibold">{message.title}</p>
                </div>
                <p className="mt-4">{message.content}</p>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Botón para ver más mensajes */}
      <section className="text-center py-8 bg-gray-800">
        <button
          onClick={() => alert("Ver más mensajes de la sucursal")}
          className="bg-yellow-500 text-white py-3 px-8 rounded-lg hover:bg-yellow-600 transition-all flex items-center justify-center mx-auto shadow-md transform hover:scale-105"
        >
          <FaEye className="mr-2" /> Ver más mensajes
        </button>
      </section>

      {/* Estilo de pie de página */}
      <footer className="text-center py-6 bg-gray-900 text-white">
        <p className="text-sm">© 2024 - Sistema de Gestión de Sucursal | Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default HomeWorker;
