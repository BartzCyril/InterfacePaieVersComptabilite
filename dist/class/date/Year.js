export class Year {
    /**
    * Récupère l'année du fichier
    * @param {string} currentFileLine - La ligne courante du fichier en cours de traitement
    * @returns {(string | null)} - Retourne l'année correspondante en tant que chaîne de caractères ou null si non trouvée
    */
    static getYear(firstFileLine) {
        const match = firstFileLine.match(new RegExp('[0-9]+'));
        return match ? match[0] : null;
    }
}
