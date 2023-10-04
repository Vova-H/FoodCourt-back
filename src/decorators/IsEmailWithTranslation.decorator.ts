import {registerDecorator, ValidationArguments, ValidationOptions} from 'class-validator';
import {TranslationService} from '../translation/translation.service';

export function IsEmailWithTranslation(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isEmailWithTranslation',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            async validator(value: any, args: ValidationArguments) {
                const [, , lang] = args.constraints;
                const translationService = args.object['translationService'] as TranslationService;

                const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
                if (!emailPattern.test(value)) {
                    return await translationService.translateText('Wrong email type', lang);
                }
                return true;
            },
        });
    };
}
