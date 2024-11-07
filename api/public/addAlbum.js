document.addEventListener("DOMContentLoaded", () => {
    const albumContainer = document.getElementById("album-list");
    const addButton = document.getElementById("button-agregar");
  
    // Función para agregar un álbum
    addButton.addEventListener("click", () => {
      const titulo = document.getElementById("addSong").value;
      const año = document.getElementById("Año_de_lanzamiento").value;
      const descripcion = document.getElementById("descripcion").value;
  
      if (titulo && año && descripcion) {
        const albumDiv = document.createElement("div");
        albumDiv.classList.add("album-item");
        albumDiv.innerHTML = `
          <h3>${titulo}</h3>
          <p>Año de Lanzamiento: ${año}</p>
          <p>${descripcion}</p>
          <button class="edit-album">Editar</button>
          <button class="delete-album">Eliminar</button>
        `;
  
        
        albumDiv.querySelector(".delete-album").addEventListener("click", () => {
          albumContainer.removeChild(albumDiv);
        });
  
       //editar en dom
        albumDiv.querySelector(".edit-album").addEventListener("click", () => {
          document.getElementById("addSong").value = titulo;
          document.getElementById("Año_de_lanzamiento").value = año;
          document.getElementById("descripcion").value = descripcion;
          albumContainer.removeChild(albumDiv);
        });
  
        albumContainer.appendChild(albumDiv);
  
        // Limpiar el formulario
        document.getElementById("addSong").value = "";
        document.getElementById("Año_de_lanzamiento").value = "";
        document.getElementById("descripcion").value = ""
        document.getElementById("URL").value = "";
      } else {
        Swal.fire("Por favor, completa todos los campos.");
      }
    });
  });
  
  async function agregarAlbum() {
    try {
      const response = await axios.get('https://ejemplo.com/usuarios');
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  
  obtenerUsuarios();


