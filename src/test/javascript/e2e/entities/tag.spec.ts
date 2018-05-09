import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Tag e2e test', () => {

    let navBarPage: NavBarPage;
    let tagDialogPage: TagDialogPage;
    let tagComponentsPage: TagComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Tags', () => {
        navBarPage.goToEntity('tag');
        tagComponentsPage = new TagComponentsPage();
        expect(tagComponentsPage.getTitle())
            .toMatch(/agileManagerApp.tag.home.title/);

    });

    it('should load create Tag dialog', () => {
        tagComponentsPage.clickOnCreateButton();
        tagDialogPage = new TagDialogPage();
        expect(tagDialogPage.getModalTitle())
            .toMatch(/agileManagerApp.tag.home.createOrEditLabel/);
        tagDialogPage.close();
    });

    it('should create and save Tags', () => {
        tagComponentsPage.clickOnCreateButton();
        tagDialogPage.setLabelInput('label');
        expect(tagDialogPage.getLabelInput()).toMatch('label');
        tagDialogPage.setOrderInput('5');
        expect(tagDialogPage.getOrderInput()).toMatch('5');
        tagDialogPage.getTaggedInput().isSelected().then((selected) => {
            if (selected) {
                tagDialogPage.getTaggedInput().click();
                expect(tagDialogPage.getTaggedInput().isSelected()).toBeFalsy();
            } else {
                tagDialogPage.getTaggedInput().click();
                expect(tagDialogPage.getTaggedInput().isSelected()).toBeTruthy();
            }
        });
        tagDialogPage.tagListSelectLastOption();
        tagDialogPage.save();
        expect(tagDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class TagComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-tag div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class TagDialogPage {
    modalTitle = element(by.css('h4#myTagLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    labelInput = element(by.css('input#field_label'));
    orderInput = element(by.css('input#field_order'));
    taggedInput = element(by.css('input#field_tagged'));
    tagListSelect = element(by.css('select#field_tagList'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setLabelInput = function(label) {
        this.labelInput.sendKeys(label);
    };

    getLabelInput = function() {
        return this.labelInput.getAttribute('value');
    };

    setOrderInput = function(order) {
        this.orderInput.sendKeys(order);
    };

    getOrderInput = function() {
        return this.orderInput.getAttribute('value');
    };

    getTaggedInput = function() {
        return this.taggedInput;
    };
    tagListSelectLastOption = function() {
        this.tagListSelect.all(by.tagName('option')).last().click();
    };

    tagListSelectOption = function(option) {
        this.tagListSelect.sendKeys(option);
    };

    getTagListSelect = function() {
        return this.tagListSelect;
    };

    getTagListSelectedOption = function() {
        return this.tagListSelect.element(by.css('option:checked')).getText();
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
