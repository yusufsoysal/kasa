/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { KasaTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ExpenseDetailComponent } from '../../../../../../main/webapp/app/entities/expense/expense-detail.component';
import { ExpenseService } from '../../../../../../main/webapp/app/entities/expense/expense.service';
import { Expense } from '../../../../../../main/webapp/app/entities/expense/expense.model';

describe('Component Tests', () => {

    describe('Expense Management Detail Component', () => {
        let comp: ExpenseDetailComponent;
        let fixture: ComponentFixture<ExpenseDetailComponent>;
        let service: ExpenseService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KasaTestModule],
                declarations: [ExpenseDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ExpenseService,
                    JhiEventManager
                ]
            }).overrideTemplate(ExpenseDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ExpenseDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExpenseService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Expense(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.expense).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
