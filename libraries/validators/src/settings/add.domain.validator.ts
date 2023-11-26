import {IsString, Matches} from 'class-validator';

export class AddDomainValidator {
    @Matches(/^(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/, {
        message: 'Invalid domain format'
    })
    @IsString()
    domain: string;
}
