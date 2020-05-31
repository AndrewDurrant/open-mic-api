function makeVideosArray() {
  return [
    {
      id: 1,
      title: 'First test video',
      link: 'https://www.youtube.com/watch?v=uiBxYDyyb14',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?', 
      date_created: '2029-01-22T16:28:32.615Z',
      // user_id: 2,
      // comments: ['great', 'awesome'],
      // rating: [2, 4, 1],
    },
    {
      id: 2,
      title: 'Second test video',
      link: 'https://www.youtube.com/watch?v=qM_r-cJ-JZI',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, exercitationem cupiditate dignissimos est perspiciatis, nobis commodi alias saepe atque facilis labore sequi deleniti. Sint, adipisci facere! Velit temporibus debitis rerum.',
      date_created: '2100-05-22T16:28:32.615Z',
      // user_id: 1,
      // comments: ['super', 'thank you'],
      // rating: [3, 4, 2],
    },
    {
      id: 3,
      title: 'Third test video',
      link: 'https://www.youtube.com/watch?v=T6NFckh8K9k',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, voluptate? Necessitatibus, reiciendis? Cupiditate totam laborum esse animi ratione ipsa dignissimos laboriosam eos similique cumque. Est nostrum esse porro id quaerat.',
      date_created: '1919-12-22T16:28:32.615Z',
      // user_id: 3,
      // comments: ['woot', 'right on!'],
      // rating: [1, 4, 3],
    },
    {
      id: 4,
      title: 'Fourth test video!',
      link: 'https://www.youtube.com/watch?v=Sh2R5lOliZE',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum molestiae accusamus veniam consectetur tempora, corporis obcaecati ad nisi asperiores tenetur, autem magnam. Iste, architecto obcaecati tenetur quidem voluptatum ipsa quam?',
      date_created: '1919-12-22T16:28:32.615Z',
      // user_id: 2,
      // comments: ['nice', 'that sucked'],
      // rating: [1, 3, 1],
    },
  ];
}

function makeInteractionsArray() {
  return [
    {
      id: 1,
      comment: 'great', 
      date_created: '2020-05-29 13:52:49',
      rating: 3,
      // user_id: 2,
      media_id: 1,
    },
    {
      id: 2,
      comment: 'awesome', 
      date_created: '2020-04-29 13:52:49',
      rating: 4,
      // user_id: 1,
      media_id: 2,
    },
    {
      id: 3,
      comment: 'thank you', 
      date_created: '2020-03-29 13:52:49',
      rating: 2,
      // user_id: 3,
      media_id: 3,
    },
    {
      id: 4,
      comment: 'sweet', 
      date_created: '2020-02-29 13:52:49',
      rating: 3,
      // user_id: 1,
      media_id: 2,
    },
  ]}

function makeMaliciousVideo() {
  const maliciousVideo = {
    id: 911,
    date_published: new Date().toISOString(),
    title: 'Naughty naughty very naughty <script>alert("xss");</script>',
    link: 'https://www.thisisabslink.com/watch?v=Sh2R5lOliZE',
    description: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`
  }
  const expectedVideo = {
    ...maliciousVideo,
    title: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
    description: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`
  }
  return {
    maliciousVideo,
    expectedVideo,
  }
}

module.exports = {
  makeVideosArray,
  makeMaliciousVideo,
  makeInteractionsArray,
}

