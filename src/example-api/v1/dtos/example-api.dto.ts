import ExampleApi from "../interfaces/example-api.interface"

export default class ExampleApiDto implements ExampleApi {
    public name: string
    public email: string
    public date: Date
    public number: number
    public value: number

    public constructor(data: ExampleApi) {
        this.name = data.name
        this.email = data.email
        this.date = new Date(data.date)
        this.number = data.number
        this.value = data.value
    }
}