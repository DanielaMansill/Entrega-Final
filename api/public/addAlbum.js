const button = document.querySelector('button');
button.addEventListener('click', consultarAlbum);
const input = document.querySelector("input");

async function consultarAlbum() {
  try {
    const response = await axios.get(`http://localhost:4500/Albums/${input.value}`);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
  

const buttonAgregar = document.getElementById('button-agregar');
buttonAgregar.addEventListener('click', agregarAlbum);

// Función para agregar un álbum (POST)
async function agregarAlbum() {
  const titulo = document.getElementById('Titulo').value;
  const anio = document.getElementById('Año_de_lanzamiento').value;
  const descripcion = document.getElementById('Descripción').value;
  const url = document.getElementById('url').value;

  const nuevoAlbum = { 
    Titulo: titulo, 
    Año_de_lanzamiento: anio, 
    Descripción: descripcion, 
    Agregar_URL: url 
  };

  console.log(nuevoAlbum); 

  try {
    const response = await axios.post('http://localhost:4500/Albums', nuevoAlbum);
    mostrarAlbumEnDOM(response.data);

    // Limpiar el formulario
    const form = document.getElementById('Agregar');
    form.reset(); // Esto restablece los campos del formulario a su valor inicial
  } catch (error) {
    console.error('Error al agregar el álbum:', error);
  }
}

// Función para mostrar el álbum en el DOM con los botones de editar y eliminar
function mostrarAlbumEnDOM(album) {
  const albumElement = document.createElement('div');
  albumElement.classList.add('album-item');
  albumElement.innerHTML = `
  <h3>${album.Titulo}</h3>
  <p><strong>Año de Lanzamiento:</strong> ${album.Año_de_lanzamiento}</p>
  <p><strong>Descripción:</strong> ${album.Descripcion}</p>  <!-- Cambia de 'Descripción' a 'Descripcion' -->
  <a href="${album.Agregar_URL}" target="_blank">
    <i class="fa-solid fa-play"></i> Escuchar
  </a>
  <button class="editar-btn"><i class="fa-regular fa-pen-to-square"></i> Editar</button>
  <button class="eliminar-btn"><i class="fa-solid fa-trash"></i> Eliminar</button>
  `;

  document.getElementById('album-list').appendChild(albumElement);

  // Eventos de clic para Editar y Eliminar
  const editarButton = albumElement.querySelector('.editar-btn');
  const eliminarButton = albumElement.querySelector('.eliminar-btn');

  editarButton.addEventListener('click', () => editarAlbum(album._id, albumElement));
  eliminarButton.addEventListener('click', () => eliminarAlbum(album._id, albumElement));

}

// Función para editar un álbum (PUT)
async function editarAlbum(id, albumElement) {
  const nuevosDatos = {
    Titulo: prompt('Nuevo Título:', albumElement.querySelector('h3').textContent),
    Año_de_lanzamiento: prompt('Nuevo Año de Lanzamiento:', albumElement.querySelector('p:nth-child(2)').textContent.split(': ')[1]),
    descripcion: prompt('Nueva Descripción:', albumElement.querySelector('p:nth-child(3)').textContent.split(': ')[1]),
    Agregar_URL: prompt('Nueva URL:', albumElement.querySelector('a').href)
  };

  try {
    const response = await axios.put(`http://localhost:4500/Albums/${id}`, nuevosDatos);
    albumElement.querySelector('h3').textContent = nuevosDatos.Titulo;
    albumElement.querySelector('p:nth-child(2)').textContent = `Año de Lanzamiento: ${nuevosDatos.Año_de_lanzamiento}`;
    albumElement.querySelector('p:nth-child(3)').textContent = `Descripción: ${nuevosDatos.descripcion}`;
    albumElement.querySelector('a').href = nuevosDatos.Agregar_URL;
    albumElement.querySelector('a').textContent = " Escuchar";
  } catch (error) {
    console.error('Error al actualizar el álbum:', error);
  }
}

// Función para eliminar un álbum (DELETE)
async function eliminarAlbum(id, albumElement) {
  try {
    await axios.delete(`http://localhost:4500/Albums/${id}`);
    albumElement.remove();  // Elimina el álbum del DOM
  } catch (error) {
    console.error('Error al eliminar el álbum:', error);
  }
}