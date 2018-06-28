import { APP_BASE_URL } from '../constants'

export default class ListPage {
	constructor(browser) {
		this.browser = browser
	}
    async initialize() {
      this.page = await this.browser.newPage()
      await this.page.goto(`${APP_BASE_URL}/`)
		}

    async getHeading() {
    	await this.page.waitForSelector('h1')
      return await this.page.evaluate(() => {
        return document.querySelector('h1').innerText
      });
    }

    async getBooks() {
	    await this.page.waitForSelector('.books')
      return await this.page.evaluate(() => {
        return [...document.querySelectorAll('.book .title')].map(el => el.innerText)
      });
    }

    async search(keyword) {
	    const input = await this.page.waitForSelector('input.search')
	    await this.page.type('input.search', keyword, {delay: 20})
	    return await this.page.screenshot({path: 'search-for-design.png'});
    }
}