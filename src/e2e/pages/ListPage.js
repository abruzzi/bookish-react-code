export default class ListPage {
    
    constructor(page) {
        this.page = page;
    }

    async getHeading() {
    	await this.page.waitForSelector('h1')
	    const result = await this.page.evaluate(() => {
	      return document.querySelector('h1').innerText
	    })
	    return result;
    }

    async getBooks() {
	    await this.page.waitForSelector('.books')
	    const books = await this.page.evaluate(() => {
	      return [...document.querySelectorAll('.book .title')].map(el => el.innerText)
	    })
	    return books;
    }

    async search(keyword) {
	    const input = await this.page.waitForSelector('input.search')
	    this.page.type('input.search', keyword)
	    return await this.page.screenshot({path: 'search-for-design.png'});
    }
}