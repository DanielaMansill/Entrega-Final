const BASE_URL = 'https://proyecto-daniela-mansilla-p5.onrender.com/song';
const form = document.getElementById('Agregar');
const songsList = document.getElementById('songs-list');


form.addEventListener('submit', async (e) => {
    e.preventDefault(); /

    // Captura los valores ingresados
    const titulo = document.getElementById('titulo').value;
    const duracion = document.getElementById('duracion').value;
    const url = document.getElementById('Agregar_url').value;
    const nuevaCancion = { titulo, duracion, url };

    try {
        
        const response = await axios.post(BASE_URL, nuevaCancion);
        const songId = response.data._id; 

        
        const newSongDiv = document.createElement('div');
        newSongDiv.classList.add('song-item');
        newSongDiv.dataset.id = songId;
        newSongDiv.innerHTML = `
            <h3>${titulo}</h3>
            <p>Duración: ${duracion}</p>
            <a href="${url}" target="_blank">
                <i class="fa-solid fa-play"></i> Escuchar
            </a>
            <button class="editar-btn"><i class="fa-regular fa-pen-to-square"></i> Editar</button>
            <button class="eliminar-btn"><i class="fa-solid fa-trash"></i> Eliminar</button>
        `;

       
        songsList.appendChild(newSongDiv);

        
        const editBtn = newSongDiv.querySelector('.editar-btn');
        const deleteBtn = newSongDiv.querySelector('.eliminar-btn');
        editBtn.addEventListener('click', () => editarCancion(songId));
        deleteBtn.addEventListener('click', () => {
          const songId = newSongDiv.dataset.id; 
          eliminarCancion(songId); 
      });

       
        form.reset();

        // SweetAlert de éxito
        Swal.fire({
            title: '¡Éxito!',
            text: 'La canción ha sido agregada correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
    } catch (error) {
        console.error('Error al agregar la canción:', error);
        Swal.fire({
            title: 'Error',
            text: 'No se pudo agregar la canción.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    }
});

// Función para editar una canción
async function editarCancion(id) {
    try {
        // Selecciona el div con el ID de la canción
        const songDiv = document.querySelector(`[data-id="${id}"]`);
        if (!songDiv) {
            console.error(`No se encontró el elemento con data-id=${id}`);
            return;
        }

        // Obtener los valores actuales de la canción
        const titulo = songDiv.querySelector('h3').innerText;
        const duracion = songDiv.querySelector('p').innerText.split(": ")[1];
        const url = songDiv.querySelector('a').href;

        // Mostrar un formulario de edición con SweetAlert
        const { value: formValues } = await Swal.fire({
            title: 'Editar Canción',
            html: `
                <label>Título</label><input id="edit-titulo" class="swal2-input" value="${titulo}">
                <label>Duración</label><input id="edit-duracion" class="swal2-input" value="${duracion}">
                <label>URL</label><input id="edit-url" class="swal2-input" value="${url}">
            `,
            focusConfirm: false,
            preConfirm: () => ({
                titulo: document.getElementById('edit-titulo').value,
                duracion: document.getElementById('edit-duracion').value,
                url: document.getElementById('edit-url').value
            })
        });

       
        if (formValues) {
            const response = await axios.put(`${BASE_URL}/${id}`, formValues);

         
            songDiv.querySelector('h3').innerText = response.data.titulo;
            songDiv.querySelector('p').innerText = `Duración: ${response.data.duracion}`;
            songDiv.querySelector('a').href = response.data.url;

            Swal.fire({
                title: '¡Éxito!',
                text: 'La canción ha sido actualizada.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
        }
    } catch (error) {
        console.error('Error al actualizar la canción:', error);
        Swal.fire({
            title: 'Error',
            text: 'No se pudo actualizar la canción.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    }
}

// Función para eliminar la canción
async function eliminarCancion(id) {
  try {
      const confirmDelete = await Swal.fire({
          title: '¿Estás seguro?',
          text: "Esta acción no se puede deshacer",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sí, eliminar',
          cancelButtonText: 'Cancelar'
      });

      if (confirmDelete.isConfirmed) {
          
          await axios.delete(`http://localhost:4500/song/${id}`);

          
          const songDiv = document.querySelector(`[data-id="${id}"]`);
          if (songDiv) {
              songDiv.remove();
          }

          Swal.fire({
              title: 'Eliminada',
              text: 'La canción ha sido eliminada correctamente.',
              icon: 'success',
              confirmButtonText: 'Aceptar'
          });
      }
  } catch (error) {
      console.error('Error al eliminar la canción:', error);
      Swal.fire({
          title: 'Error',
          text: 'No se pudo eliminar la canción.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
      });
  }
}


