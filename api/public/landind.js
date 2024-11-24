
document.querySelectorAll('button')
let favorito = document.querySelectorAll('button')

for ( let i = 0; i < favorito.length; i++) { favorito[i].addEventListener('click', function() 
    { this.style.color ='yellow';
    
});}
for ( let i = 0; i < favorito.length; i++) { favorito[i].addEventListener('dblclick', function() 
    { this.style.color ='#A6A6A6';
    
});}



// for ( let  ){
//     favorito
// }
//         addEventListener( "click", function(){
//         button.forEach(button => {
//                 button.style.color = 'yellow'
//             });
//         })
    

window.addEventListener("DOMContentLoaded", function () {
    // Recuperar datos del localStorage
    const username = localStorage.getItem("nombre");
    const email = localStorage.getItem("email");
  
    // Mostrar los datos en el HTML
    document.getElementById("display-nombre").textContent = username || "Invitado";
    document.getElementById("display-email").textContent = email || "Sin correo registrado";
  });