class HttpException extends Error {
    name = 'HttpException'
    message = 'Internal Server Error.'
    code = 500

    constructor(code: number, message: string) {
        super()
        /**
         * what is this abomination? 
         * @see https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
         */
        Object.setPrototypeOf(this, HttpException.prototype)

        this.code = code
        this.message = message
    }
}

export default HttpException
