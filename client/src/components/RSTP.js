import {React, useEffect} from "react"
import JSMpeg from "@cycjimmy/jsmpeg-player"
import axios from "axios"

const StreamPlayer = () => {

useEffect(()=>{
    const url = 'ws://127.0.0.1:9999'
    let canvas = document.getElementById("video-canvas")
    new JSMpeg.Player(url, { canvas: canvas })
},[])

const rtspurl = ""//enter the rtsp url here
  
const httpRequest = (url) => {
   axios.get(`http://127.0.0.1:3002/stream?rtsp=${url}`)
}
    
const startRTSPFeed = () => {
   httpRequest(rtspurl)
}
    
const stopRTSPFeed = () => {
   httpRequest("stop")
}

return(
   <div>
      <div>
        <canvas id="video-canvas"></canvas>
      </div>
      <div>
        <button onClick={startRTSPFeed}>Start RTSP Feed</button>
        <button onClick={stopRTSPFeed}> Stop RTSP Feed</button>
      </div>
   </div>
)}