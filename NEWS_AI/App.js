import React , {useState , useEffect} from 'react';
import MediaQuery from 'react-responsive';
import './App.css';
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './style.js';

import wordsToNumbers from 'words-to-numbers';
import alanBtn from '@alan-ai/alan-sdk-web';

const alanKey = '6f820ce152074bdea4d69dc605ca3eae2e956eca572e1d8b807a3e2338fdd0dc/stage';


const App = () => {

  const [ newsArticles , setNewsArticles] = useState([])
  const [activeArticle , setActiveArticle] = useState(-1)
  const classes = useStyles()

  useEffect(() =>{
    alanBtn({
      key : alanKey,
      onCommand: ({command,articles,number}) =>{
        if(command == 'newHeadLines'){
          setNewsArticles(articles)
          setActiveArticle(-1)
        }
        else if(command =='highlight'){
          setActiveArticle(prevActiveArticle => prevActiveArticle + 1) // don't know but it's not incrementing
          console.log(activeArticle)
        }
        else if(command == 'open'){

          const parsedNumber = number.length > 2 ? wordsToNumbers(number) : number // number 2 and 4 not working
          const article = articles[number-1]

          if(parsedNumber > 20){
            alanBtn().playText('Please choose article below 20.')
          } else if(article){
            window.open(article.url , '_blank')
            alanBtn().playText('Opening...')
          }
        }

      }
    })
  },[])

  return(
    <div>
    <MediaQuery minDeviceWidth = {824} device = {{deviceWidth:1600}}>
      <div className = {classes.logoConatiner}>
        <img src = "https://alan.app/voice/images/previews/preview.jpg" className = {classes.alanLogo} alt = "alan Logo"/>
      </div>
    </MediaQuery>
      <NewsCards articles = {newsArticles} activeArticle = {activeArticle}/>
    </div>
  );
}

export default App;
