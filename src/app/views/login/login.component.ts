import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { LoginService } from 'src/app/services/login.service';
import { Login } from '../../models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

   loginMd: Login = {
      email: "",
      password: ""
    }

  constructor(private modalService: NgbModal,
              private loginService: LoginService) { }

  open(content : any) {
    console.log("passei")
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  ngOnInit(): void {
  }

  mensagem = "";

  acessa() {
    this.loginService.acessar(this.loginMd)
    .subscribe( (response) => {
      this.mensagem = "Olá, " + this.loginMd.email
    }, (error)=> {
      this.mensagem = error.error;
    } )
    this.modalService.dismissAll()
  }

}