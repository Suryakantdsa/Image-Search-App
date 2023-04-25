import './App.css';
import { useEffect, useState } from "react"
import { BsHeartFill } from "react-icons/bs";


function App() {
  const [bookmark, getbookmark] = useState([])
  const [allImage, getFromApi] = useState([])
  const [searchItem, getItem] = useState("")
  const [show, setShow] = useState(false)
  useEffect(() => {
    // handleSearch()
  }, [])
  const handleSearch = () => {
    setShow(false)
    fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchItem}&client_id=hKMLBkLx9vd29FPgTOptaC8_zlZa6bKo-aJy69to5t0`
    )
      .then(resp => resp.json())
      .then((data) => {
        getFromApi(data.results)
        // console.log(data.results[0].urls.small)

      })
  }
  const addBookmark = (img) => {
    getbookmark([...bookmark, img])
    // console.log(bookmark)

  }
  const showBookmark = () => {
    setShow(true)
  }
  // console.log(allImage)
  return (
    <div className="App">
      <div className="box">
        <nav>
          <h1>React Photo Search</h1>
          <button onClick={() => showBookmark()}>Bookmarks</button>
        </nav>
        <div className="input-data">
          <input type="text" id="input" placeholder="Search free high resolution images" value={searchItem} onChange={(e) => getItem(e.target.value)} />
          <button onClick={()=>handleSearch()}>Search</button>
        </div>

        {show ? bookmark.length > 0 ?
          <div className="display">
            {bookmark.map((data, id) => {
              return (
                <div className="single" key={id}  >
                  <img src={data} alt="img" width={"150px"} height={"200px"} />
                  <button id='bookmark'><BsHeartFill /></button>
                </div>
              )
            })}

          </div> :
          <p>No bookmark image is there</p>

          :


          <div className="display">

            {allImage.map((data, id) => {
              return (
                <div className="single" key={id}  >
                  <img src={data.urls.thumb} alt="img" width={"150px"} height={"200px"} />
                  <button id='bookmark' onClick={() => addBookmark(data.urls.thumb)}><BsHeartFill /></button>
                </div>
              )
            })}

          </div>
        }
      </div>


    </div>
  );
}

export default App;
