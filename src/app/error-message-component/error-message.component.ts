import { Component, OnInit } from '@angular/core';
import {MessageService} from '../message.service'
@Component({
  selector: 'app-error-message-component',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnInit {
  constructor(public messageService: MessageService) {}

  ngOnInit() {
  }

}
