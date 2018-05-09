import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('CheckList e2e test', () => {

    let navBarPage: NavBarPage;
    let checkListDialogPage: CheckListDialogPage;
    let checkListComponentsPage: CheckListComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load CheckLists', () => {
        navBarPage.goToEntity('check-list');
        checkListComponentsPage = new CheckListComponentsPage();
        expect(checkListComponentsPage.getTitle())
            .toMatch(/agileManagerApp.checkList.home.title/);

    });

    it('should load create CheckList dialog', () => {
        checkListComponentsPage.clickOnCreateButton();
        checkListDialogPage = new CheckListDialogPage();
        expect(checkListDialogPage.getModalTitle())
            .toMatch(/agileManagerApp.checkList.home.createOrEditLabel/);
        checkListDialogPage.close();
    });

    it('should create and save CheckLists', () => {
        checkListComponentsPage.clickOnCreateButton();
        checkListDialogPage.setTitleInput('title');
        expect(checkListDialogPage.getTitleInput()).toMatch('title');
        checkListDialogPage.taskSelectLastOption();
        checkListDialogPage.save();
        expect(checkListDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CheckListComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-check-list div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CheckListDialogPage {
    modalTitle = element(by.css('h4#myCheckListLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    titleInput = element(by.css('input#field_title'));
    taskSelect = element(by.css('select#field_task'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setTitleInput = function(title) {
        this.titleInput.sendKeys(title);
    };

    getTitleInput = function() {
        return this.titleInput.getAttribute('value');
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
