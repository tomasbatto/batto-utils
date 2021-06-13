
export default interface IError {
    toJSON(): Record<string, any>
    toString(): string
}

export class NullError implements IError {
    toJSON(): Record<string, any> {
        return {}
    }
    toString(): string {
        return ''
    }
}