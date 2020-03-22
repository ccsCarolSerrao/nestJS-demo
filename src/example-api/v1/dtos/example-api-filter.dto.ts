import ExampleApiFilter from "../interfaces/example-api-filter.interface"

export default class ExampleApiFilterDto implements ExampleApiFilter {
    public id?: string
    public name?: string
    public email?: string

    public constructor(data?: ExampleApiFilter) {
        this.id = data?.id
        this.name = data?.name
        this.email = data?.email
    }
}