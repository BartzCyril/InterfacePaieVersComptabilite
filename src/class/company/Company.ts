export abstract class Company {

    protected codeFile: number
    protected fileName: string

    constructor(codeFile: number, fileName: string) {
        this.codeFile = codeFile
        this.fileName = fileName
    }

    getCodeFile(): number {
        return this.codeFile
    }

    getFileName(): string {
        return this.fileName
    }

}