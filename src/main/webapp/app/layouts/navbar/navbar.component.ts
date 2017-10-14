import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {JhiLanguageService, JhiEventManager} from 'ng-jhipster';

import {ProfileService} from '../profiles/profile.service';
import {LoginService} from '../../account/login/login.service';
import {JhiLanguageHelper, Principal, Account} from '../../shared';

import {VERSION} from '../../app.constants';

import 'metismenu'
import 'jquery-slimscroll'

@Component({
    selector: 'jhi-navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

    inProduction: boolean;
    isNavbarCollapsed: boolean;
    languages: any[];
    swaggerEnabled: boolean;
    modalRef: NgbModalRef;
    version: string;

    metisMenu: JQuery;
    leftMenuDiv: JQuery;

    account: Account;

    constructor(private languageService: JhiLanguageService,
                private languageHelper: JhiLanguageHelper,
                private principal: Principal,
                private profileService: ProfileService,
                private loginService: LoginService,
                private router: Router,
                private eventManager: JhiEventManager) {
        this.version = VERSION ? 'v' + VERSION : '';
        this.isNavbarCollapsed = true;
    }

    ngOnInit() {
        this.languageHelper.getAll().then((languages) => {
            this.languages = languages;
        });

        this.profileService.getProfileInfo().subscribe((profileInfo) => {
            this.inProduction = profileInfo.inProduction;
            this.swaggerEnabled = profileInfo.swaggerEnabled;
        });

        this.principal.identity().then((account) => {
            this.account = account;
        });

        this.registerAuthenticationSuccess();
        this.setupMenu();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        const innerWidth = event.target.innerWidth;

        if (innerWidth < 1170) {
            this.hideSideMenu();
        } else {
            this.showSideMenu();
        }
    }

    setupMenu() {
        this.metisMenu = $('#side-menu');
        this.metisMenu.metisMenu();

        $('.navbar-toggle').on('click', function() {
            if ($('body').hasClass('content-wrapper')) {
                this.showSideMenu();
            } else {
                this.hideSideMenu();
            }

        }.bind(this));

        this.leftMenuDiv = $('.slimscrollsidebar');
        this.leftMenuDiv.slimScroll({
            height: '100%',
            position: 'right',
            size: '5px',
            color: '#dcdcdc'
        });
    }

    showSideMenu() {
        const $body = $('body');

        $body.trigger('resize');
        $('.sidebar-nav, .slimScrollDiv').css('overflow', 'hidden').parent().css('overflow', 'visible');
        $body.removeClass('content-wrapper');
        $('.logo span').show();

        $('.navbar-toggle i').removeClass('fa-bars');
        $('.navbar-toggle i').addClass('fa-arrow-circle-o-left');
    }

    hideSideMenu() {
        const $body = $('body');

        $body.trigger('resize');
        $('.sidebar-nav, .slimScrollDiv').css('overflow-x', 'visible').parent().css('overflow', 'visible');
        $body.addClass('content-wrapper');
        $('.logo span').hide();
        $('.navbar-toggle i').addClass('fa-bars');
        $('.navbar-toggle i').removeClass('fa-arrow-circle-o-left');
    }

    changeLanguage(languageKey: string) {
        this.languageService.changeLanguage(languageKey);
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    logout() {
        this.loginService.logout();
        this.router.navigate(['']);
    }

    getImageUrl() {
        return this.isAuthenticated() ? this.principal.getImageUrl() : null;
    }
}
