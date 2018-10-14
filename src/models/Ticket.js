export default class Ticket{
    constructor(id, customer, company, subject, description, status, assigned){
        this._id = id,
        this.customer = customer
        this.company = company
        this.subject = subject
        this.description = description
        this.status = status
        this.assigned = assigned
    }
}