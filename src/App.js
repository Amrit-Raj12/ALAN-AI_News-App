import React, { useState, useEffect } from 'react';
import alanBtn from "@alan-ai/alan-sdk-web";
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles.js';
import wordsToNumbers from 'words-to-numbers';

const alanKey = 'b1fef45113079614b629e7cd4ebbca6e2e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = ()=>{
  const [ newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle]=useState(-1);
  const classes = useStyles();

  useEffect(()=> {
    alanBtn({
      key: alanKey,
      onCommand:({ command, articles, number })=>{
        if(command=== 'newHeadlines'){
            setNewsArticles(articles);
            setActiveArticle(-1);
        } else if(command === 'highlight'){
          setActiveArticle((prevActiveArticle)=> prevActiveArticle + 1);

        } else if(command === 'open'){
            const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy:true}) : number;
            const article = articles[parsedNumber - 1];

            if (parsedNumber > 20) {
              alanBtn().playText('Please try that again...');
            } else if (article) {
              window.open(article.url, '_blank');
              alanBtn().playText('Opening...');
            } else {
              alanBtn().playText('Please try that again...');
            }
          }
        },
      });
    }, []);
  return(
    <div>
        <div className={classes.logoContainer}>
          <img src="https://artificialintelligence-news.com/wp-content/uploads/sites/9/2020/03/ai-newsv4-2-svg.png" className={classes.alanLogo} alt="alan logo" />
        </div>
        <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  )
}

export default App;
