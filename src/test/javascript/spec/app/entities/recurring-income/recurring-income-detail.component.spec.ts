/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { KasaTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { RecurringIncomeDetailComponent } from '../../../../../../main/webapp/app/entities/recurring-income/recurring-income-detail.component';
import { RecurringIncomeService } from '../../../../../../main/webapp/app/entities/recurring-income/recurring-income.service';
import { RecurringIncome } from '../../../../../../main/webapp/app/entities/recurring-income/recurring-income.model';

describe('Component Tests', () => {

    describe('RecurringIncome Management Detail Component', () => {
        let comp: RecurringIncomeDetailComponent;
        let fixture: ComponentFixture<RecurringIncomeDetailComponent>;
        let service: RecurringIncomeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KasaTestModule],
                declarations: [RecurringIncomeDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    RecurringIncomeService,
                    JhiEventManager
                ]
            }).overrideTemplate(RecurringIncomeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RecurringIncomeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RecurringIncomeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new RecurringIncome(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.recurringIncome).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
