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

  open(content: any) {
    console.log("passei")
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
  }

  ngOnInit(): void {
  }

  mensagem = "";

  listaProibida: string[] = [
    "table",
    "select",
    "order",
    "from",
    "drop",
    "or",
    "insert",
    "by",
    ";"
  ]

  usuarioBloqueado: Boolean = false;

  acessa() {

    this.usuarioBloqueado = false;
    this.listaProibida.forEach(palavra => {
      if (this.loginMd.email.toLowerCase().includes(palavra)) {
        this.mensagem = "Dados inválidos";
        this.usuarioBloqueado = true;
        console.log("passei1");
        return;
      }
    })

    if (!this.usuarioBloqueado) {
      this.loginService.acessar(this.loginMd)
        .subscribe((response) => {
          this.mensagem = "Olá, " + this.loginMd.email
        }, (error) => {
          this.mensagem = error.error;
        })
      this.modalService.dismissAll()
    }
  }

}