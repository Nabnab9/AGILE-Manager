import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('CheckItem e2e test', () => {

    let navBarPage: NavBarPage;
    let checkItemDialogPage: CheckItemDialogPage;
    let checkItemComponentsPage: CheckItemComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load CheckItems', () => {
        navBarPage.goToEntity('check-item');
        checkItemComponentsPage = new CheckItemComponentsPage();
        expect(checkItemComponentsPage.getTitle())
            .toMatch(/agileManagerApp.checkItem.home.title/);

    });

    it('should load create CheckItem dialog', () => {
        checkItemComponentsPage.clickOnCreateButton();
        checkItemDialogPage = new CheckItemDialogPage();
        expect(checkItemDialogPage.getModalTitle())
            .toMatch(/agileManagerApp.checkItem.home.createOrEditLabel/);
        checkItemDialogPage.close();
    });

    it('should create and save CheckItems', () => {
        checkItemComponentsPage.clickOnCreateButton();
        checkItemDialogPage.setLabelInput('label');
        expect(checkItemDialogPage.getLabelInput()).toMatch('label');
        checkItemDialogPage.getCheckedInput().isSelected().then((selected) => {
            if (selected) {
                checkItemDialogPage.getCheckedInput().click();
                expect(checkItemDialogPage.getCheckedInput().isSelected()).toBeFalsy();
            } else {
                checkItemDialogPage.getCheckedInput().click();
                expect(checkItemDialogPage.getCheckedInput().isSelected()).toBeTruthy();
            }
        });
        checkItemDialogPage.checkListSelectLastOption();
        checkItemDialogPage.save();
        expect(checkItemDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CheckItemComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-check-item div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CheckItemDialogPage {
    modalTitle = element(by.css('h4#myCheckItemLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    labelInput = element(by.css('input#field_label'));
    checkedInput = element(by.css('input#field_checked'));
    checkListSelect = element(by.css('select#field_checkList'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setLabelInput = function(label) {
        this.labelInput.sendKeys(label);
    };

    getLabelInput = function() {
        return this.labelInput.getAttribute('value');
    };

    getCheckedInput = function() {
        return this.checkedInput;
    };
    checkListSelectLastOption = function() {
        this.checkListSelect.all(by.tagName('option')).last().click();
    };

    checkListSelectOption = function(option) {
        this.checkListSelect.sendKeys(option);
    };

    getCheckListSelect = function() {
        return this.checkListSelect;
    };

    getCheckListSelectedOption = function() {
        return this.checkListSelect.element(by.css('option:checked')).getText();
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
