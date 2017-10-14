/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { KasaTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { IncomeDetailComponent } from '../../../../../../main/webapp/app/entities/income/income-detail.component';
import { IncomeService } from '../../../../../../main/webapp/app/entities/income/income.service';
import { Income } from '../../../../../../main/webapp/app/entities/income/income.model';

describe('Component Tests', () => {

    describe('Income Management Detail Component', () => {
        let comp: IncomeDetailComponent;
        let fixture: ComponentFixture<IncomeDetailComponent>;
        let service: IncomeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KasaTestModule],
                declarations: [IncomeDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    IncomeService,
                    JhiEventManager
                ]
            }).overrideTemplate(IncomeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IncomeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IncomeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Income(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.income).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
