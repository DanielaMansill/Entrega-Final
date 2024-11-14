const buttonAgregar = document.getElementById('button-agregar');
buttonAgregar.addEventListener('click', agregarAlbum);

// Función para agregar un álbum (POST)
async function agregarAlbum() {
  const titulo = document.getElementById('Titulo').value;
  const anio = document.getElementById('Año_de_lanzamiento').value;
  const descripcion = document.getElementById('Descripción').value;
  const url = document.getElementById('url').value;
  const portada = document.getElementById('portada')
  
  let imagenAlbum = document.getElementById('portada').value; // Intentamos primero con la URL ingresada

  // Si no se proporcionó URL, intentamos obtener la imagen cargada localmente
  if (!imagenAlbum) {
    const fileInput = document.getElementById('portada');
    if (fileInput.files && fileInput.files[0]) {
      // Si el usuario seleccionó una imagen local, la convertimos a base64
      const file = fileInput.files[0];
      imagenAlbum = await fileToBase64(file);
    } else {
      // Si no se proporciona imagen ni URL, puedes asignar una imagen por defecto
      imagenAlbum = 'ruta/a/imagen/default.jpg'; // Cambia esta ruta según tu necesidad
    }
  }

  const nuevoAlbum = { 
    Titulo: titulo, 
    Año_de_lanzamiento: anio, 
    Descripción: descripcion, 
    Agregar_URL: url,
    Portada: imagenAlbum // Puede ser la URL de la imagen o una imagen en base64
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

// Función para convertir archivo de imagen a base64
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result); // Obtiene la base64 de la imagen
    reader.onerror = reject;
    reader.readAsDataURL(file); // Lee el archivo como base64
  });
}

// Función para mostrar el álbum en el DOM con la portada
function mostrarAlbumEnDOM(album) {
  const albumElement = document.createElement('div');
  albumElement.classList.add('album-item');
  albumElement.innerHTML = `
    <h3>${album.Titulo}</h3>
    <p><strong>Año de Lanzamiento:</strong> ${album.Año_de_lanzamiento}</p>
    <p><strong>Descripción:</strong> ${album.Descripción}</p>
    <a href="${album.Agregar_URL}" target="_blank">
      <i class="fa-solid fa-headphones"></i> Escuchar
    </a>
    <button class="editar-btn" id="iconos"><i class="fa-regular fa-pen-to-square"></i> Editar</button>
    <button class="eliminar-btn" id="iconos"><i class="fa-solid fa-trash"></i> Eliminar</button>
  `;

  // Crear el elemento de la imagen con un tamaño específico
  const imagen = document.createElement('img');
  imagen.src = album.Portada; // La imagen puede ser una URL o base64
  imagen.alt = 'Portada del álbum';
  imagen.style.width = '200px'; // Ancho de 200px
  imagen.style.height = '200px'; // Alto de 200px
  imagen.style.objectFit = 'cover'; // Ajusta la imagen sin deformarla

  // Insertar la imagen antes de los botones
  albumElement.insertBefore(imagen, albumElement.querySelector('.editar-btn'));

  document.getElementById('album-list').appendChild(albumElement);
}

  // Eventos de clic para Editar y Eliminar
  const editarButton = albumElement.querySelector('.editar-btn');
  const eliminarButton = albumElement.querySelector('.eliminar-btn');

  editarButton.addEventListener('click', () => editarAlbum(album._id, albumElement));
  eliminarButton.addEventListener('click', () => eliminarAlbum(album._id, albumElement));



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

