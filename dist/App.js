import { Entreprise1 } from "./class/company/Entreprise1.js"
import { Entreprise2 } from "./class/company/Entreprise2.js";
import { Company } from "./class/company/Company.js";
import { Year } from "./class/date/Year.js";
import { Month } from "./class/date/Month.js";
import { Data } from "./class/data/Data.js";
import { writeFile } from "./class/writeFile/WriteFile.js";
const fileInput = document.getElementById('fileInput');
/**
Cette fonction permet de récupérer un objet de type Company en fonction du nom de fichier donné en paramètre. 
Si le nom de fichier correspond à ENTREPRISE1.csv, elle retourne un objet de type Entreprise1. 
Si le nom de fichier correspond à ENTREPRISE2.csv, elle retourne un objet de type Entreprise2. 
Si aucun nom de fichier ne correspond, elle retourne false.
@param {string} fileName - le nom du fichier
**/
function getCompany(fileName) {
    if (/ENTREPRISE1\.csv$/.test(fileName)) {
        return new Entreprise1();
    }
    else if (/ENTREPRISE2\.csv$/.test(fileName)) {
        return new Entreprise2();
    }
    return false;
}
fileInput.addEventListener('change', function () {
    if (fileInput.files) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.readAsText(new Blob([file]));
        reader.onload = () => {
            if (!getCompany(file.name))
                alert("Le fichier n'a pas le bon format");
            else {
                const company = getCompany(file.name);
                const line = reader.result?.toString().split("\n");
                if (line) {
                    if (Year.getYear(line[0]) && Month.getMonth(line[0])) {
                        // Date
                        const year = Year.getYear(line[0]);
                        const informationsMonth = Month.getInformationsMonth(year, line[0]);
                        const data = new Data(line);
                        writeFile.downloadFile(company, year, informationsMonth, data.getData());
                    }
                    else {
                        alert("Le fichier n'a pas le bon format");
                    }
                }
            }
        };
    }
});
