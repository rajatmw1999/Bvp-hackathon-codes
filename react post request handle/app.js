const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const express = require('express');
const app= express();
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended:true}));          //To make use of body parser.
app.set('view engine','ejs');                     //To make use of ejs
app.use(express.static('public'));                //To upload css files, sounds, images and other assests to the server... this public folder is fully uploaded
mongoose.connect("mongodb://localhost:27017/articledb",{useNewUrlParser: true});


const loginSchema = new mongoose.Schema({
  username: String
});

const LoginInfo = new mongoose.model('Password',loginSchema);


class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    var name = this.state.value;
    alert('A name was submitted: ' + name);
    event.preventDefault();
    const newlogin = new LoginInfo{
      username:name,
    }
    LoginInfo.findOne({username:name},function(err,found){
      if(found){
        console.log("USername already exists");
      }
      else{
        newlogin.save();
      }
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

app.get('/',function(req,res){
ReactDOM.render(
  <NameForm />,
  document.getElementById('root')
);
});

app.listen(3000,function(){
  console.log('Server is running successfully on port 3000!');
});
