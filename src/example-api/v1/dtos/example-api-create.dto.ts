import { IsString, IsInt, IsDate, IsDecimal, IsNotEmpty, IsPositive, MaxLength, IsEmail, MinDate } from 'class-validator'
import { Type } from 'class-transformer'

export default class ExampleApiCreateDto {
    @IsString()
    @MaxLength(150)
    @IsNotEmpty()
    name!: string

    @IsString()
    @MaxLength(100)
    @IsEmail()
    @IsNotEmpty()
    email!: string

    @IsDate()
    @Type(() => Date)
    @MinDate(new Date())
    @IsNotEmpty()
    date!: Date

    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    number!: number

    @IsDecimal()
    @IsNotEmpty()
    value!: number
}
