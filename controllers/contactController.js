const Contact = require("../model/contact")

const path = require("path")

// send la page index
const contactIndex = (req,res) =>{
    //  res.send("hello world")
       console.log(req.url)
       console.log(req.body)
       
       const indexPath = path.join(__dirname,"../html/index.html")
       if(req.url =="/"){
           res.sendFile(indexPath)
       }
   
   };
   //send le form ajout html
   const contactAjouterHtml = (req,res)=>{
   const ajouterPath = path.join(__dirname,"../html/ajouter.html")
    res.sendFile(ajouterPath)
    
   }
   
   // function permet chercher un contact avec son prenom
    const  contactRecherche =  async (req,res)=>{

        let payload = req.body.payload.trim()
        

         let recherche = await Contact.find({prenom: {$regex: payload,$options:'i'}}).exec();

         recherche = recherche.slice(0,10)
         res.send({payload:recherche})

       

    }

    // delete un contact grace a son telephone
    const contactDelete = (req,res)=>{
        let contactTel = req.params.telephone
        Contact.deleteOne({telephone:contactTel}).then(result =>{
            res.status(200).json(result)
            console.log(result)
            console.log("delete effectuer")
           
        }).catch(err =>{
            res.status(500).json({error:"Document ne peut pas etre supprimer"})
        })
    }

 
    // permet de ajouter un nouveau contact
   const contactAddAdd = (req,res)=>{
    const data = req.body;
    
    const contact = new Contact({
        nom:data.Nom,
        prenom:data.Prenom,
        entreprise:data.Entreprise,
        telephone:data.Telephone,
        mobile:"",
        email:data.Email,
        adresse:data.Adresse

    })
    

   contact.save()
   .then(result=>{
    res.redirect("/")
    console.log(result)
   }).catch(error =>{
    console.log("error")
   })
    

}

// update un contact 
   const contactUpdate = async (req,res)=>{
   

    Contact.updateOne({telephone: req.params.telephoneRef },{$set:{
        nom:req.params.nom,
        prenom:req.params.prenom,
        entreprise:req.params.entreprise,
        telephone:req.params.telephone,
        mobile:"",
        email:req.params.email,
        adresse:req.params.adresse
    }}).then(result =>{
        res.status(200).json(result)
        console.log(result)
        console.log("update effectuer")
    }).catch(err =>{
        res.status(500).json({error:"Document ne peut pas etre supprimer"})
    })


   }
   // ajouter un contact test
const contactAddContact = (req,res)=>{
    const contact2 = new Contact({
    nom:"jimmy",
    prenom:"Rigaud",
    entreprise:"",
    telephone:"4385145414",
    mobile:"",
    email:"kyustudiosgame@gmail.com",
    adresse:"1999 rue Barre"
    })

    contact2.save()
    .then((result)=>{
        res.send(result)
    }).catch((err)=>{
        console.log("error mgd")
    })

}

// send tous les contact de la bd
 const contactAllContact = (req,res)=>{
    Contact.find()
    .then(result =>{
        res.send(result)
        
    })
    .catch(error=>{
        console.log("error")
    })
}

// retourner un seul client test
const contactSingleContact = (req,res)=>{
    Contact.findOne({telephone:"5145415145"}).
    then(result =>{
        res.send(result)
        
    }).catch(error=>{
        console.log(error)
    })
}



   module.exports = {
    contactIndex,
    contactAddContact,
    contactAllContact,contactSingleContact,contactAjouterHtml,contactAddAdd,contactRecherche,contactDelete,contactUpdate}