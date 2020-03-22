import IExampleApi from './example-api.interface'
import ExampleApiFilterDto from '../dtos/example-api-filter.dto'
import ExampleApiCreateDto from '../dtos/example-api-create.dto'
import ExampleApiUpdateDto from '../dtos/example-api-update.dto'

export default interface IExampleApiService {
    create(exampleApi: ExampleApiCreateDto): Promise<IExampleApi>
    findOne(id: string): Promise<IExampleApi | undefined>
    findAll(filter: ExampleApiFilterDto): Promise<IExampleApi[]>
    update(exampleApi: ExampleApiUpdateDto, id: string): Promise<IExampleApi>
    delete(id: string): void
}
