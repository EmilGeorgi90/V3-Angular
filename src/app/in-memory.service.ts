import { Injectable } from '@angular/core';
import { Note } from './note';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryService implements InMemoryDbService {
  createDb() {
  const notes = [
    {
      id: 1,
      title: 'Klarede opvasken',
      date: new Date('26-11-2018 16:10'),
      context: 'Kom igennem alle mine 40 tallerkener.',
      image: '../assets/img/happy.svg'
    },
    {
      id: 2,
      title: 'Proppet S-tog',
      date: new Date('25-11-2018 08:12'),
      context: 'Tog toget på arbejde, det var propfyldt og forsinket med 15min.' +
       'En gammel klam person klemte sig ned ved siden af mig, og hostede ud over mig.',
      image: '../assets/img/vomited.svg'
    },
    {
      id: 3,
      title: 'Tur i skoven',
      date: new Date('24-11-2018 15:00'),
      context: 'Jeg gik en tur i harreskoven. Så de flotte forårsnuancer, det gav energi',
      image: '../assets/img/happy-real.svg'
    },
    {
      id: 4,
      title: 'Trænede ben',
      date: new Date('24-11-2018 06:25'),
      context: 'Bliver altid så glad når mine ben har fået en god tur i fitness. Der er også så tomt på denne tid',
      image: '../assets/img/happy.svg'
    },
  ];
    return {notes};
  }
  genId(notes: Note[]): number {
    return notes.length > 0 ? Math.max(...notes.map(note => note.id)) + 1 : 1;
  }
}
