import { IsString, IsOptional, IsDecimal, IsInt, IsPositive, MinDate, IsDate, IsEmail, MaxLength } from 'class-validator'
import { Type } from 'class-transformer'

export default class ExampleApiUpdateDto {
    @IsString()
    @MaxLength(150)
    @IsOptional()
    name?: string

    @IsString()
    @MaxLength(100)
    @IsEmail()
    @IsOptional()
    email?: string

    @IsDate()
    @Type(() => Date)
    @MinDate(new Date())
    @IsOptional()
    date?: Date

    @IsInt()
    @IsPositive()
    @IsOptional()
    number?: number

    @IsDecimal()
    @IsOptional()
    value?: number
}
