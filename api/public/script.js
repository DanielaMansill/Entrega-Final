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
      const response = await axios.get('https://proyecto-daniela-mansilla-p5.onrender.com/album');
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  
  consultarAlbum();

  let albumsAll = []; // Array para almacenar los álbumes cargados

// Función para obtener todos los álbumes desde la base de datos
async function loadAllAlbums() {
  try {
    const response = await axios.get('https://proyecto-daniela-mansilla-p5.onrender.com/album');
    albumsAll = response.data;
    displayAlbums(albumsAll);
  } catch (error) {
    console.error('Error al cargar todos los álbumes:', error);
  }
}

// Función para obtener un álbum específico por título
async function filterAndDisplayAlbum() {
  const albumTitle = document.getElementById('album-filter').value.trim();

  if (!albumTitle) {
    alert('Por favor, ingrese un nombre de álbum para buscar.');
    return;
  }

  try {
    const response = await axios.get(`https://proyecto-daniela-mansilla-p5.onrender.com/album/${albumTitle}`);
    const album = response.data;

    if (album && album.Titulo) { // Verificamos que el álbum contiene un título
      displayAlbums([album]);
    } else {
      alert('Álbum no encontrado.');
    }
  } catch (error) {
    console.error('Error al buscar el álbum:', error);
  }
}

// Función para mostrar los álbumes en el contenedor
function displayAlbums(albums) {
  const albumContainer = document.getElementById('album-container-tit');
  albumContainer.innerHTML = ''; // Limpiar el contenedor

  albums.forEach(album => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <h3>${album.Titulo}</h3>
      <p><strong>Escucha el álbum:</strong> <a href="${album.Agregar_URL}" target="_blank">
    <i class="fa-solid fa-headphones"></i> Escuchar</a>
</p>
      <p>Año de Lanzamiento: ${album.Año_de_lanzamiento}</p>
      <p>Descripción: ${album.Descripción}</p>
      <img src="${album.portada}" alt="Portada" style="width:100px;">
      <ul>
        <h4>Canciones:</h4>
        ${Array.isArray(album.canciones) && album.canciones.length > 0
          ? album.canciones.map(song => `
            <li>${song.Titulo} - ${song.Duracion}</li>
          `).join('')
          : '<p>No hay canciones disponibles.</p>'
        }
      </ul>
      <hr>
      
    `;
    albumContainer.appendChild(listItem);
  });
}

// Asignación de eventos a los botones
document.getElementById('button-addAlbum').addEventListener('click', filterAndDisplayAlbum);
document.getElementById('button-addAlbum-consultar').addEventListener('click', loadAllAlbums);
