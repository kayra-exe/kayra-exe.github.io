var isAutoScrolling = false;
const hashscroll = function() {
    for (var hashpage of ['homepage','about','education','experience','repositories','contact']) {
        selected_navbutton = document.getElementById(hashpage+'-button');
        selected_navbutton.style = 'margin-bottom:25px;';
    };
    selected_navbutton = document.getElementById(window.location.hash.replace('#','')+'-button');
    if (window.location.hash === '') {selected_navbutton = document.getElementById('homepage-button');};
    selected_navbutton.style = 'margin-bottom:25px;color:#0080ff;text-decoration:underline;text-underline-offset:4px;text-decoration-thickness:2px;';
};
const hashchanger = function() {
    if (isAutoScrolling) {return;};
    if (window.scrollY >= document.getElementById('contact').offsetTop) {window.location.hash = 'contact'} else {
        if (window.scrollY >= document.getElementById('repositories').offsetTop) {window.location.hash = 'repositories'} else {
            if (window.scrollY >= document.getElementById('experience').offsetTop) {window.location.hash = 'experience'} else {
                if (window.scrollY >= document.getElementById('education').offsetTop) {window.location.hash = 'education'} else {
                    if (window.scrollY >= document.getElementById('about').offsetTop) {window.location.hash = 'about'} else {window.location.hash = ''};
                };
            };
        };
    };
};
const load_data = function() {
 
    //Loading Repos
    requestURL = 'https://api.github.com/users/kayra-exe/repos';
    fetch(requestURL)
        .then(function(response) {
            if (response.ok) {
                return response.json();
            };
        })
        .then(function(data) {
            console.log(JSON.stringify(data));
            var htmlgen = '<div style="height:50px;"></div><p style="margin-bottom:50px;"><font size="30px"><b>My Public Repositories</b></font></p>';
            for (var repo of data) {
                htmlgen = htmlgen + '<a href="https://github.com/'+repo.full_name+'" target="_blank"><div class="the_box" style="margin-top:40px;margin-bottom:-30px;';
                if (repo.archived) {htmlgen = htmlgen + 'color:#a68400;';};
                htmlgen = htmlgen + '"><p style="font-size:20px;"><b>'+repo.full_name+'</b></p><p style="color:';
                if (repo.archived) {htmlgen = htmlgen + '#d0c18a';} else {htmlgen = htmlgen + '#808080';};
                htmlgen = htmlgen + ';font-size:10px;">'+repo.description+'</p><p>';
                for (var topic of repo.topics) {htmlgen = htmlgen + '<button class="button-mini" style="min-width:max-content;width:max-content;max-width:max-content;">'+topic+'</button>';};
                htmlgen = htmlgen + '</p></div></a>';
            };
            document.getElementById('repositories').innerHTML = htmlgen;
        });
}
addEventListener("load", (event) => {isAutoScrolling = true;hashscroll();;load_data();});
addEventListener("hashchange", (event) => {isAutoScrolling = true;hashscroll();});
addEventListener("scroll", (event) => {hashchanger();});
window.addEventListener("wheel", function() {
    isAutoScrolling = false;
});
window.addEventListener("touchstart", function() {
    isAutoScrolling = false;
});