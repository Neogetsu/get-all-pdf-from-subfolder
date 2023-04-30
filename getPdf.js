const fs = require('fs');
const path = require('path');
const figlet = require('figlet')

// Tableau des noms de dossiers à ignorer
const dossiersAignorer = ['node_modules'];
let pdfCount = 0


//My BRAND
figlet('Dev by Neo\'s', function(err, data) {
  if (err) {
    console.log('Error: ', err);
    return;
  }
  console.log(data);
});
console.info('Script is running.. Please wait..')


// Fonction récursive pour parcourir tous les sous-dossiers
function parcourirDossiers(dossier) {
  fs.readdirSync(dossier).forEach(element => {
    const elementPath = path.join(dossier, element);
    if (fs.lstatSync(elementPath).isDirectory()) {
      if (!dossiersAignorer.includes(element)) {
        parcourirDossiers(elementPath); // Appel récursif pour les sous-dossiers
      }
    } else {
      const fileExt = path.extname(element);
      if (fileExt === '.pdf') {
        const newFileName = element.replace('_papier', ''); // Nouveau nom de fichier sans le suffixe "_papier"
        const newFilePath = path.join(newDirPath,newFileName);
        fs.copyFileSync(elementPath, newFilePath);
        pdfCount++
      }
    }
  });
}


const parentDir = path.resolve(__dirname, 'getAll');

// Créez un nouveau dossier PDF-PACK"
const newDirPath = path.join(__dirname, 'PDF-PACK');
if(!fs.existsSync(newDirPath)) {
  fs.mkdirSync(newDirPath);
}
setTimeout(() => {
  if(newDirPath){
    parcourirDossiers(parentDir);
    console.info(`Copie terminer -> 🆗 \nNombre d'element copier: ${pdfCount} \nLocation: ${newDirPath}`)
  }
}, 5000)


// Parcourez chaque dossier dans "MODULE" et copiez les fichiers PDF dans le nouveau dossier

