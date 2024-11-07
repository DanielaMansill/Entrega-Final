
document.getElementById('login-form').addEventListener('submit', function(event) {
  
  event.preventDefault();
  

  let nombre = document.getElementById('nombre').value;
  let password = document.getElementById('password').value;
  let email = document.getElementById('email').value;


  if (nombre === '' || password === ''|| email === '') {
    Swal.fire({
      title: 'Error',
      text: 'Todos los campos deben estar completos',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });

    
  } 
  else if (password.length < 6) {
    Swal.fire({
      title: 'Error',
      text: 'La contraseña debe tener al menos 6 caracteres',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  } 
  
  else {
  
    Swal.fire({
      title: 'Correcto',
      text: 'Iniciando sesión...',
      icon: 'success',
      confirmButtonText: 'Aceptar'
      
    });
  
  }
});





// Un pop up a la pantalla de login que le avise al usuario que debe completar todos los campos si no lo hizo. LISTO
// Una leyenda: "Tu respuesta es demasiado corta" que debe aparecer solo si la contraseña es muy corta (menor a 6 caracteres). Listo
//  La misma debe desaparecer cuando el usuario modifica el input pasando ese límite. Listo.
