export class Data {
    constructor(lineFile) {
        this.regexAccount = new RegExp('[4-7][0-9][0-9][0-9][0-9]');
        this.regexCodeH = new RegExp(';;;[0-9][0-9 ]*,[0-9]*;;');
        this.regexCreditDebit = new RegExp('(;;;;[0-9][0-9 ]*,[0-9]*;)|(;;;;[0-9 ]+;)|(;;;[0-9][0-9 ]*,[0-9]*;;)');
        this.regexSection = new RegExp(';[0-9]*;((-?[0-9 ]+,[0-9]+)|([0-9]*));-?[0-9 ]*,[0-9]*;;;');
        this.lineFile = lineFile;
    }
    /**
    Cette fonction parcours chaque ligne du fichier et utilise des expressions régulières pour extraire toutes les données.
    @returns {object} - Un objet contenant les tableaux d'informations extraites.
    */
    getData() {
        let account = [];
        let creditDebit = [];
        let firstSection = [];
        let secondSection = [];
        let codeH = [];
        let isMatchRegexSection = false;
        this.lineFile.forEach(element => {
            const matchAccount = element.match(this.regexAccount);
            const matchCreditDebit = element.match(this.regexCreditDebit);
            const matchRegexSection = element.match(this.regexSection);
            const matchCodeH = element.match(this.regexCodeH);
            if (matchAccount) {
                account.push(matchAccount[0]);
                matchCreditDebit ? creditDebit.push(this.transform(matchCreditDebit[0])) : null;
                matchCodeH ? codeH.push(true) : codeH.push(false);
            }
            else {
                if (matchRegexSection) {
                    this.getDataFirstSection(matchRegexSection[0]) ? firstSection.push(this.getDataFirstSection(matchRegexSection[0])) : null;
                    this.getDataSecondSection(matchRegexSection[0]) ? secondSection.push(this.getDataSecondSection(matchRegexSection[0])) : null;
                    isMatchRegexSection = true;
                }
                else {
                    if (isMatchRegexSection) {
                        firstSection.push("0");
                        secondSection.push("0");
                        isMatchRegexSection = false;
                    }
                }
            }
        });
        return { account: account, creditDebit: creditDebit, firstSection: firstSection, secondSection: secondSection, codeH: codeH };
    }
    /**
    Cette fonction prend en entrée une chaîne de caractères et remplace tous les ";" , "," et " " par des "", puis ajoute des zéros à gauche jusqu'à ce qu'elle ait une longueur de 10 caractères.
    @param {string} data - La chaîne de caractères à transformer
    @returns {string} - La chaîne de caractères transformée
    */
    transform(data) {
        return data.replace(/[;, ]/g, "").padStart(10, '0');
    }
    /**
    Cette fonction prend en entrée une chaîne de caractères et utilise une expression régulière pour rechercher une sous-chaîne correspondant à une suite de chiffres.
    Si cette sous-chaîne est trouvée, elle est retournée.
    Si aucune sous-chaîne correspondante n'est trouvée, la fonction retourne null.
    @param {string} str - La chaîne de caractères à traiter
    @returns {(string|null)} - La sous-chaîne de chiffres trouvée ou null si aucune sous-chaîne correspondante n'a été trouvée
    */
    getDataFirstSection(str) {
        const matchFirstSection = str.match("[0-9]+");
        if (matchFirstSection)
            return matchFirstSection[0];
        return null;
    }
    /**
    Cette fonction prend en entrée une chaîne de caractères et utilise une expression régulière pour rechercher une sous-chaîne correspondant à un nombre décimal précédé de ";" et suivi de ";;;".
    Si cette sous-chaîne est trouvée, elle est traitée en enlevant les espaces et les virgules, et en ajoutant des zéros à gauche jusqu'à ce qu'elle ait 11 caractères.
    Si le nombre est négatif, un "-" est ajouté en début de chaîne.
    Si aucune sous-chaîne correspondante n'est trouvée, la fonction retourne null.
    @param {string} str - La chaîne de caractères à traiter
    @returns {(string|null)} - La chaîne de caractères traitée ou null si aucune sous-chaîne correspondante n'a été trouvée
    */
    getDataSecondSection(str) {
        const matchSecondSection = str.match(';(-?[0-9 ]+(?:[.,][0-9]{2})?)(?:;;;)');
        if (matchSecondSection)
            if (matchSecondSection[1].startsWith("-")) {
                return matchSecondSection[1].replace(/[-, ]/g, "").padStart(11, '0').padStart(12, '-');
            }
            else
                return matchSecondSection[1].replace(/[, ]/g, "").padStart(11, '0');
        return null;
    }
}
