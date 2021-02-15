export class ApiException extends Error {
    type: string;
    constructor(type: string, message: string = '') {
        super(message);
        this.type = type;

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, ApiException.prototype);
    }
}
