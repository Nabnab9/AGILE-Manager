import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Sprint e2e test', () => {

    let navBarPage: NavBarPage;
    let sprintDialogPage: SprintDialogPage;
    let sprintComponentsPage: SprintComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Sprints', () => {
        navBarPage.goToEntity('sprint');
        sprintComponentsPage = new SprintComponentsPage();
        expect(sprintComponentsPage.getTitle())
            .toMatch(/agileManagerApp.sprint.home.title/);

    });

    it('should load create Sprint dialog', () => {
        sprintComponentsPage.clickOnCreateButton();
        sprintDialogPage = new SprintDialogPage();
        expect(sprintDialogPage.getModalTitle())
            .toMatch(/agileManagerApp.sprint.home.createOrEditLabel/);
        sprintDialogPage.close();
    });

    it('should create and save Sprints', () => {
        sprintComponentsPage.clickOnCreateButton();
        sprintDialogPage.setStartDateInput('2000-12-31');
        expect(sprintDialogPage.getStartDateInput()).toMatch('2000-12-31');
        sprintDialogPage.setEndDateInput('2000-12-31');
        expect(sprintDialogPage.getEndDateInput()).toMatch('2000-12-31');
        sprintDialogPage.setOrderInput('5');
        expect(sprintDialogPage.getOrderInput()).toMatch('5');
        sprintDialogPage.projectSelectLastOption();
        sprintDialogPage.save();
        expect(sprintDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class SprintComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-sprint div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class SprintDialogPage {
    modalTitle = element(by.css('h4#mySprintLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    startDateInput = element(by.css('input#field_startDate'));
    endDateInput = element(by.css('input#field_endDate'));
    orderInput = element(by.css('input#field_order'));
    projectSelect = element(by.css('select#field_project'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setStartDateInput = function(startDate) {
        this.startDateInput.sendKeys(startDate);
    };

    getStartDateInput = function() {
        return this.startDateInput.getAttribute('value');
    };

    setEndDateInput = function(endDate) {
        this.endDateInput.sendKeys(endDate);
    };

    getEndDateInput = function() {
        return this.endDateInput.getAttribute('value');
    };

    setOrderInput = function(order) {
        this.orderInput.sendKeys(order);
    };

    getOrderInput = function() {
        return this.orderInput.getAttribute('value');
    };

    projectSelectLastOption = function() {
        this.projectSelect.all(by.tagName('option')).last().click();
    };

    projectSelectOption = function(option) {
        this.projectSelect.sendKeys(option);
    };

    getProjectSelect = function() {
        return this.projectSelect;
    };

    getProjectSelectedOption = function() {
        return this.projectSelect.element(by.css('option:checked')).getText();
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
