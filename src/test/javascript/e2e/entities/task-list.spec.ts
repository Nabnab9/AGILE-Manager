import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('TaskList e2e test', () => {

    let navBarPage: NavBarPage;
    let taskListDialogPage: TaskListDialogPage;
    let taskListComponentsPage: TaskListComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load TaskLists', () => {
        navBarPage.goToEntity('task-list');
        taskListComponentsPage = new TaskListComponentsPage();
        expect(taskListComponentsPage.getTitle())
            .toMatch(/agileManagerApp.taskList.home.title/);

    });

    it('should load create TaskList dialog', () => {
        taskListComponentsPage.clickOnCreateButton();
        taskListDialogPage = new TaskListDialogPage();
        expect(taskListDialogPage.getModalTitle())
            .toMatch(/agileManagerApp.taskList.home.createOrEditLabel/);
        taskListDialogPage.close();
    });

    it('should create and save TaskLists', () => {
        taskListComponentsPage.clickOnCreateButton();
        taskListDialogPage.setNameInput('name');
        expect(taskListDialogPage.getNameInput()).toMatch('name');
        taskListDialogPage.setOrderInput('5');
        expect(taskListDialogPage.getOrderInput()).toMatch('5');
        taskListDialogPage.sprintSelectLastOption();
        taskListDialogPage.save();
        expect(taskListDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class TaskListComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-task-list div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class TaskListDialogPage {
    modalTitle = element(by.css('h4#myTaskListLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    orderInput = element(by.css('input#field_order'));
    sprintSelect = element(by.css('select#field_sprint'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setOrderInput = function(order) {
        this.orderInput.sendKeys(order);
    };

    getOrderInput = function() {
        return this.orderInput.getAttribute('value');
    };

    sprintSelectLastOption = function() {
        this.sprintSelect.all(by.tagName('option')).last().click();
    };

    sprintSelectOption = function(option) {
        this.sprintSelect.sendKeys(option);
    };

    getSprintSelect = function() {
        return this.sprintSelect;
    };

    getSprintSelectedOption = function() {
        return this.sprintSelect.element(by.css('option:checked')).getText();
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
