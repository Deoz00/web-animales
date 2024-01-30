import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import {useModelContext}  from '../context/ModelContext';



const Tf = ({ img, loading }) => {
    const [predict, setPredict] = useState(null);
    const { model, setModel } = useModelContext();



    /*  const breed = ['affenpinscher', 'afghan_hound', 'african_hunting_dog', 'airedale',
         'american_staffordshire_terrier', 'appenzeller',
         'australian_terrier', 'basenji', 'basset', 'beagle',
         'bedlington_terrier', 'bernese_mountain_dog',
         'black-and-tan_coonhound', 'blenheim_spaniel', 'bloodhound',
         'bluetick', 'border_collie', 'border_terrier', 'borzoi',
         'boston_bull', 'bouvier_des_flandres', 'boxer',
         'brabancon_griffon', 'briard', 'brittany_spaniel', 'bull_mastiff',
         'cairn', 'cardigan', 'chesapeake_bay_retriever', 'chihuahua',
         'chow', 'clumber', 'cocker_spaniel', 'collie',
         'curly-coated_retriever', 'dandie_dinmont', 'dhole', 'dingo',
         'doberman', 'english_foxhound', 'english_setter',
         'english_springer', 'entlebucher', 'eskimo_dog',
         'flat-coated_retriever', 'french_bulldog', 'german_shepherd',
         'german_short-haired_pointer', 'giant_schnauzer',
         'golden_retriever', 'gordon_setter', 'great_dane',
         'great_pyrenees', 'greater_swiss_mountain_dog', 'groenendael',
         'ibizan_hound', 'irish_setter', 'irish_terrier',
         'irish_water_spaniel', 'irish_wolfhound', 'italian_greyhound',
         'japanese_spaniel', 'keeshond', 'kelpie', 'kerry_blue_terrier',
         'komondor', 'kuvasz', 'labrador_retriever', 'lakeland_terrier',
         'leonberg', 'lhasa', 'malamute', 'malinois', 'maltese_dog',
         'mexican_hairless', 'miniature_pinscher', 'miniature_poodle',
         'miniature_schnauzer', 'newfoundland', 'norfolk_terrier',
         'norwegian_elkhound', 'norwich_terrier', 'old_english_sheepdog',
         'otterhound', 'papillon', 'pekinese', 'pembroke', 'pit_bull',
         'pomeranian', 'pug', 'redbone', 'rhodesian_ridgeback',
         'rottweiler', 'saint_bernard', 'saluki', 'samoyed', 'schipperke',
         'scotch_terrier', 'scottish_deerhound', 'sealyham_terrier',
         'shetland_sheepdog', 'shih-tzu', 'siberian_husky', 'silky_terrier',
         'soft-coated_wheaten_terrier', 'staffordshire_bullterrier',
         'standard_poodle', 'standard_schnauzer', 'sussex_spaniel',
         'tibetan_mastiff', 'tibetan_terrier', 'toy_poodle', 'toy_terrier',
         'vizsla', 'walker_hound', 'weimaraner', 'welsh_springer_spaniel',
         'west_highland_white_terrier', 'whippet',
         'wire-haired_fox_terrier', 'yorkshire_terrier']; */

    const breed = ['Afghan_hound', 'African_hunting_dog', 'Airedale',
        'American_Staffordshire_terrier', 'Appenzeller',
        'Australian_terrier', 'Bedlington_terrier', 'Bernese_mountain_dog',
        'Blenheim_spaniel', 'Border_collie', 'Border_terrier',
        'Boston_bull', 'Bouvier_des_Flandres', 'Brabancon_griffon',
        'Brittany_spaniel', 'Cardigan', 'Chesapeake_Bay_retriever',
        'Chihuahua', 'Dandie_Dinmont', 'Doberman', 'English_foxhound',
        'English_setter', 'English_springer', 'EntleBucher', 'Eskimo_dog',
        'French_bulldog', 'German_shepherd', 'German_short',
        'Gordon_setter', 'Great_Dane', 'Great_Pyrenees',
        'Greater_Swiss_Mountain_dog', 'Ibizan_hound', 'Irish_setter',
        'Irish_terrier', 'Irish_water_spaniel', 'Irish_wolfhound',
        'Italian_greyhound', 'Japanese_spaniel', 'Kerry_blue_terrier',
        'Labrador_retriever', 'Lakeland_terrier', 'Leonberg', 'Lhasa',
        'Maltese_dog', 'Mexican_hairless', 'Newfoundland',
        'Norfolk_terrier', 'Norwegian_elkhound', 'Norwich_terrier',
        'Old_English_sheepdog', 'Pekinese', 'Pembroke', 'Pomeranian',
        'Rhodesian_ridgeback', 'Rottweiler', 'Saint_Bernard', 'Saluki',
        'Samoyed', 'Scotch_terrier', 'Scottish_deerhound',
        'Sealyham_terrier', 'Shetland_sheepdog', 'Shih', 'Siberian_husky',
        'Staffordshire_bullterrier', 'Sussex_spaniel', 'Tibetan_mastiff',
        'Tibetan_terrier', 'Walker_hound', 'Weimaraner',
        'Welsh_springer_spaniel', 'West_Highland_white_terrier',
        'Yorkshire_terrier', 'affenpinscher', 'basenji', 'basset',
        'beagle', 'black', 'bloodhound', 'bluetick', 'borzoi', 'boxer',
        'briard', 'bull_mastiff', 'cairn', 'chow', 'clumber',
        'cocker_spaniel', 'collie', 'curly', 'dhole', 'dingo', 'flat',
        'giant_schnauzer', 'golden_retriever', 'groenendael', 'keeshond',
        'kelpie', 'komondor', 'kuvasz', 'malamute', 'malinois',
        'miniature_pinscher', 'miniature_poodle', 'miniature_schnauzer',
        'otterhound', 'papillon', 'pug', 'redbone', 'schipperke',
        'silky_terrier', 'soft', 'standard_poodle', 'standard_schnauzer',
        'toy_poodle', 'toy_terrier', 'vizsla', 'whippet', 'wire'];



    // Estado para almacenar la referencia a la imagen y su carga


    useEffect(() => {
        cargarImagen();
    }, [img]);

    const cargarImagen = () => {

        setPredict(null);
        const imagen = new Image();
        imagen.src = img;

        imagen.onload = async () => {
            try {

                //const model = await tf.loadGraphModel('modeljs/model.json');
               // const model = await tf.loadLayersModel('modeljs/modelo90/data/model.json');

                tf.engine().startScope(); // Iniciar un nuevo ámbito de memoria

                tf.tidy(() => {
                    // Crear un tensor de la imagen cargada
                    let tensor = tf.browser.fromPixels(imagen);
                    tensor = tf.image.resizeBilinear(tensor, [299, 299]);
                    //const imagenRedimensionada = tf.image.resizeBilinear(tensor, [224, 224]);
                    tensor = tensor.div(tf.scalar(255));
                    tensor = tensor.expandDims();




                    let predict12 = model.predict(tensor)
                    const predictionsArray = predict12.dataSync();
                    const maxIndex = predictionsArray.indexOf(Math.max(...predictionsArray));
                    setPredict([breed[maxIndex], predictionsArray[maxIndex]]);
                    tensor.dispose();
                    predict12.dispose();


                });

              //  model.dispose();
              // tf.disposeVariables(); // Liberar todas las variables
                tf.webgl.forceHalfFloat(); // Otras opciones disponibles: forceFloat16, forceFloat32, etc.
                tf.dispose();

                loading();



            } catch (error) {
                console.error('Error al cargar la imagen:', error);
            } finally {

                tf.engine().endScope(); // Finalizar el ámbito de memoria

            }
        };
    };






    return (
        <div>
            {predict && <h2>{predict[0]}</h2>}
        </div>
    );
};

export default Tf;
