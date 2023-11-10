// Importe a biblioteca Geolib.js (certifique-se de incluir a biblioteca no seu projeto)
const geolib = require('geolib');
const NodeGeocoder = require('node-geocoder');

// function calcularDistanciaEntreEnderecos(endereco1, endereco2) {
//   // Use uma função de geocodificação ou serviço de mapas para obter as coordenadas
//   // Neste exemplo, as coordenadas são definidas manualmente apenas para fins de demonstração
//   const coordenadas1 = { latitude: -23.550520, longitude: -46.633308 }; // Exemplo: Avenida Paulista, São Paulo
//   const coordenadas2 = { latitude: -22.971267, longitude: -43.182973 }; // Exemplo: Copacabana Beach, Rio de Janeiro

//   // Calcule a distância entre as coordenadas em metros
//   const distanciaEmMetros = geolib.getDistance(coordenadas1, coordenadas2);

//   // Converta a distância para quilômetros (ou outra unidade desejada)
//   const distanciaEmKilometros = distanciaEmMetros / 1000;

//   console.log(`A distância entre os endereços é de ${distanciaEmKilometros.toFixed(2)} quilômetros.`);
// }

// // Exemplo de uso:
// const endereco1 = 'Campinas, São Paulo, Brazil';
// const endereco2 = 'Rio de Janeiro, Rio de Janeiro, Brazil';
// calcularDistanciaEntreEnderecos(endereco1, endereco2);


// Configurar as opções de geocodificação usando OpenStreetMap (Nominatim)
const geocoder = NodeGeocoder({
  provider: 'openstreetmap'
});

async function obterCoordenadasDoEndereco(endereco) {
  try {
    const response = await geocoder.geocode(endereco);
    
    if (response.length > 0) {
      const coordenadas = {
        latitude: response[0].latitude,
        longitude: response[0].longitude
      };
      return coordenadas;
    } else {
      console.error('Endereço não encontrado.');
      return null;
    }
  } catch (error) {
    console.error('Erro na geocodificação:', error);
    return null;
  }
}

// Exemplo de uso:
const endereco1 = 'Campinas, São Paulo, Brazil';
const endereco2 = 'Copacabana Beach, Rio de Janeiro, Brazil';

async function main() {
  const coordenadas1 = await obterCoordenadasDoEndereco(endereco1);
  const coordenadas2 = await obterCoordenadasDoEndereco(endereco2);

  if (coordenadas1 && coordenadas2) {
    console.log('Coordenadas do Endereço 1:', coordenadas1);
    console.log('Coordenadas do Endereço 2:', coordenadas2);
  }
}

main();
