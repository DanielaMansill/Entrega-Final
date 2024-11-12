console.log("Conectado correctamente");

// async function obtenerUsuarios() {
//     try {
//       const response = await axios.get('https://ejemplo.com/usuarios');
//       console.log(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   }
  
//   obtenerUsuarios();

  async function consultarAlbum() {
    try {
      const response = await axios.get('http://localhost:4500/Album');
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  
  consultarAlbum();