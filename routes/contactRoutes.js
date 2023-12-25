const express = require("express")

const router = express.Router();

const contactController = require("../controllers/contactController")

// index
router.get("/",contactController.contactIndex);
// add contact obselete
router.get("/add-contact",contactController.contactAddContact);
// send le fichier html ajouter
router.get("/ajouter",contactController.contactAjouterHtml)





//retrive
//tout les contact
router.get("/all-contact" ,contactController.contactAllContact)

//trouver un contact test
router.get("/single-contact",contactController.contactSingleContact)

//  ajouter un contact
router.post("/api/contact",contactController.contactAddAdd)

// chercher un contact
router.post("/recherche",contactController.contactRecherche)
//delete un contact a partir de son num
    router.delete("/delete/:telephone",contactController.contactDelete)
//modifier un contact
router.patch("/update/:nom/:prenom/:entreprise/:telephone/:telephoneRef/:email/:adresse",contactController.contactUpdate)


module.exports = router;