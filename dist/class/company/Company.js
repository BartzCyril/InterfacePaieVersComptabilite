export class Company {
    constructor(codeFile, fileName) {
        this.codeFile = codeFile;
        this.fileName = fileName;
    }
    getCodeFile() {
        return this.codeFile;
    }
    getFileName() {
        return this.fileName;
    }
}
