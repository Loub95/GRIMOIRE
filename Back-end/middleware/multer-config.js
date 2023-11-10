const multer = require('multer'); // Importation du module multer pour la gestion des fichiers multipart
const sharp = require("sharp");
const fs = require("fs");




const MIME_TYPES = { // Fonction de vérification du fichier qui n'accepte que les types jpeg, jpg, png 
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  }, // la fonction destination indique à multer d'enregistrer les fichiers dans le dossier images ;
  filename: (req, file, callback) => { // la fonction filename indique à multer d'utiliser le nom d'origine, de remplacer les espaces par des underscores et d'ajouter un timestamp
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    fs.access("./images", (error) => {
    if (error) {
      fs.mkdirSync("./images");
    }
  });
    callback(null, name + Date.now() + '.' + extension); // DATE NOW NOM DU FICHIER
  }

});

const upload = multer({ storage }).single('image')
  const resizeimg = (req, res, next) => {
    if( !req.file)
     { return next()};
    const filePath = req.file.path 
    sharp(filePath)
    .resize({ width: 160, height: 260 })
    .toBuffer()
    .then((data) => {
        sharp(data)
            .toFile(filePath)
            .then(() => {
                next()
            })
            .catch((error) => {
                next(error)
            })
    }) 
  }
    
  
  
  
  //const link = `http://localhost:4000/${ref}`;
  //return res.json({ link });

module.exports = {upload, resizeimg}; 
// Exportation du middleware multer configuré pour traiter un seul fichier avec le champ "image"
