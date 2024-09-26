import React from 'react';
import ArticleItem from './ArticleItem';
import '../Styles/Articles.css';
import Item1 from '../assets/gemstone ring.png'
import Item2 from '../assets/ring2.png'

const Articles = () => {
  const articles = [
    {
      id: 1,
      image: Item1,  // Replace with your image link
      title: 'Article One',
      description: 'This is a short description of the first article.',
      link: '/article-1',
    },
    {
      id: 2,
      image: Item2,  // Replace with your image link
      title: 'Article Two',
      description: 'This is a short description of the second article.',
      link: '/article-2',
    },
    // Add more articles as needed
  ];

  return (
    <section className="articles">
      <h2>Articles</h2>
      <div className="articles-list">
        {articles.map(article => (
          <ArticleItem
            key={article.id}
            image={article.image}
            title={article.title}
            description={article.description}
            link={article.link}
          />
        ))}
      </div>
    </section>
  );
};

export default Articles;
