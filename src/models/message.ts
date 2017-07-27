export class Message {
  constructor(
    
    public text: string, 
    public timestamp: number = Date.now(),
    public sender: string = "Anonymous"
  ) {}
}
