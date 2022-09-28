function App(){
    const [quotes,setQuotes]=React.useState([]);
    const [randomQuote,setRandomQuote]=React.useState([]);
    const [color,setRandomColor]=React.useState('#000');
    React.useEffect(()=>{
        async function fetchData(){
            const response=await fetch('https://type.fit/api/quotes')
            const data=await response.json();

            setQuotes(data);
            let randIndex=Math.floor(Math.random()*data.length);
            setRandomQuote(data[randIndex]);
        }
        fetchData();
    },[])
    const getNewQuote=()=>{
        const colors=["#69d2e7","#a7dbd8","#e0e4cc","#f38630","#fa6900","#fe4365","#fc9d9a","#f9cdad","#c8c8a9","#83af9b"];
        let randColorIndex=Math.floor(Math.random()*colors.length);
        let randIndex=Math.floor(Math.random()*quotes.length);
        setRandomQuote(quotes[randIndex]);
        setRandomColor(colors[randColorIndex])
      }
    return(
        <div className='d-flex align-items-center'style={{backgroundColor:color,minHeight:'100vh'}}>
        <div className='container' id='quote-box'>
            <div className='jumbotron'>
               <div className='card'>
                <div className='card-body'>
                    <div className='card-body' id='text'>
                        {
                        randomQuote.text?(<h3 className='text-center'>&quot;{randomQuote.text}&quot;</h3>):(<h3 className='text-center'>Issue Loading Quotes</h3>)
                        }
                    </div>
                    <div className='card-footer'>
                        <div className='d-flex justify-content-between'>
                        <div>
                            <button id='new-quote' className='btn btn-dark' onClick={getNewQuote}>New Quote</button>
                            <a id='tweet-quote' href={"https://twitter.com/intent/tweet?text="+encodeURIComponent(
                                '"'+randomQuote.text+'"'+'\n'+'-'+randomQuote.author
                                )}>
                                <button className='btn btn-primary'>
                                    <i className='fa fa-twitter'></i>
                                </button>
                            </a>

                        </div>
                        <div className='justify-content-end' id='author'>{
                            randomQuote.author?(<h6 className='text-end'>-{randomQuote.author}</h6>):(<h6 className='text-right'>-Anonymous</h6>)
                            }
                        </div>
                    </div>
                    </div>
                    
                </div>
                </div>
            </div> 
        </div>
    </div>
    );
}

ReactDOM.render(<App/>,document.getElementById('app'))