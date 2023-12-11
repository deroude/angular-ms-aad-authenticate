import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from './auth.config';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [RouterModule, CommonModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'aad-poc';
  token?: string;

  constructor(private oauthService: OAuthService) { }


  ngOnInit(): void {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => this.token = this.oauthService.getAccessToken());
  }

  signIn() {
    this.oauthService.initCodeFlow();
  }

  signOut() {
    this.oauthService.logOut();
  }

}
