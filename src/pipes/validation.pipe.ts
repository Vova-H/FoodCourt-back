import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { Type } from '@nestjs/common/interfaces/type.interface';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata) {
        const { metatype } = metadata;
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = plainToClass(metatype, value);
        const errors = await validate(object);
        if (errors.length > 0) {
            const errorMessage = this.formatErrors(errors);
            throw new BadRequestException(errorMessage);
        }

        return object;
    }

    private toValidate(metatype: Type<any>): boolean {
        const types: Array<Type<any>> = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }

    private formatErrors(errors: any[]) {
        return errors.map(err => {
            for (const property in err.constraints) {
                if (err.constraints.hasOwnProperty(property)) {
                    return err.constraints[property];
                }
            }
        }).join(', ');
    }
}
