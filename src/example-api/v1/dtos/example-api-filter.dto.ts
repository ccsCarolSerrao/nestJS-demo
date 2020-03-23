import { IsString, IsOptional, IsUUID, MaxLength, IsEmail } from 'class-validator'

export default class ExampleApiFilterDto {
    @IsString()
    @IsUUID()
    @IsOptional()
    id?: string

    @IsString()
    @MaxLength(150)
    @IsOptional()
    name?: string

    @IsString()
    @MaxLength(100)
    @IsEmail()
    @IsOptional()
    email?: string
}
