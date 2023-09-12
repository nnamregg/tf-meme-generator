/*
  Opciones básicas de configuración
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

const getRandomItem = (arr) => {
  // why ? just why ???
  // just because...
  const randomIndex = (Math.floor(Math.random() * arr.length))
  return arr[randomIndex]
}

export const initialConfig = {
  fontFamily: getRandomItem(fontFamilies),
  fontSize: getRandomItem(fontSizes),
  fontColor: "#fff",
  fontStrokeColor: "#000", 
  fontStrokeWidth: getRandomItem(strokeWidths),
  textAlign: getRandomItem(textAlignments),
}