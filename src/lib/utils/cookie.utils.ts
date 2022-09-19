import { serialize } from 'cookie';
import { TimeHelper } from './time.helper';

export class CookieUtils {

    static setCookieHeader = (name: string, value: string, ageInHours: number) => {
        const date = TimeHelper.addHours(ageInHours);
        return serialize(name, value, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            //maxAge: 60 * 60 * 24 * 7, // one week
            expires: date
        });
    }

    static removeCookieHeader = (name: string) => {
        return serialize(name, '', {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            //maxAge: 60 * 60 * 24 * 7, // one week
            expires: new Date('Thu, 01 Jan 1970 00:00:00 GMT')
        });
    }

}
