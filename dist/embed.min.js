(function(w,d,e){

    var e = w.esq;

    e.wrapper = null;
    e.modal = null;
    e.store = null;
    e.uri = null;
    e.contentPath = 'https://s3-eu-west-1.amazonaws.com/eventsquare.plugins/embed';

    e.init = function(uri) {

        //Set uri
        e.uri = uri;

        //Load stylesheet
        var head  = document.getElementsByTagName('head')[0];
        var link  = document.createElement('link');
        link.id   = 'es-store-style';
        link.rel  = 'stylesheet';
        link.type = 'text/css';
        link.href =  e.contentPath + '/embed.min.css';
        link.media = 'all';
        head.appendChild(link);

        //Create elements
        e.wrapper = document.createElement('div');
        e.store = document.createElement('iframe');
        e.modal = document.createElement('div');

        var es_preloader = document.createElement('div');
        var es_preloader_animation = document.createElement('div');

        var es_header = document.createElement('div');
        var es_logo = document.createElement('img');

        //Define attributes
        es_logo.src = e.contentPath + "/images/es-logo-light.png";

        //Add classes
        e.wrapper.classList.add( "es-store-modal-wrapper");
        e.store.classList.add("es-store-iframe");
        e.modal.classList.add("es-store-modal");

        es_preloader.classList.add("es-store-modal-preloader");
        es_preloader_animation.classList.add("es-store-modal-preloader-animation");
        es_header.classList.add("es-store-header");
        es_logo.classList.add("es-store-logo");

        //es_preloader.innerHTML = 'Bezig met laden...';

        //Append elements
        e.wrapper.appendChild(e.modal);
        e.wrapper.appendChild(es_preloader);
        es_preloader.appendChild(es_preloader_animation);

        e.modal.appendChild(es_header);
        e.modal.appendChild(e.store);

        es_header.appendChild(es_logo);

        //Listeners
        e.wrapper.onclick = function() {
            e.hide();
        }
        e.store.onload = function() {
            if(e.store.src){
                e.modal.classList.add("es-store-modal-open");
            }
        }
        w.onresize = function(event) {
            e.layout();
        };
        document.body.appendChild(e.wrapper);
    };
    e.show = function() {
        if(!e.store.src){
            e.store.src = "https://" + e.uri + ".eventsquare.co";
        }
        e.wrapper.classList.add("es-store-modal-open");
        e.layout();
    };
    e.hide = function() {
        e.wrapper.classList.remove("es-store-modal-open");
    };
    e.layout = function() {
        var height = w.innerHeight - 50 - 50;
        e.modal.style.height = height + "px";
    };
    e.setContentPath = function (path) {
        e.contentPath = path;
    };
    e.callMethod = function(method,arguments){
        if(typeof eval('e.' + method) !== 'undefined'){
            eval('e.' + method).apply(e,arguments);
        } else {
            console.error('The "' + method + '" method is not available in EventSquare');
        }
    };
    e.runQueue = function() {
        if(e.queue.length){
            for(i=0;i<e.queue.length;i++){
                var arguments = Array.prototype.slice.call(e.queue[i]);
                arguments.shift();
                e.callMethod(e.queue[i][0],arguments);
            }
        }
    };
    e.runQueue();
}(window,document));
