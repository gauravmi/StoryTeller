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
  static unique(value, index. self){
    return self.indexOf(value) === index;
  }

  static display(data){
    data = JSON.parse(data);
    var contributers = []
    for(var i=0; i< data.length; i++){
      contributers.push(data[i].commit.author.name)
      var row = $("<div class='row'></div>")
      var message = $("<div class='message'></div>")
      var date = $("<span class='date'></span>")
      var commit = $("<span class='commit'></span>")
      var author = $("<span class='author'></span>")
      var date = $("<span class='date'></span>")
      var url = $("<span class='url'></span>")
      commit.text(data[i].sha);
      date.text(data[i].commit.author.date);
      author.text(data[i].commit.author.name);
      message.text(data[i].commit.message);
      url.text(data[i].url);
      row.append(author);
      row.append(message);
      row.append(date);
      row.append(commit);
      $(".search-rows").append(row);
    }
    var contributorSection = $("<div class='contrib-section'></div>")
    var cont = $("<span class='contribtitle'></span>")
    cont.text("Contributers...");
    contributorSection.append(cont);
    debugger;
    contributers = contributers.filter(this.unique);
    for(var i=0;i< contributers.length; i++){
      var contributor = $("<div class='contrib'></div>");
      contributor.text(contributers[i]);
      contributorSection.append(contributor);
    }
    $(".search-response").append(contributorSection);
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
