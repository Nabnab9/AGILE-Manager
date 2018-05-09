import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('TagList e2e test', () => {

    let navBarPage: NavBarPage;
    let tagListDialogPage: TagListDialogPage;
    let tagListComponentsPage: TagListComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load TagLists', () => {
        navBarPage.goToEntity('tag-list');
        tagListComponentsPage = new TagListComponentsPage();
        expect(tagListComponentsPage.getTitle())
            .toMatch(/agileManagerApp.tagList.home.title/);

    });

    it('should load create TagList dialog', () => {
        tagListComponentsPage.clickOnCreateButton();
        tagListDialogPage = new TagListDialogPage();
        expect(tagListDialogPage.getModalTitle())
            .toMatch(/agileManagerApp.tagList.home.createOrEditLabel/);
        tagListDialogPage.close();
    });

    it('should create and save TagLists', () => {
        tagListComponentsPage.clickOnCreateButton();
        tagListDialogPage.setTitleInput('title');
        expect(tagListDialogPage.getTitleInput()).toMatch('title');
        tagListDialogPage.taskSelectLastOption();
        tagListDialogPage.save();
        expect(tagListDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class TagListComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-tag-list div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class TagListDialogPage {
    modalTitle = element(by.css('h4#myTagListLabel'));
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
