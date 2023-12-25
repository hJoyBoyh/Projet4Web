//const { listIndexes } = require("../model/contact.js");

document.addEventListener("DOMContentLoaded", function () {

    // les url
    let url = document.URL;
    let urlAjout = document.URL + "ajouter";
    let urlRecherche = document.URL + "recherche";
    let urlDelete = document.URL + "delete/";
    let urlUpdate = document.URL+"update/"
    

    // les div a recupere de la page html
    let divAjouterContactForm = document.getElementById("ajouterContactForm")
    let ajouterContact = document.getElementById("ajouterContact")
    let divContent = document.getElementById("content")
    let cardSingleContact = document.getElementById("card-single-contact")
    let divRechercherResult =document.getElementById("resultRecherche")
    let contactRecherche = document.getElementById("contactRecherche")



    
        //  fetch accueil
        url+="all-contact"
        console.log(url)
        fetch(url)
        .then(response =>{
         return response.json()
        })
        .then(data =>{
            data.forEach(element => {
                // Contact
                const prenom= element.prenom
                const nom= element.nom
                const entreprise = element.entreprise
                const telephone= element.telephone
                 const mobile= element.mobile
                const email= element.email
                const adresse = element.adresse
                

     
                // recupere le div content
                let content = document.getElementById("content")
     
                //cree card-contact
                let cardContact = document.createElement("div")
                cardContact.className = "card-contact"
     
                //prenom
                let prenomH2 = document.createElement("h2")
                prenomH2.innerHTML = prenom;
     
                //entreprise
                let entrepriseH3 = document.createElement("h3")
                entrepriseH3.innerHTML = entreprise;
     
                 cardContact.append(prenomH2)
                 cardContact.append(entrepriseH3)
                
                 // single contact view
                 cardContact.addEventListener("click",()=>{
                    content.classList.remove("show")
                    content.classList.add("hidden")

                    
                    cardSingleContact.classList.remove("hidden")
                    cardSingleContact.classList.add("show")
                   
                   
                    // nom
                    let nomH2 = document.createElement("h2")
                    nomH2.innerHTML = nom;
                    //telephone
                    let telephoneP = document.createElement("p")
                    telephoneP.innerHTML = telephone;
                     //EMAIL
                     let emailP = document.createElement("p")
                     emailP.innerHTML = email;
                      //adresse
                      let adresseP = document.createElement("p")
                      adresseP.innerHTML = adresse;
                      //exit
                      let exitButton = document.createElement("button")
                      exitButton.innerHTML = "X";
                      //delete
                      let deleteButton = document.createElement("button")
                     deleteButton.innerHTML = "delete";
                     //update
                     let updateButton = document.createElement("button")
                    updateButton.innerHTML = "update";

                     //event exit
                      exitButton.addEventListener("click",()=>{
                        // permet de montrer ou de ne pas montrer certain element html
                        cardSingleContact.classList.remove("show")
                        
                        cardSingleContact.classList.add("hidden")
                        content.classList.remove("hidden")
                        content.classList.add("show")

                        // ajout dans les cardContact
                        cardContact.append(prenomH2)
                        cardContact.append(entrepriseH3)

                        //remove child in cardsinglecontact
                        while (cardSingleContact.lastElementChild) {
                            cardSingleContact.removeChild(cardSingleContact.lastElementChild);
                          }
                      })


                      // event delete
                      deleteButton.addEventListener("click",()=>{
                        // car c est par telephone
                        fetch(urlDelete+=telephoneP.innerHTML ,
                        { method: 'DELETE'})
                    .then(res => res.text()) 
                    .then(res => {
                        console.log(res)
                        //retourner a la page ou est ce que le contact a ete supprimer
                        this.location.reload()
                        
                    }) 
                      })


                      // event update 
                      updateButton.addEventListener("click",()=>{
                        let showUpdateForm = document.getElementById("contactUpdate")
                        showUpdateForm.classList.add("show")

                        let retour = document.getElementById("retourDeUpdate")
                        retour.addEventListener("click",()=>{
                           this.location.reload()
                        })

                        let confirmerUpdate = document.getElementById("confirmerUpdate")
                        confirmerUpdate.addEventListener("click",()=>{
                            let nomForm = document.getElementById("NomUpdate")
                            let prenomForm= document.getElementById("PrenomUpdate")
                            let entrepriseForm = document.getElementById("EntrepriseUpdate")
                            let telephoneForm = document.getElementById("TelephoneUpdate")
                            let emailForm = document.getElementById("EmailUpdate")
                            let adresseForm =document.getElementById("AdresseUpdate")



                            let contactS = "contact/"+ list._id
                            fetch(contacgssa
                                )
                          

                            let chainUrlUpdate = `${nomForm.value}/${prenomForm.value}/${entrepriseForm.value}/
                            ${telephoneForm.value}/${telephoneP.innerHTML}/${emailForm.value}/${adresseForm.value}`

                            fetch(urlUpdate+=chainUrlUpdate, { method: 'PATCH' }).then(res => res.text()) 
                        .then(res => {
                            console.log(res)
                            //retourner a la page ou est ce que le contact a ete supprimer
                            this.location.reload()
                        })
                        })




                      })


                      cardSingleContact.append(prenomH2);
                      cardSingleContact.append(nomH2);
                      cardSingleContact.append(telephoneP);
                      cardSingleContact.append(entrepriseH3)
                      cardSingleContact.append(emailP);
                      cardSingleContact.append(adresseP);
                      cardSingleContact.append(exitButton)
                      cardSingleContact.append(deleteButton)
                      cardSingleContact.append(updateButton)


                      




                 })
                content.append(cardContact)
                console.log(prenom)
                
            });
          
        }).catch(error =>{
            console.log(error)
        })

        // formulaire ajout
        fetch(urlAjout).then(response =>{
            return response.text()
        })
        .then(data =>{
             divAjouterContactForm = document.getElementById("ajouterContactForm")
            divAjouterContactForm.innerHTML = data

            let retour = document.getElementById("retourDeAjout")
            retour.addEventListener("click",()=>{
               
              
               this.location.reload()
            })
            
        
        })

        // ajout
        
        ajouterContact.addEventListener("click",()=>{
            divAjouterContactForm.classList.remove("hidden")
            divAjouterContactForm.classList.add("show")

            divContent.classList.add("hidden")
            divContent.classList.remove("show")
            

        })


        // rechercher
        contactRecherche.addEventListener("keyup",(e)=>{
            let match = e.target.value.match(/^[a-zA-Z ]*/)
            let match2 = e.target.value.match(/\s*/)
            if(match2[0]=== e.target.value){
                divRechercherResult.innerHTML ='';
                return;
            }
            if(match[0]=== e.target.value){
                fetch(urlRecherche,{
                    method: "POST",
                    headers :{'Content-Type':'application/json'},
                    body : JSON.stringify({payload: e.target.value})
                    
                }).then(res =>  res.json()).then(data =>{
                    
                    let payload = data.payload
                    console.log(payload)
                    divRechercherResult.innerHTML =''
                    if(payload.length < 1){
                        divRechercherResult.innerHTML ="<p>Aucun resultat</p>"
                    }
                    payload.forEach((item,index)=>{
                        if(index>0)divRechercherResult.innerHTML +='<hr>';
                            
                    divRechercherResult.innerHTML +=`<p>${item.prenom}</p>`
                        
                    })
                    
                })
                
            }

           //divRechercherResult.innerHTML =''
       
        })
         
     

     
        
        //result recherche
         

        
      
    
})