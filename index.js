require('dotenv').config()

const { data } = require('./data')
const StoryblokClient = require('storyblok-js-client')

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const Storyblok = new StoryblokClient({
  oauthToken: process.env.TOKEN,
})

const spaceId = process.env.SPACE_ID

const main = async () => {
  await Storyblok.post(`spaces/${spaceId}/components/`, {
    component: {
      name: 'new-product',
      display_name: 'New Product',
      schema: {
        description: {
          type: 'text',
        },
        prices: {
          type: 'text',
        },
        price: {
          type: 'text',
        },
        images: {
          type: 'text',
        },
      },
    },
  })

  for (const i of data) {
    await delay(2000)
    await Storyblok.post(`spaces/${spaceId}/stories/`, {
      story: {
        name: i.name,
        slug: i.slug,
        default_root: 'products',
        is_folder: false,
        content: {
          component: 'new-product',
          description: i.description,
          prices: JSON.stringify(i.prices),
          price: JSON.stringify(i.price),
          images: JSON.stringify(i.images),
        },
      },
      publish: 1,
    })
  }
}

main()
