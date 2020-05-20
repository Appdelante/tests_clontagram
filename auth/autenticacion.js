const axios = require('axios').default;
const { API_LOGIN_URL } = require('../configuracion/urls');

// Asi se ve una respuesta:
// {
//   token:
//     'eyJhbGciO...',
//   usuario: {
//     _id: '5d0304983de857e07ee0d34f',
//     email: 'holahola@gmail.com',
//     username: 'jorge',
//     bio: 'Me gusta la música',
//     nombre: 'jorge mas',
//     imagen:
//       'https://s3.amazonaws.com/vende-tus-corotos-data/imagenes/a5ea9fa6-7ad1-484f-b863-ade8d2d95258.jpg',
//     siguiendo: false,
//     numSeguidores: 19,
//     numSiguiendo: 6,
//   },
// };
module.exports = async function obtenerTokenYDataDeAutenticacion({
  email,
  password,
}) {
  try {
    let respuesta = await axios.post(API_LOGIN_URL, { email, password });
    return respuesta.data;
  } catch (e) {
    throw new Error(
      `Usuario con email [${email}] y contraseña [${password}] no pudo ser autenticado. ${e.name}: ${e.message}`
    );
  }
};
