/*
  Opciones básicas de configuración + configuración inicial
 */

export const fontFamilies = [
  "Impact",
  "Comic Sans",
  "Arial",
  "Myriad Pro",
  "Montserrat",
];

export const fontSizes = ['7', '8', '9', '10', '11', '12', '14', '16', '17', '18', '20', '24', '28', '32'];

export const textAlignments = [ 'start', 'center', 'end' ];

export const strokeWidths = ['0', '0.5', '1', '1.5', '2', '2.5', '3'];

/* 
const getRandomItem = (arr) => {
  // Por si se quiere aleatorizar la configuración inicial
  const randomIndex = (Math.floor(Math.random() * arr.length))
  return arr.at(randomIndex)
}
 */

export const initialConfig = {
  fontFamily: fontFamilies.at(0),
  fontSize: fontSizes.at(9),
  fontColor: "#fff",
  fontStrokeColor: "#000", 
  fontStrokeWidth: strokeWidths.at(3),
  textAlign: textAlignments.at(0),
}