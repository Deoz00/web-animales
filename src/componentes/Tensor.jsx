import React, { useState, useEffect } from 'react';
import { helpHttp } from "../helper/helpHttp";
import * as tf from '@tensorflow/tfjs';



const Tensor = () => {


  useEffect(() => {
    const cargarModelo = async () => {
      // Cargar el modelo
      //const model = await tf.loadLayersModel('modeljs/model.json');


      const model = await tf.loadGraphModel('modeljs/model.json');



      // Cargar las imágenes y crear un conjunto de datos
      const x = ['images/ez.jpeg'];

      const imagePath = 'images/ez.jpeg'; // Reemplaza con la ruta de tu imagen
      


      const fileBuffer = await fetch("images/ez.jpeg");

      async function processImage(imagePath) {
        // Cargar la imagen como un array buffer
        const response = await fetch(imagePath);
       
        const arrayBuffer = await response.arrayBuffer();
        console.log(arrayBuffer)
        // Inicializar TensorFlow.js si no se ha hecho anteriormente
        
          await tf.ready();
        
      
        // Decodificar la imagen utilizando decodeImage en lugar de decodeJpeg
        const imageTensor = tf.node.decodeImage(new Uint8Array(arrayBuffer), 3);
      
        // Realizar el procesamiento adicional si es necesario
        // ...
      
        return imageTensor;
      }
      

      processImage(imagePath).then(processedImage => {
  console.log('Imagen procesada:', processedImage);
}).catch(error => {
  console.error('Error al procesar la imagen:', error);
});



      const imageBuffer = new Uint8Array("images/ez.jpeg");
      const imageTensor = tf.node.decodeJpeg(imageBuffer, 3); // 3 canales (RGB)

      // Convertir los valores de los canales de color de 0-255 a 0-1
      const normalizedImage = imageTensor.toFloat().div(tf.scalar(255));

      // Cambiar el tamaño de la imagen a la dimensión deseada (IMG_SIZE, IMG_SIZE)
      const resizedImage = tf.image.resizeBilinear(normalizedImage, [IMG_SIZE, IMG_SIZE]);

      const batchedTensor = tf.stack(resizedImage).reshape([BATCH_SIZE, IMG_SIZE, IMG_SIZE, 3]);

      console.log(model.predict(batchedTensor))



    };

    cargarModelo();
  }, []);


  return (
    <h3>nada</h3>
  );
};

export default Tensor;
