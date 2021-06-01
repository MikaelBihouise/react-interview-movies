const movies = [
  {
    id: '1',
    title: 'Oceans 8',
    category: 'Comedy',
    likes: 4,
    dislikes: 1,
    img: '/ocean8.jpg'
  }, {
    id: '2',
    title: 'Midnight Sun',
    category: 'Comedy',
    likes: 2,
    dislikes: 0,
    img: '/midnight-sun.jpg'
  }, {
    id: '3',
    title: 'Les indestructibles 2',
    category: 'Animation',
    likes: 3,
    dislikes: 1,
    img: '/indestructibles.jpg'
  }, {
    id: '4',
    title: 'Sans un bruit',
    category: 'Thriller', 
    likes: 6,
    dislikes: 6,
    img: '/sans-un-bruit.jpg'
  }, {
    id: '5',
    title: 'Creed II',
    category: 'Drame',
    likes: 16,
    dislikes: 2,
    img: '/creed-2.jpg'
  }, {
    id: '6',
    title: 'Pulp Fiction',
    category: 'Thriller',
    likes: 11233,
    dislikes: 32,
    img: '/pulp-fiction.jpg'
  }, {
    id: '7',
    title: 'Forrest Gump',
    category: 'Drame',
    likes: 175,
    dislikes: 12,
    img: '/forrest-gump.jpg'
  }, {
    id: '8',
    title: 'Seven',
    category: 'Thriller',
    likes: 2,
    dislikes: 1,
    img: '/seven.jpg'
  }, {
    id: '9',
    title: 'Inception',
    category: 'Thriller',
    likes: 2,
    dislikes: 1,
    img: '/inception.jpg'
  }, {
    id: '10',
    title: 'Gone Girl',
    category: 'Thriller',
    likes: 22,
    dislikes: 12,
    img: '/gone-girl.jpg'
  },
]


export const movies$ = new Promise((resolve, reject) => setTimeout(resolve, 100, movies))