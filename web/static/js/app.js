import {Socket} from "phoenix"


class App {
  static init(){    
    this.searchContainer = $(".search-container");
    this.searchSection = $(".search-rows");
    this.inputSearch = $("#search-text");
    this.contributorSection = $(".contrib-section");
    this.observe(this.inputSearch);
  }

  static observe(input){
    var self = this;
    input.keypress(function(e){
      if (e.which == 13) {        
        self.requestCommits($(event.target).val());
      }
    })
  }

  static templateRow(){
    return (function(gitLog){
      return $("<div class='row'> \
        <div class='message'>"+ gitLog.commit.message +"</div> \
        <a href="+gitLog.html_url+"><span class='commit'>"+ gitLog.sha.substring(0,8) +"</span> </a>\
        <span class='author'>"+ gitLog.commit.author.name +"</span> \
        <span class='date'>"+ gitLog.commit.author.date +"</span> \
        <span class='url'></span> \
      </div>")
    });
  }

  static templateContributer(){
    return (function(contributer){
      return $("<div class='contrib'>"+ contributer +"</div>")
    }); 
  }

  static unique(value, index, self){
    return self.indexOf(value) === index;
  }

  static display(data){
    var contributers = [];
    this.searchSection.empty();
    this.contributorSection.empty();
    for(var row of data){
      contributers.push(row.commit.author.name);
      var rowHtml = this.templateRow()(row);      
      this.searchSection.append(rowHtml);
    }
    contributers = contributers.filter(this.unique);
    for(var contributor of contributers){
      var contributor = this.templateContributer()(contributor);
      this.contributorSection.show();
      this.contributorSection.append(contributor);
    }
  }

  static requestCommits(search_text){
    var self = this;
  	$.ajax('/commits?q='+ search_text, {
  		method: 'get'
  	}).done(function(data){
      self.display(data);
  	})
  }
}

$( () => App.init() )

export default App
