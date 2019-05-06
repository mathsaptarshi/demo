import React, { Component } from 'react'
import axios from 'axios';
import _ from 'lodash';
import {Link} from 'react-router-dom';

let  renderPushData=[];
export default class Details extends Component {
  constructor(props) {        
		super(props);
		this.state = {			
          data: []
        }
        this.randerData = this.randerData.bind(this);
    }

  componentDidMount(){
    let query={"query": "{mail{id,email,name,phoneno,message}}"};
    axios.post('https://gqlmail.herokuapp.com/v1alpha1/graphql', query,{headers: {'Content-Type': 'application/json'}})
        .then((response) => {
            // console.log(response.data.data.mail);
            this.setState({ data: response.data.data.mail })
        })
      .catch(function (error) {
          console.log(error);
      });
}

randerData(){
  let data=[];
  var i=0;
  data=this.state
  data=data.data
  let descsortdata = _.orderBy(data, [data => data.id], ['desc']);
  // const {imgdata,counter} = this.state;
  renderPushData=[];        
  for(let i=0;i<data.length;i++){
      renderPushData.push(                
        <tr key={i}>
          <td scope="row">{i}</td>
          <td scope="row">{data.length>0?descsortdata[i].name:null}</td>
          <td scope="row">{data.length>0?descsortdata[i].email:null}</td>
          <td scope="row">{data.length>0?descsortdata[i].phoneno:null}</td>
          <td scope="row">{data.length>0?descsortdata[i].message:null}</td>
        </tr>
      )
  }
  return renderPushData;
}

    render() {   
      const {data} = this.state; 
    return (
      <div>
        <div>
        <Link to="/" >Back</Link>
        </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone No</th>
            <th scope="col">Message</th>
          </tr>
        </thead>
        <tbody>
        {1?this.randerData():null}
        </tbody>
      </table>
      </div>
    )
  }
}
