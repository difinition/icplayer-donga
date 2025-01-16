function AddonCompletion_Progress_create() {
    var presenter = function () { };

    var playerController;
    var eventBus;

    presenter.currentProgress = 0;
    presenter.modules = [];

    presenter.setPlayerController = function(controller) {
        playerController = controller;
        eventBus = controller.getEventBus();
        eventBus.addEventListener('PageLoaded', this);

        presenter.page = controller.getPresentation().getPage(controller.getCurrentPageIndex());
    };

    presenter.updateProgress = function () {
//        console.log("AddonCompletion_Progress_create updateProgress : " + presenter.modules.length);
        if (presenter.modules.length == 0) {
            presenter.currentProgress = 0;
        } else {
            var attemptedCount = 0;

            for (var i = 0; i < presenter.modules.length; i++) {
//                console.log("AddonCompletion_Progress_create", presenter.modules[i], presenter.modules[i].isActivity(), presenter.modules[i].isAttempted());

                if (presenter.modules[i].isAttempted()) {
                    attemptedCount++;
                }
            }

//            console.log("AddonCompletion_Progress_create attemptedCount", attemptedCount, presenter.modules.length);
            presenter.currentProgress = Math.floor((attemptedCount / presenter.modules.length) * 100);
        }

        presenter.updateProgressUI(presenter.currentProgress);
    };

    // 이석웅 수정
    // 모듈내에 있는 자식 gap 포함
//    presenter.updateProgress = function () {
////        console.log("AddonCompletion_Progress_create updateProgress : " + presenter.modules.length);
//        if (presenter.modules.length == 0) {
//            presenter.currentProgress = 0;
//        } else {
//            var attemptedCount = 0;
//
//            for (var i = 0; i < presenter.modules.length; i++) {
////                console.log("AddonCompletion_Progress_create isAttempted", presenter.modules[i].isAttempted());
//
//                try{
////                    console.log("AddonCompletion_Progress_create isAttemptedAtLeastOne", presenter.modules[i].isAttemptedAtLeastOne());
//                    if (presenter.modules[i].isAttemptedAtLeastOne()) {
//                        try{
//                            var gapAttempedCount = presenter.modules[i].getAttempedCount();
//                            attemptedCount += gapAttempedCount;
//                        }catch(e){
//
//                            if (presenter.modules[i].isAttempted()) {
//                                attemptedCount++;
//                            }
//                        }
//                    }
//                }catch(e){
////                    console.log("updateProgress e", e);
//                    if (presenter.modules[i].isAttempted()) {
//                        attemptedCount++;
//                    }
//                }
//            }
//
////            console.log("AddonCompletion_Progress_create attemptedCount", attemptedCount, presenter.totalInputCount());
//            presenter.currentProgress = Math.floor((attemptedCount / presenter.totalInputCount()) * 100);
//        }
//
//        presenter.updateProgressUI(presenter.currentProgress);
//    };

    presenter.loadModules = function () {
        if (!presenter.page.isReportable()) {
            return;
        }

        var modules = presenter.page.getModulesAsJS(),
            module, loadedModules = [];

        for (var i = 0; i < modules.length; i++) {
            module = playerController.getModule(modules[i]);

            if (module && module.isAttempted !== undefined) {
                loadedModules.push(module);
            }
        }

        presenter.modules = loadedModules;
    };

    // 이석웅 추가
     presenter.totalInputCount = function () {
        if (!presenter.page.isReportable()) {
            return;
        }

        var inputCnt = 0;
        var modules = presenter.page.getModulesAsJS(),
            module, loadedModules = [];

        for (var i = 0; i < modules.length; i++) {
            module = playerController.getModule(modules[i]);
//            console.log("module", module);
            if (module && module.isAttempted !== undefined) {
                try{
                    //자식 input이 있는 경우
                   inputCnt += module.getGapCnt();
                }catch(e){
                   inputCnt += 1;
                }

//                console.log("module",module, inputCnt);
            }
        }

        return inputCnt;
    };

    // 이석웅 추가
    presenter.getProgress = function () {
        return presenter.currentProgress;
    };

    presenter.validateModel = function (model) {
        return {
            automaticCounting: !ModelValidationUtils.validateBoolean(model['Turn off automatic counting']),
            isVisible: ModelValidationUtils.validateBoolean(model['Is Visible'])
        };
    };

    presenter.presenterLogic = function (view, model, isPreview) {
        presenter.pageLoadedDeferred = new $.Deferred();
        presenter.pageLoaded = presenter.pageLoadedDeferred.promise();

        presenter.$view = $(view);
        presenter.model = model;
        presenter.configuration = presenter.validateModel(model);

        presenter.setVisibility(presenter.configuration.isVisible || isPreview);

        if (!isPreview && presenter.configuration.automaticCounting) {
            eventBus.addEventListener('ValueChanged', this);
            presenter.pageLoaded.then(function() {
                presenter.loadModules();
                presenter.updateProgress();
            });
        }
    };

    presenter.onEventReceived = function (eventName, eventData) {
//        console.log("onEventReceived", eventName, eventData)
        if (eventName == "ValueChanged") {
            // 이석웅 추가 (오디오, 비디오 이벤트로 인해 정답보기가 해제되는 현상 막음
            if( eventData.source.indexOf("video") > -1
                || eventData.source.indexOf("audio") > -1
                || eventData.source.indexOf("dsb_script") > -1
                || eventData.source.indexOf("dsb_subtitles") > -1
                || eventData.source.indexOf("Done") > -1
                || eventData.source.indexOf("DSB_feedback") > -1
                || eventData.source.indexOf("EditableWindow") > -1
                || eventData.source.indexOf("SSB_downloadRecorder") > -1
                || eventData.source.indexOf("Single_State_Button") > -1
                || eventData.source.indexOf("Double_State_Button") > -1
                || eventData.source.toLowerCase().indexOf("answer") > -1
                || eventData.source.toLowerCase().indexOf("check") > -1){
                return;
            }

            if( eventData.value.indexOf("playing") > -1
                || eventData.value.indexOf("ended") > -1
                || eventData.value.indexOf("pause") > -1 ){
                return;
            }

            if( eventData.item.indexOf("play") > -1
                || eventData.item.indexOf("end") > -1
                || eventData.item.indexOf("pause") > -1 ){
                return;
            }

//            console.log("onEventReceived", eventName, eventData)
            presenter.updateProgress();
        }
        if (eventName == 'PageLoaded') {
            presenter.pageLoadedDeferred.resolve();
        }
    };

    presenter.run = function (view, model) {
        presenter.presenterLogic(view, model, false);
    };
    
    presenter.createPreview = function (view, model) {
        presenter.presenterLogic(view, model, true);
    };


    presenter.getState = function () {
        return JSON.stringify({
            isVisible: presenter.configuration.isVisible,
            currentProgress: presenter.currentProgress
        });
    };

    presenter.setState = function (state) {
       if (!state) return;

//        console.log("AddonCompletion_Progress_create setState", state);

        var parsedState = JSON.parse(state);

        presenter.configuration.isVisible = parsedState.isVisible;
        presenter.setVisibility(presenter.configuration.isVisible);

        presenter.currentProgress = parsedState.currentProgress;
        presenter.updateProgressUI(presenter.currentProgress);
    };
    
    presenter.executeCommand = function (name, params) {
        var commands = {
            'show': presenter.show,
            'hide': presenter.hide,
            'setProgress': presenter.setProgressCommand,
            'getProgress': presenter.getProgress
        };

        return Commands.dispatch(commands, name, params, presenter);
    };

    presenter.setVisibility = function (isVisible) {
        presenter.$view.css('visibility', isVisible ? 'visible' : 'hidden');
    };
    
    presenter.hide = function () {
        presenter.setVisibility(false);
        presenter.configuration.isVisible = false;
    };

    presenter.show = function () {
        presenter.setVisibility(true);
        presenter.configuration.isVisible = true;
    };

    presenter.updateProgressUI = function (progress) {
        presenter.$view.find('.progress-bar').css('width', progress + '%');
        presenter.$view.find('.progress-text').text(progress + '%');
    };

    presenter.reset = function () {
        presenter.currentProgress = 0;

        presenter.updateProgressUI(0);
    };

    presenter.getProgress = function () {
        return presenter.currentProgress;
    };

    presenter.setProgress = function (progress) {
//        console.log("AddonCompletion_Progress_create setProgress", progress);
        var validatedProgress = ModelValidationUtils.validateIntegerInRange(progress, 100);

        if (!validatedProgress.isValid) {
            return;
        }

        presenter.currentProgress = validatedProgress.value;
        presenter.updateProgressUI(presenter.currentProgress);
    };

    presenter.setProgressCommand = function (params) {
        presenter.setProgress(params[0]);
    };

    return presenter;
}