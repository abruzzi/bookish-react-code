import { APP_BASE_URL } from '../constants'

export default class DetailPage {
  constructor(browser, id) {
    this.browser = browser
    this.id = id
  }

  async initialize() {
    this.page = await this.browser.newPage()
    await this.page.goto(`${APP_BASE_URL}/books/${this.id}`)
  }

  async getDescription() {
    await this.page.waitForSelector('.description')
    return await this.page.evaluate(() => {
      return document.querySelector('.description').innerText
    })
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
}