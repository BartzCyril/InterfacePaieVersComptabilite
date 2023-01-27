export class writeFile {
    /**
    Méthode permettant de générer le corps du fichier
    @param {Company} company - L'objet Company contenant les informations de l'entreprise
    @param {string} year - L'année du fichier
    @param {{numberMonth: string, endOfMonth: string}} informationsMonth - les informations du mois (numéro et jour de fin)
    @param {{account: string[], creditDebit: string[], firstSection: string[], secondSection: string[], codeH: boolean[]}} data - les données à inclure dans le fichier
    @returns {string} - Chaine qui correspond au corps du fichier
    */
    static generateFile(company, year, informationsMonth, data) {
        // Première ligne du document "00"
        let str = "00 " + company.getCodeFile() + "        " + year + " " + informationsMonth.numberMonth + " S\n";
        let k = 0;
        for (let i = 0; i < data.account.length; i++) {
            // Traitement des comptes de charges
            if (data.account[i].startsWith('6') || data.account[i].startsWith('7')) {
                str += this.getLinesStartingWith01And02(i, year, informationsMonth, data);
                while (data.firstSection[k] != "0") {
                    str += "03   " + data.firstSection[k];
                    str = str.padEnd(str.length + 67, " ");
                    str += data.account[i] + "            " + data.secondSection[k] + "\n";
                    k++;
                }
                k++;
            }
            else {
                // Traitement des comptes de bilans
                str += this.getLinesStartingWith01And02(i, year, informationsMonth, data);
            }
        }
        str += "END OF FILE";
        return str;
    }
    /**
     * Cette fonction génère les lignes "01" et "02" pour les comptes de bilans et de charges
    @param {number} index - l'index de l'élément dans le tableau
    @param {string} year - l'année
    @param {{numberMonth: string, endOfMonth: string}} informationsMonth - objet contenant le numéro du mois et la fin du mois
    @param {{account: string[], creditDebit: string[], firstSection: string[], secondSection: string[], codeH: boolean[]}} data - un objet contenant les données nécessaires pour générer le fichier
    @return {string} une chaine de caractères contenant les lignes "01" et "02"
    */
    static getLinesStartingWith01And02(index, year, informationsMonth, data) {
        let str = "";
        let code = "";
        data.codeH[index] ? code = "H" : code = "S";
        str += "01    47200 " + informationsMonth.endOfMonth + informationsMonth.numberMonth + year + " " + year + " " + informationsMonth.numberMonth + " " + informationsMonth.numberMonth + "." + year + " " + informationsMonth.endOfMonth + informationsMonth.numberMonth + year + "              " + "SB " + code + "     " + data.creditDebit[index] + " " + data.creditDebit[index] + " SAL. " + informationsMonth.numberMonth + " " + year + "\n";
        str += "02    " + data.account[index] + " FR     " + data.creditDebit[index];
        str = str.padEnd(str.length + 28, " ");
        str += data.creditDebit[index];
        str = str.padEnd(str.length + 28, " ");
        str += "SAL. " + informationsMonth.numberMonth + " " + year + "\n";
        return str;
    }
    /**
    Cette fonction permet de télécharger le fichier généré en utilisant les données fournies en entrée.
    @param {Company} company - L'objet Company qui contient les informations de la société.
    @param {string} year - L'année pour laquelle le fichier doit être généré.
    @param {{ numberMonth: string, endOfMonth: string}} informationsMonth - Un objet contenant le numéro du mois et la date de fin du mois.
    @param {{account: string[], creditDebit: string[], firstSection: string[], secondSection: string[], codeH: boolean[]}} data - Les données nécessaires pour générer le fichier.
    */
    static downloadFile(company, year, informationsMonth, data) {
        const blob = new Blob([this.generateFile(company, year, informationsMonth, data)], { type: "text/plain" });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = company.getFileName();
        link.click();
    }
}
