import {Page, expect} from '@playwright/test'
import {DemoQAPage} from '../page-objects/demoqaPage'

export class PageManager{

    private readonly page: Page
    private readonly demoQAPage: DemoQAPage

    constructor(page: Page){
        this.page = page
        this.demoQAPage = new DemoQAPage(this.page)
    }

    onPracticeForm(){
        return this.demoQAPage
    }
}