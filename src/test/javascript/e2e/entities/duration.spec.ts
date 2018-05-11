import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Duration e2e test', () => {

    let navBarPage: NavBarPage;
    let durationDialogPage: DurationDialogPage;
    let durationComponentsPage: DurationComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Durations', () => {
        navBarPage.goToEntity('duration');
        durationComponentsPage = new DurationComponentsPage();
        expect(durationComponentsPage.getTitle())
            .toMatch(/agileManagerApp.duration.home.title/);

    });

    it('should load create Duration dialog', () => {
        durationComponentsPage.clickOnCreateButton();
        durationDialogPage = new DurationDialogPage();
        expect(durationDialogPage.getModalTitle())
            .toMatch(/agileManagerApp.duration.home.createOrEditLabel/);
        durationDialogPage.close();
    });

    it('should create and save Durations', () => {
        durationComponentsPage.clickOnCreateButton();
        durationDialogPage.setEstimatedInput('5');
        expect(durationDialogPage.getEstimatedInput()).toMatch('5');
        durationDialogPage.setSpentInput('5');
        expect(durationDialogPage.getSpentInput()).toMatch('5');
        durationDialogPage.setNameInput('name');
        expect(durationDialogPage.getNameInput()).toMatch('name');
        durationDialogPage.taskSelectLastOption();
        durationDialogPage.save();
        expect(durationDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class DurationComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-duration div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class DurationDialogPage {
    modalTitle = element(by.css('h4#myDurationLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    estimatedInput = element(by.css('input#field_estimated'));
    spentInput = element(by.css('input#field_spent'));
    nameInput = element(by.css('input#field_name'));
    taskSelect = element(by.css('select#field_task'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setEstimatedInput = function(estimated) {
        this.estimatedInput.sendKeys(estimated);
    };

    getEstimatedInput = function() {
        return this.estimatedInput.getAttribute('value');
    };

    setSpentInput = function(spent) {
        this.spentInput.sendKeys(spent);
    };

    getSpentInput = function() {
        return this.spentInput.getAttribute('value');
    };

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    taskSelectLastOption = function() {
        this.taskSelect.all(by.tagName('option')).last().click();
    };

    taskSelectOption = function(option) {
        this.taskSelect.sendKeys(option);
    };

    getTaskSelect = function() {
        return this.taskSelect;
    };

    getTaskSelectedOption = function() {
        return this.taskSelect.element(by.css('option:checked')).getText();
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
