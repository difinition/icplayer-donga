 function AddonYouTube_Addon_create(){
    var presenter = function() {
    };

    presenter.playerController = null;
    presenter.ismLibro = false;
 
    function createVideoThumbnailAsync(videoID, viewContainer, addonWidth, addonHeight) {

        var feedURL = "https://mauthor.com/api/v2/youtube/thumbnail?video_id=" + videoID;

        $.when($.get(feedURL)).then(function (jsonResponse) {
            if (jsonResponse.items.length > 0) {
                var thumbnails = jsonResponse.items[0].snippet.thumbnails;
                var thumbnailURL = thumbnails.maxres.url;
                var thumbnailElement = document.createElement("img");
                $(thumbnailElement).attr('src', thumbnailURL);
                viewContainer.html(thumbnailElement);
                $(thumbnailElement).css({
                    width: addonWidth + 'px',
                    height: addonHeight + 'px'
                });
            }
        });
    }
 
    function showErrorMessage(viewContainer, errorMessage) {
        var errorElement = document.createElement('p');
        $(errorElement).text(errorMessage);
        viewContainer.html(errorElement);
    }

     function doesConnectionExist() {
         if (!presenter.ismLibro) return true;

         var xhr = new ( window.ActiveXObject || XMLHttpRequest )( "Microsoft.XMLHTTP" );

         //YouTube API key is generated in lorepocorporate google account
         xhr.open( "HEAD", "https://mauthor.com/api/v2/youtube/", false );

         try {
             xhr.send();
             return ( xhr.status >= 200 && xhr.status < 300 || xhr.status === 304 );
         } catch (error) {
             return false;
         }
     }

    function presenterLogic(view, model, isPreview) {
        var width = model.Width;
        var height = model.Height;
        presenter.isVisible = ModelValidationUtils.validateBoolean(model['Is Visible']);
        presenter.isVisibleByDefault = presenter.isVisible;
        presenter.disableFullscreen = ModelValidationUtils.validateBoolean(model['Disable Fullscreen']);

        var isAutoplay = ModelValidationUtils.validateBoolean(model['Autoplay']);
        var timeStart = presenter.decodeTimeStart(model['Time start'] || "");
        var viewContainer = $(view);
        var decodedVideoID = presenter.decodeVideoID(model.URL, model.ID);

        presenter.$view = $(view);

        if (decodedVideoID.isError) {
            showErrorMessage(viewContainer, decodedVideoID.errorMessage);
            return;
        }
        if (!timeStart.isValid) {
            showErrorMessage(viewContainer, "Incorrect video time start - value must be number greater than 0");
            return;
        }

        if (isPreview) {
            createVideoThumbnailAsync(decodedVideoID.videoID, viewContainer, width, height);
        } else {
            presenter.setVisibility(presenter.isVisible);
            var src = '${protocol}://www.youtube.com/embed/${video_id}';
            src = src.replace("${video_id}", decodedVideoID.videoID);

            //Protocol (HTTP or HTTPS)
            var myProtocol = window.location.protocol;
            myProtocol = myProtocol.replace(":","");
            var httsStr = model.HTTPS;
            var protocol = httsStr === 'True' ? 'https' : 'http';

            if (myProtocol == 'https' || protocol == 'http') {
                src = src.replace("${protocol}", myProtocol);
            } else {
                src = src.replace("${protocol}", protocol);
            }

            var url = src + presenter.getUrlParams(isAutoplay, timeStart.value);

            var iframe = document.createElement('iframe');
            $(iframe).attr('id', 'ytIframe');
            $(iframe).attr('frameborder', '0');
            $(iframe).attr('src', url);
            $(iframe).attr('width', parseInt(width, 10) + 'px');
            $(iframe).attr('height', parseInt(height, 10) + 'px');

            if(!presenter.disableFullscreen){
                $(iframe).attr("allowfullscreen","allowfullscreen");
            }

            if(doesConnectionExist()){
                viewContainer.html(iframe);
            }else{
                var offlineDiv = document.createElement('div');
                $(offlineDiv).addClass('offline-message');
                if(model['Offline message']){
                    $(offlineDiv).text(model['Offline message']);
                    viewContainer.html(offlineDiv);
                }else{
                    $(offlineDiv).text('No connection to the Internet');
                    viewContainer.html(offlineDiv);
                }
            }
        }
    }
 
    presenter.createPreview = function(view, model) {
        presenterLogic(view, model, true);
    };
 
    presenter.run = function(view, model) {
        presenterLogic(view, model, false);
    };
 
    // Return -1 if any error occurs
    presenter.decodeVideoID = function(URL, ID) {
        //Encoding video ID from URL if ID is not given
        var videoID = "";
        var prefix = "";
        var methodResult = {
            videoID : -1,
            isError: false,
            errorMessage : ''
        };
 
        if(ID !== '') {
            if (ID.search(/[^a-zA-Z0-9_-]/gm) === -1) {
                methodResult.videoID = ID;
 
                return methodResult;
            } else {
                methodResult.isError = true;
                methodResult.errorMessage = "Video ID seems to be incorrect!";
 
                return methodResult;
            }
        }
 
        if(URL === '') {
            methodResult.isError = true;
            methodResult.errorMessage = "Neither video ID nor URL was given!";
 
            return methodResult;
        }
 
        var ampersandIndex = URL.indexOf("&");
        var youtubeIndex = URL.indexOf("youtube.com/watch?v=");
 
        if(youtubeIndex == -1) {
            // There is a possibility that user enters shorted URL
            youtubeIndex = URL.indexOf("youtu.be/");
 
            if(youtubeIndex == -1) {
                methodResult.isError = true;
                methodResult.errorMessage = "URL seems to be incorrect!";
 
                return methodResult;
            }
 
            prefix = ".be/";
        } else {
            prefix = "?v=";
        }
 
        var startIndex = URL.indexOf(prefix) + prefix.length;
        if (startIndex == URL.length) {
            methodResult.isError = true;
            methodResult.errorMessage = "URL seems to be incorrect. It must contain video ID!";
 
            return methodResult;
        }
 
        if(ampersandIndex == -1) {
            videoID = URL.substring(startIndex);
        } else {
            videoID = URL.substring(startIndex, ampersandIndex);
        }
 
        methodResult.videoID = videoID;
 
        return methodResult;
    };

    presenter.decodeTimeStart = function (timeStart) {
        if (ModelValidationUtils.isStringEmpty(timeStart.trim())) {
            return {
                isValid: true,
                value: 0
            };
        }

        return ModelValidationUtils.validatePositiveInteger(timeStart);
    };

    presenter.getUrlParams = function (isAutoplay, timeStart) {
        var autoplay = isAutoplay ? 1 : 0;
        return `?enablejsapi=1&start=${timeStart}&autoplay=${autoplay}&mute=${autoplay}`;
    };

     presenter.setVisibility = function (isVisible) {
         presenter.$view.css("visibility", isVisible ? "visible" : "hidden");
     };

     presenter.setPlayerController = function (controller) {
         presenter.playerController = controller;
         var context = controller.getContextMetadata();
         if (context != null && "ismLibro" in context) {
             presenter.ismLibro = context["ismLibro"];
         }

     };

     presenter.show = function() {
         presenter.setVisibility(true);
         presenter.isVisible = true;
     };

     presenter.hide = function() {
         presenter.setVisibility(false);
         presenter.isVisible = false;
     };

     // This function takes argument as function's name from iframe API:
     // https://developers.google.com/youtube/iframe_api_reference?hl=pl#Functions
     function callPlayer(func, args) {
         presenter.$view.find("iframe")[0].contentWindow.postMessage(JSON.stringify({
             'event': 'command',
             'func': func,
             'args': args || []
         }), "*");
     }

     presenter.stop = function() {
         callPlayer('stopVideo');
         callPlayer('seekTo', [0, true]);
     };

     presenter.executeCommand = function(name, params) {
         var commands = {
             'show': presenter.show,
             'hide': presenter.hide,
             'stop': presenter.stop
         };

         Commands.dispatch(commands, name, params, presenter);
     };

     presenter.reset = function(){
         presenter.isVisible = presenter.isVisibleByDefault;
         presenter.setVisibility(presenter.isVisibleByDefault);
     };

     presenter.getState = function () {
         return JSON.stringify({
             isVisible: presenter.isVisible
         });
     };

     presenter.upgradeStateForVisibility = function(state) {
         if (state.isVisible === undefined) {
             state.isVisible = true;
         }

         return state;
     };

     presenter.upgradeState = function (parsedState) {
         parsedState = presenter.upgradeStateForVisibility(parsedState);

         return parsedState;
     };

     presenter.setState = function(state) {
         if (ModelValidationUtils.isStringEmpty(state)) {
             return;
         }

         var parsedState = presenter.upgradeState(JSON.parse(state));

         presenter.isVisible = parsedState.isVisible;

         presenter.setVisibility(presenter.isVisible);
     };
 
    return presenter;
}
/**
 * YouTube Addon
 * Version 1.6
 * Last update: 23-08-2016
 */