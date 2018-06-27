export default class DetailPage {
  constructor(page) {
    this.page = page;
  }

  async getDescription() {
    await this.page.waitForSelector('.description')
    const result = await this.page.evaluate(() => {
      return document.querySelector('.description').innerText
    })
    return result
  }

  async getUrl() {
    return await this.page.evaluate('location.href')
  }

  async addReview(review) {

    await this.page.waitForSelector('input[name="name"]')
    await this.page.type('input[name="name"]', review.name, {delay: 20})

    await this.page.waitForSelector('textarea[name="content"]')
    await this.page.type('textarea[name="content"]', review.content, {delay: 20})

    await this.page.waitForSelector('button[name="submit"]')
    await this.page.click('button[name="submit"]');
  }

  async getReview(index) {
    await this.page.waitForSelector('.review')
    const reviews = await this.page.evaluate(() => {
      return [...document.querySelectorAll('.review p')].map(el => el.innerText)
    })
    return reviews[index]
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
    await this.page.type('input.search', keyword, {delay: 20})
    return await this.page.screenshot({path: 'search-for-design.png'});
  }
}