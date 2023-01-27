export class Month {

    /**
    Cette fonction prend en entrée une chaîne de caractères et utilise une expression régulière pour rechercher une sous-chaîne correspondant au nom d'un mois dans la ligne.
    Si cette sous-chaîne est trouvée, elle est retournée en enlevant l'espace de début.
    Si aucune sous-chaîne correspondante n'est trouvée, la fonction retourne null.
    @param {string} firstFileLine - La chaîne de caractères à traiter
    @returns {(string|null)} - Le nom du mois trouvé ou null si aucune sous-chaîne correspondante n'a été trouvée
    */
    static getMonth(firstFileLine: string): string | null {
        const match = firstFileLine.match(new RegExp(' [A-Z][a-zé]+'));
        return match ? match[0].replace(" ", "") : null;
    }

    /**
    Cette fonction prend en entrée une chaîne de caractères et une année, utilise la fonction getMonth pour rechercher le nom d'un mois dans la ligne et renvoi le numéro du mois correspondant ainsi que la fin de mois en fonction de l'année donnée.
    Si le mois est trouvé, cette fonction utilise un switch pour déterminer le numéro du mois et la fin de mois correspondant.
    Si aucun mois correspondant n'est trouvé, la fonction retourne null.
    @param {string} year - L'année donnée
    @param {string} firstFileLine - La chaîne de caractères à traiter
    @returns {{numberMonth: string, endOfMonth: string} | null} - Un objet contenant le numéro du mois et la fin de mois correspondant ou null si aucun mois correspondant n'a été trouvé
    */
    static getInformationsMonth(year: string, firstFileLine: string): {numberMonth: string, endOfMonth: string} | null {
        if (Month.getMonth(firstFileLine)) {
            const month: string = Month.getMonth(firstFileLine) as string
            let informationsMonth: {numberMonth: string, endOfMonth: string}
            switch (month) {
                case "Janvier":
                    informationsMonth = {numberMonth: "01", endOfMonth: "30"}
                    break
                case "Février":
                    const transformYear: number = parseInt(year)
                    if (transformYear % 4 === 0 && transformYear % 100 != 0 || transformYear % 400 === 0) {
                        informationsMonth = {numberMonth: "02", endOfMonth: "29"}
                    } else {
                        informationsMonth = {numberMonth: "02", endOfMonth: "28"}
                    }
                    break
                case "Mars":
                    informationsMonth = {numberMonth: "03", endOfMonth: "31"}
                    break
                case "Avril":
                    informationsMonth = {numberMonth: "04", endOfMonth: "30"}
                    break
                case "Mai":
                    informationsMonth = {numberMonth: "05", endOfMonth: "31"}
                    break
                case "Juin":
                    informationsMonth = {numberMonth: "06", endOfMonth: "30"}
                    break
                case "Juillet":
                    informationsMonth = {numberMonth: "07", endOfMonth: "31"}
                    break
                case "Août":
                    informationsMonth = {numberMonth: "08", endOfMonth: "31"}
                    break
                case "Septembre":
                    informationsMonth = {numberMonth: "09", endOfMonth: "30"}
                    break
                case "Octobre":
                    informationsMonth = {numberMonth: "10", endOfMonth: "31"}
                    break
                case "Novembre":
                    informationsMonth = {numberMonth: "11", endOfMonth: "30"}
                    break
                case "Décembre":
                    informationsMonth = {numberMonth: "12", endOfMonth: "31"}
                    break
                default:
                    return null
            }
            return informationsMonth
        }
        return null
    }
}