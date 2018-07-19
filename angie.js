firebase.initializeApp({
  apiKey: "AIzaSyCgXdm96Jw77wwlOdBUeHo_-9P-CGkltqc",
  authDomain: "whapsapp-example.firebaseapp.com",
  projectId: "whapsapp-example",
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

//agregar documentos
const guardar  = () =>{
  let post = document.getElementById('txtPost').value;
  db.collection("users").add({
      post: post
  })
  .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      document.getElementById('txtPost').value = '';
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
}
//LEER DOCUMENTOS
let tablita = document.getElementById('tablita');
db.collection("users").onSnapshot((querySnapshot) => {
  tablita.innerHTML='';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().post}`);
        tablita.innerHTML += `
        <div class="container mt-5">
            <div>${doc.displayName}</div>
            <div>${doc.data().post}</div>
            <button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button>
            <button class="btn btn-warning"onclick="editar('${doc.id}','${doc.data().post}')">Editar</button>
        </div>`
    });
});
///// BORRAR DOCUMENTOS
function eliminar(id){var r = confirm("Estas seguro de Editar la publicacion");
if (r == true) {
  
  db.collection("users").doc(id).delete().then(function() {
    console.log("Document successfully deleted!");
}).catch(function(error) {
    console.error("Error removing document: ", error);
});
    
} else {
    
}

}

///EDITAR DOCUMENTOS//
function editar(id, post){
  document.getElementById('txtPost').value = post;
  const btn = document.getElementById('boton');
  btn.innerHTML = 'Editar';

  btn.onclick = function(){
    var washingtonRef = db.collection("users").doc(id);

    let post = document.getElementById('txtPost').value;
    
    // TODO colocar alerta de confirmacion de actuaizar datos 
    
      //var txt;
      var r = confirm("Estas seguro de Editar la publicacion");
      if (r == true) {
        
        washingtonRef.update({
          post : post
        })
        .then(()=> {
            console.log("Document successfully updated!");
        })
        .catch((error)=> {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
          
      } else {
          
      }
      btn.innerHTML = "Guardar";
      btn.onclick = guardar;
      document.getElementById('txtPost').value = '';

  }
}
