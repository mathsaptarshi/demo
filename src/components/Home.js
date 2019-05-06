import React, { Component } from 'react'
import Api from './Api'
import { graphql, compose } from 'react-apollo';
import { addMailMutation } from '../queries/queries';
import * as emailjs from 'emailjs-com';


// Send email functionality
// function send_email(user) {
// console.log(user);
//   const TEMPLATE_ID = "sample_email"
//   const SERVICE_ID = "default_service"

//   var templateParams = {
//     to_name: user.name,
//     from_name: 'Sample App',
//     message_html: user.message,
//     to: user.email,
//     from: 'support@example.com'
//   };
//   emailjs.init("user_vVyAx3v8xIbBNDfPev65o");
//   emailjs.send( SERVICE_ID, TEMPLATE_ID, templateParams)
//     .then(function(response) {
//       console.log('SUCCESS!', response.status, response.text);
//     }, function(err) {
//       console.log('FAILED...', err);
//     });
//   }


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            phoneno:'',
            email: '',
            message: '',
            errors: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })        
    }

    // Send email functionality
    // send_email() {
    //     alert();
    //     const TEMPLATE_ID = "sample_email"
    //     const SERVICE_ID = "default_service"
    //     var templateParams = {
    //       to_name: this.state.name,
    //       from_name: 'Sample App',
    //       message_html: this.state.message,
    //       to: this.state.email,
    //       from: 'support@example.com'
    //     };
    //     emailjs.init("user_vVyAx3v8xIbBNDfPev65o");
    //     emailjs.send( SERVICE_ID, TEMPLATE_ID, templateParams)
    //       .then(function(response) {
    //         console.log('SUCCESS!', response.status, response.text);
    //       }, function(err) {
    //         console.log('FAILED...', err);
    //       });
    //     }
    

    sentSMS(){
    let apiKey="d8ZaUIHjYK4-oyr8WNmvEbjRUEMZ0CTbY77QGVjN2X"        
	let apiKeyOri = encodeURI(apiKey);
	let numbers = [918926308294];
	let sender = encodeURI('TXTLCL');
	let message = encodeURI('This is your message');
    //$numbers = implode(',', $numbers);
    numbers = numbers.join(",");
	// Prepare data for POST request
    //$data = array('apikey' => $apiKey, 'numbers' => $numbers, "sender" => $sender, "message" => $message);
    /*let data = [
        "apikey"apiKeyOri,
        "numbers":numbers,
        "sender":sender,
        "message":message
    ]*/
    let data = [];
    data['apikey'] = apiKeyOri;
    data['numbers'] = numbers;
    data['sender'] = sender;
    data['message'] = message;
    
    let formData = new FormData();
    formData.append("apikey",apiKeyOri);
    formData.append("numbers",numbers);
    formData.append("sender",sender);
    formData.append("message",message);
	// Send the POST request with cURL
	/*$ch = curl_init('https://api.textlocal.in/send/');
	curl_setopt($ch, CURLOPT_POST, true);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$response = curl_exec($ch);
	curl_close($ch);
	
	// Process your response here
    echo $response;*/
    fetch('https://api.textlocal.in/send/',
    {
        method:'POST',
        /*headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
        },*/
        body: formData
    })
    .then(response=>{console.log("response=>",response.json())})
}
    
    handleSubmit(e) {        
        e.preventDefault();
        const user = {
            name: this.state.name,
            phoneno: this.state.phoneno,
            email: this.state.email,
            message: this.state.message
        }

        // send_email(user)
       
       let name = user.name;
       let phoneno = user.phoneno;
       let email = user.email;
       let message = user.message;
       let resp = "Mail";
    // let queryData=`mutation{insert_profile(objects: {name: \"${name}\",phoneno: \"${phoneno}\",email : \"${email }\",message: \"${message}\",resp: \"${resp}\"}) { returning {id name }}}`;
       let queryData=`mutation{insert_mail(objects: {name: \"${name}\",phoneno: \"${phoneno}\",email : \"${email }\",message: \"${message}\",resp: \"${resp}\"}) { returning {id name }}}`;       
       let clientsdata={
                    "query":queryData,
                    "variables":null
                    }
        //  console.log(user);

        // fetch("https://newgqldb.herokuapp.com/v1alpha1/graphql",
        fetch("https://gqlmail.herokuapp.com/v1alpha1/graphql",
        {
            method:'POST',
            headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
            },
            body: JSON.stringify(clientsdata)
        })
        .then((response)=>{
            console.log(response);
        })        



        // SMS
        let apiKey="d8ZaUIHjYK4-oyr8WNmvEbjRUEMZ0CTbY77QGVjN2X"        
        	let apiKeyOri = encodeURI(apiKey);
            
            let numbers = [phoneno];
        	let sender = encodeURI('TXTLCL');
        	//  message = encodeURI('This is your message');
         
            //$numbers = implode(',', $numbers);
            numbers = numbers.join(",");
         
        	// Prepare data for POST request
            //$data = array('apikey' => $apiKey, 'numbers' => $numbers, "sender" => $sender, "message" => $message);
            /*let data = [
                "apikey"apiKeyOri,
                "numbers":numbers,
                "sender":sender,
                "message":message
            ]*/
            let data = [];
            data['apikey'] = apiKeyOri;
            data['numbers'] = numbers;
            data['sender'] = sender;
            data['message'] = encodeURI(message);
            
            let formData = new FormData();
            formData.append("apikey",apiKeyOri);
            formData.append("numbers",numbers);
            formData.append("sender",sender);
            formData.append("message",message);
        	// Send the POST request with cURL
        	/*$ch = curl_init('https://api.textlocal.in/send/');
        	curl_setopt($ch, CURLOPT_POST, true);
        	curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        	$response = curl_exec($ch);
        	curl_close($ch);
            
        	// Process your response here
            echo $response;*/
            fetch('https://api.textlocal.in/send/',
            {
                method:'POST',
                /*headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                },*/
                body: formData
            })
            .then(response=>{console.log("response=>",response.json())})





        const TEMPLATE_ID = "sample_email"
        const SERVICE_ID = "default_service"
        var templateParams = {
          to_name: this.state.name,
          from_name: 'Sample App',
          message_html: this.state.message,
          to: this.state.email,
          from: 'support@example.com'
        };
        emailjs.init("user_vVyAx3v8xIbBNDfPev65o");
        emailjs.send( SERVICE_ID, TEMPLATE_ID, templateParams)
          .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
          }, function(err) {
            console.log('FAILED...', err);
          });


        this.props.history.push({
            pathname:'/details',     
            state:{
                    // data: obj,                    
                }
        });

    }




  render() {
    return (
      <div>
          <div className="container">              
        <div className="row">
            <div className="col-xl-8 offset-xl-2 py-5">      
            <form id="contact-form" onSubmit={ this.handleSubmit }>
                <div className="messages" />
                <div className="controls">
                <div className="row">
                    <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="form_name">Name *</label>
                        <input onChange={ this.handleInputChange } id="form_name" type="text" name="name" className="form-control" placeholder="Please enter your firstname *" required="required" data-error="Name is required." />
                        <div className="help-block with-errors" />
                    </div>
                    </div>
                    {/* <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="form_lastname">Lastname *</label>
                        <input onChange={ this.handleInputChange } id="form_lastname" type="text" name="surname" className="form-control" placeholder="Please enter your lastname *" required="required" data-error="Lastname is required." />
                        <div className="help-block with-errors" />
                    </div>
                    </div> */}
                </div>
                <div className="row">
                    <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="form_email">Email *</label>
                        <input onChange={ this.handleInputChange } id="form_email" type="email" name="email" className="form-control" placeholder="Please enter your email *" required="required" data-error="Valid email is required." />
                        <div className="help-block with-errors" />
                    </div>
                    </div>
                    <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="form_email">Phone No *</label>
                        <input onChange={ this.handleInputChange } id="form_email" type="phone" name="phoneno" className="form-control" placeholder="Please enter your phone number *" required="required" data-error="Valid phone no is required." />
                        <div className="help-block with-errors" />
                    </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                    <div className="form-group">
                        <label htmlFor="form_message">Message *</label>
                        <textarea onChange={ this.handleInputChange } id="form_message" name="message" className="form-control" placeholder="Message*" rows={4} required="required" data-error="Please, leave us a message." defaultValue={""} />
                        <div className="help-block with-errors" />
                    </div>
                    </div>
                    <div className="col-md-12">
                    <input type="submit" className="btn btn-success btn-send" />
                    </div>

                </div>
                    <div className="row">
                        {/* <button className="btn btn-success btn-send" onClick={()=>this.sentSMS()}>sendsms</button> */}
                        {/* <button className="btn btn-success btn-send" onClick={()=>this.send_email()}>send email</button>                         */}
                    </div>
                </div>
            </form>
            </div>
            {/* /.8 */}
        </div>
        {/* /.row*/}
        </div>
        {/* /.container*/}
      </div>
    )
  }
}
export default compose(    
    graphql(addMailMutation, { name: "addMailMutation" })
)(Home);