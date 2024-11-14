

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
    const response = await axios.post('https://proyecto-daniela-mansilla-p5.onrender.com/album', nuevoAlbum);
    mostrarAlbumEnDOM(response.data);

   
    const form = document.getElementById('Agregar');
    form.reset(); 
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
  <p><strong>Descripción:</strong> ${album.Descripción}</p>  <!-- Cambia de 'Descripción' a 'Descripcion' -->
  <a href="${album.Agregar_URL}" target="_blank">
    <i class="fa-solid fa-headphones"></i> Escuchar
  </a>
  <button class="editar-btn" id="iconos"><i class="fa-regular fa-pen-to-square"></i> Editar</button>
  <button class="eliminar-btn" id="iconos"><i class="fa-solid fa-trash"></i> Eliminar</button>
  `;

  document.getElementById('album-list').appendChild(albumElement);

  // Eventos de clic para Editar y Eliminar
  const editarButton = albumElement.querySelector('.editar-btn');
  const eliminarButton = albumElement.querySelector('.eliminar-btn');

  editarButton.addEventListener('click', () => editarAlbum(album._id, albumElement));
  eliminarButton.addEventListener('click', () => eliminarAlbum(album._id, albumElement));

}

// Función para editar un álbum 
async function editarAlbum(id, albumElement) {
  const nuevosDatos = {
    Titulo: prompt('Nuevo Título:', albumElement.querySelector('h3').textContent),
    Año_de_lanzamiento: prompt('Nuevo Año de Lanzamiento:', albumElement.querySelector('p:nth-child(2)').textContent.split(': ')[1]),
    Descripción: prompt('Nueva Descripción:', albumElement.querySelector('p:nth-child(3)').textContent.split(': ')[1]),
    Agregar_URL: prompt('Nueva URL:', albumElement.querySelector('a').href)
  };

  try {
    const response = await axios.put(`https://proyecto-daniela-mansilla-p5.onrender.com/album/${id}`, nuevosDatos);
    albumElement.querySelector('h3').textContent = nuevosDatos.Titulo;
    albumElement.querySelector('p:nth-child(2)').textContent = `Año de Lanzamiento: ${nuevosDatos.Año_de_lanzamiento}`;
    albumElement.querySelector('p:nth-child(3)').textContent = `Descripción: ${nuevosDatos.Descripción}`;
    albumElement.querySelector('a').href = nuevosDatos.Agregar_URL;
    albumElement.querySelector('a').textContent = " Escuchar";
  } catch (error) {
    console.error('Error al actualizar el álbum:', error);
  }
}

// Función para eliminar 
async function eliminarAlbum(id, albumElement) {
  try {
    await axios.delete(`https://proyecto-daniela-mansilla-p5.onrender.com/album/${id}`);
    albumElement.remove();  
  } catch (error) {
    console.error('Error al eliminar el álbum:', error);
  }
}

