export class Token {
	public access_token:string;
    public token_type:string;
    public expires_in:string;
    public scope:string;

    constructor(a,t,e,s){
        this.access_token=a;
        this.token_type=t;
    	this.expires_in=e;
    	this.scope=s;
    }
}
