import React ,{useState , useEffect , createRef} from 'react'
import useStyles from './style.js'
import classNames from 'classnames'
import {Card , CardActions , CardActionArea 
	, CardContent , CardMedia , Button , Typography}
	from '@material-ui/core'

const NewsCard = ({article:{description,publishedAt,source,title,url,urlToImage} , i, activeArticle}) =>{
	const classes = useStyles()
	const [elRefs , setElfRefs] = useState([])
	const scrollToRef = (ref) => window.scroll(0,ref.current.offsetTop - 50)

	useEffect(() => {
		setElfRefs((refs) => Array(20).fill().map((_,j) => refs[j] || createRef()))
	},[])

	useEffect(() => {
		if(i==activeArticle && elRefs[activeArticle]){
			scrollToRef(elRefs[activeArticle])
		}
	},[i,activeArticle,elRefs])

	return(
		<Card ref = {elRefs[i]} className = {classNames(classes.card , activeArticle == i ?classes.activeCard : null)}>
			<CardActionArea href = {url} target = "_blank">
				<CardMedia className = {classes.media} image = {urlToImage || 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.quora.com%2FWhat-is-the-full-form-of-NEWS&psig=AOvVaw3_78t95ZcTs17egTh9J47f&ust=1598013136650000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKiZ8afkqesCFQAAAAAdAAAAABAI'}/>
				<div className = {classes.details}>
					<Typography variant = "body2" color = "textSecondary" component = "h2">{(new Date(publishedAt)).toDateString()}</Typography>
					<Typography variant = "body2" color = "textSecondary" component = "h2">{source.name}</Typography>
				</div>
				<Typography className = {classes.title} gutterBottom variant = "h5">{title}</Typography>
				<CardContent>
					<Typography variant = "body2" color = "textSecondary" component = "p">{description}</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions className = {classes.CardActions}>
				<Button size = "small" color = "primary">Learn More</Button>
				<Typography variant = "h5" color = "textSecondary">{i + 1}</Typography>
			</CardActions>
		</Card>
	)
}

export default NewsCard