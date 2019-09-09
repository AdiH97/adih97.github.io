// Function to get user data in the JSON format
jQuery.githubUser = function(username, callback) {
   jQuery.getJSON('https://api.github.com/users/'+username+'/repos?callback=?',callback)
}
 
// Function to display de JSON file data
jQuery.fn.loadRepositories = function(username) {

    // Loading text (it will display in case of an error)
    this.html("<span>Querying GitHub for " + username +"'s repositories...</span>");
     
    var target = this;
    $.githubUser(username, function(data) {
        var repos = data.data; // JSON Parsing

        // Debug
        console.log(data)
        
        // sortByName(repos);    
     
        // All repository data will be wrapped in an atricle tag
        var list = $('<article class="post"/>');
        target.empty().append(list);

        $(repos).each(function() {
            if (this.name != (username.toLowerCase()+'.github.com')) {

                // Last time the repository was updated. We create a Date variable to show a UTC string
                var update_date = new Date(this.updated_at);

                // title //
                // Include url and name
                var html = '<h1><a href="'+ (this.html_url) +'">' + this.name + '</a>';

                // Include fork image if it's a forked repository
                if(this.fork == true) {
                    html += '<img class="title_icons" src="../images/svg/repo-forked.svg"></img>';
                }

                html += '</h1>';

                // meta //
                html += '<div class="meta">';
                html += '<span class="date">' + update_date.toUTCString() + '</span>';

                if(this.description != null) {
                    html += '<div class="entry">'+this.description+'</div>';
                } else {
                    html += '<div class="entry"><i>No description.</i></div>';
                }
                html += '</div>';

                // Append the string var to the list
                list.append(html);
            }
        });      
      });
};