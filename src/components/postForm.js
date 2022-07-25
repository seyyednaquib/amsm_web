import React, { Component } from 'react'
import axios from 'axios'

export class PostForm extends Component {
     constructor(props) {
       super(props)
     
       this.state = {
          title:'',
          body:''
       }
     }

     changeHandler =e=>{
         this.setState({[e.target.name]:e.target.value})
     }
     submitHandler = e =>{
         e.preventDefault()
         console.log(this.state);
         var data = JSON.stringify({
            "to": "c6-rpcGETFOasHl596QH3x:APA91bFAEMaVaiPtIUMx6Xoh2xFXTZrzB48ZbynQ3xm6_-OfauYh_78egtWaPA1HxQLpIjdnIht5t85xS0pzt9iU4UjvxIRjtrX2v6948T3jzC0RKcnomjFIST4jGLDRNzl6DLaF2MBg",
            "notification": {
              "body": "Firebase Cloud Message Body",
              "title": "Firebase Cloud Message Title"
            },
            "data": {
              "route": "announcement"
            }
          });
         
         var config = {
           method: 'post',
           url: 'https://fcm.googleapis.com/fcm/send',
           headers: { 
             'Content-Type': 'application/json', 
             'Authorization': 'key=AAAAXsbdkuk:APA91bHW3tgIsNoFWwCZYgDLEpLJ8gxLf_t5GgjdEln9w5e_LqkxDP0OWVQT_a0wIMH12Uili0OKsCmmhMrQKIuUXY5zPW1Y9u-pEQehwEkqIsuM3yP15hanE-BorWvCTfJfp8Nasu-H'
           },
           data : data
         };
         
         axios(config)
         .then(function (response) {
           console.log(JSON.stringify(response.data));
         })
         .catch(function (error) {
           console.log(error);
         });
     }
  render() {
      const {title,body} = this.state
    return (
      <div>
          <form onSubmit={this.submitHandler}>
              <div>
                  <input type="text" name='title' value={title} onChange={this.changeHandler}></input>
              </div>
              <div>
                  <input type="text" name='body' value={body} onChange={this.changeHandler}></input>
              </div>
              <button type='submit'>submit</button>
          </form>
      </div>
    )
  }
}

export default PostForm