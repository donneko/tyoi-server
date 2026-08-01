export class MessageManager{

    private language:string = "";
    private defaultLanguage:string

    constructor(defaultLanguage:string){
        this.defaultLanguage = defaultLanguage;
    }

    setLanguage(language:string){
        this.language = language;
    }

    message(){
        
    }
}