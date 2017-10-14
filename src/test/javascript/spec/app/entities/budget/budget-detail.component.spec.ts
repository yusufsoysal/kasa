/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { KasaTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { BudgetDetailComponent } from '../../../../../../main/webapp/app/entities/budget/budget-detail.component';
import { BudgetService } from '../../../../../../main/webapp/app/entities/budget/budget.service';
import { Budget } from '../../../../../../main/webapp/app/entities/budget/budget.model';

describe('Component Tests', () => {

    describe('Budget Management Detail Component', () => {
        let comp: BudgetDetailComponent;
        let fixture: ComponentFixture<BudgetDetailComponent>;
        let service: BudgetService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KasaTestModule],
                declarations: [BudgetDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    BudgetService,
                    JhiEventManager
                ]
            }).overrideTemplate(BudgetDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BudgetDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BudgetService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Budget(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.budget).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
