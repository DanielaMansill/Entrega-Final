document.getElementById('login-form').addEventListener('submit', function(event) {
  
    event.preventDefault();
    
  
   
    let password = document.getElementById('password').value;
    let email = document.getElementById('email').value;
  
  
    if (password === ''|| email === '') {
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
  