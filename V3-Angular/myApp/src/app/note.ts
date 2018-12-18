import { User } from '../app/_models/user';

export class Note {
    constructor(title: string, context: string, image: string) {
        this.title = title;
        this.context = context;
        this.image = image;
    }
    id: number;
    title: string;
    date: Date;
    context: string;
    image: string;
    user: any;
}
