import { APP_BASE_URL } from '../constants'

export default class ListPage {
    constructor(page) {
        this.page = page;
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

    async gotoDetail(index) {
      await this.page.waitForSelector('a.view-detail')

      const links = await this.page.evaluate(() => {
        return [...document.querySelectorAll('a.view-detail')].map(el => el.getAttribute('href'))
      })

      await Promise.all([
        this.page.waitForNavigation({waitUntil: 'networkidle2'}),
        this.page.goto(`${APP_BASE_URL}${links[index]}`)
      ])
    }
}