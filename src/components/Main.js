import React from "react";
import PostComponent from "./PostComponent";

export default function Main(){
    let [animeQuotes, setAnimeQuotes] = React.useState([]);
    let [programmingQuotes, setProgrammingQuotes] = React.useState([]);
    let [randomQuotes, setRandomQuotes] = React.useState([]);
    let [category, setCategory] = React.useState({
        anime: {
            checked: true,
            name: "Anime"
        },
        programming: {
            checked: false,
            name: 'Programming'
        },
        random: {
            checked: false,
            name: 'Quotes'
        }
    })
    let [requestAnime, setRequestAnime] = React.useState(0);
    let [requestRandom, setRequestRandom] = React.useState(0);
    let [countAnime, setCountAnime] = React.useState(0);
    let [countRandom, setCountRandom] = React.useState(0);
    let [countProgramming, setCountProgramming] = React.useState(randomCountProgramming());

    React.useEffect(() => {
        fetch('https://animechan.vercel.app/api/quotes')
            .then(response => response.json())
            .then(quotes => {
                console.log(quotes)
                return setAnimeQuotes(quotes)
            });
    }, [requestAnime]);

    React.useEffect(() => {
        fetch('https://favqs.com/api/quotes/', {
            method: 'GET',
            withCredentials: true,
            headers: {
                Authorization: "Token 6e94989333d6d129d52ca91f819f598a"
            }
        })
            .then(response => response.json())
            .then(quotes => {
                console.log(quotes.quotes)
                return setRandomQuotes(quotes.quotes)
            })
    }, [requestRandom])

    React.useEffect(() => {
        fetch('https://programming-quotes-api.herokuapp.com/Quotes')
            .then(response => response.json())
            .then(quotes => {
                console.log(quotes)
                return setProgrammingQuotes(quotes)
            });
    }, [])

    function handleClickAnime(){
        setCategory({
            anime: {
                checked: true,
                name: "Anime"
            },
            programming: {
                checked: false,
                name: 'Programming'
            },
            random: {
                checked: false,
                name: 'Quotes'
            }
        })
        
        if(countAnime === 9){
            setCountAnime(0);
            setRequestAnime(prev => prev + 1);
            return;
        }
        setCountAnime(prev => prev + 1);
    }

    function handleClickRandom(){
        setCategory({
            anime: {
                checked: false,
                name: "Anime"
            },
            programming: {
                checked: false,
                name: 'Programming'
            },
            random: {
                checked: true,
                name: 'Quotes'
            }
        })
        
        if(countRandom === 24){
            setCountRandom(0);
            setRequestRandom(prev => prev + 1);
            return;
        }
        setCountRandom(prev => prev + 1);
    }

    function randomCountProgramming(){
        let count = Math.floor(Math.random() * 501)
        return count
    }

    function handleClickProgramming(){
        setCountProgramming(randomCountProgramming());
        setCategory({
            anime: {
                checked: false,
                name: "Anime"
            },
            programming: {
                checked: true,
                name: 'Programming'
            },
            random: {
                checked: false,
                name: 'Quotes'
            }
        })
    }

    function component(){
        if(category.anime.checked){
            return animeQuotes.length ? animeQuotes[countAnime].quote.length >= 270 ? handleClickAnime() : 
                    <PostComponent
                        img="./test.png" 
                        quote={animeQuotes[countAnime].quote} 
                        handleClick={handleClickAnime} 
                        heading={"Anime"}
                        subHeading={animeQuotes[countAnime].anime}
                        author={animeQuotes[countAnime].character} /> : 
                    <h2>Please Wait ...</h2>
        } else if (category.programming.checked){
            return programmingQuotes.length ? programmingQuotes[countProgramming].en.length >= 270 ? handleClickProgramming() : 
                    <PostComponent 
                        img="./hacker.png"
                        quote={programmingQuotes[countProgramming].en} 
                        handleClick={handleClickProgramming} 
                        heading={"Programming"}
                        subHeading={programmingQuotes[countProgramming].author} 
                        author={programmingQuotes[countProgramming].author} /> :                         
                    <h2>Please Wait ...</h2>
        } else if (category.random.checked) {
            return randomQuotes.length ? randomQuotes[countRandom].body.length >= 270 ? handleClickRandom() : 
                    <PostComponent 
                        img="./random.png"
                        quote={randomQuotes[countRandom].body} 
                        handleClick={handleClickRandom} 
                        heading={"Random"}
                        subHeading={randomQuotes[countRandom].author} 
                        author={randomQuotes[countRandom].author} /> :                         
                    <h2>Please Wait ...</h2>
        }
    }

    const buttonStyle = {
        backgroundColor: 'white'
    }
    
    return(
        <main>
            <div className="row mt-5 px-lg-5">
                <div className="col-12 col-md-5 main-left">
                    <p className="d-none d-md-block">Select</p>
                    <button className="main-left-button" style={category.anime.checked ? buttonStyle : {}} onClick={handleClickAnime}>Anime</button>
                    <button className="main-left-button" style={category.programming.checked ? buttonStyle : {}} onClick={handleClickProgramming}>Programming</button>
                    <button className="main-left-button" style={category.random.checked ? buttonStyle : {}} onClick={handleClickRandom} >Random</button>
                </div>
                <div className="col-12 col-md-6 post">
                    {component()}
                </div>
            </div>
        </main>
    );
}