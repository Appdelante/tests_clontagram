const CREDENCIALES_VALIDAS = {
  email: 'pruebaprueba@gmail.com',
  password: 'prueba',
  username: 'prueba',
};

const CREDENCIALES_EMAIL_NO_EXISTE = {
  email: 'noexiste@gmail.com',
  password: 'prueba',
  username: 'prueba',
};

const CREDENCIALES_PASSWORD_INCORRECTO = {
  email: 'pruebaprueba@gmail.com',
  password: 'prueba123123',
  username: 'prueba',
};

const CREDENCIALS_NO_SIGUE_A_NADIE_NO_HA_SUBIDO_FOTOS = {
  email: 'testlogincredsvalidas@gmail.com',
  password: 'prueba',
  username: 'testlogincredsvalidas',
};

const CREDENCIALES_USUARIO_PARA_TESTS_DE_POSTS = {
  email: 'danieltestpost2@gmail.com',
  password: 'prueba',
  username: 'danieltestpost2',
};

module.exports = {
  CREDENCIALES_VALIDAS,
  CREDENCIALES_EMAIL_NO_EXISTE,
  CREDENCIALES_PASSWORD_INCORRECTO,
  CREDENCIALS_NO_SIGUE_A_NADIE_NO_HA_SUBIDO_FOTOS,
  CREDENCIALES_USUARIO_PARA_TESTS_DE_POSTS,
};
