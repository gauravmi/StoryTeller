// import {Socket} from "phoenix"

// let socket = new Socket("/ws")
// socket.connect()
// let chan = socket.chan("topic:subtopic", {})
// chan.join().receive("ok", chan => {
//   console.log("Success!")
// })


class App {
  static init(){
  	var self = this;
  	$("#search-text").keypress(function(e){
  		if (e.which == 13) {
  			console.log("sdf");
  			self.requestCommits($(event.target).val());
  		}
  	})
  }

  static display(data){

  }

  static requestCommits(search_text){
    var self = this;
  	$.ajax('/commits?q='+search_text, {
  		method: 'get'
  	}).done(function(data){
      self.display(data);
  	})
  }
}

$( () => App.init() )



export default App
