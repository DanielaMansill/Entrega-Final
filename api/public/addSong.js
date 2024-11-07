// ----------------------------------addsong---------------------------------------------------
document.getElementById('Agregar').addEventListener('click', function(event) {
    event.preventDefault();

    const addSong = document.getElementById('addSong').value;
    const addDuracion = document.getElementById('addDuracion').value;
    const addUrl = document.getElementById('addUrl').value;


    if ( addSong === ''|| addUrl === ''|| addDuracion === '' ) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Todos los campos deben estar completos',
      });
    } 
  });