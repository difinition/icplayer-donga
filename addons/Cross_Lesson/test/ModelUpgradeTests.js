TestCase("[Cross Lesson] Upgrade model", {
    setUp: function () {
        this.presenter = AddonCross_Lesson_create();

        this.model = {
            Text: "Go to lesson",
            Image: "/file/server/123456",
            CourseID: "1234567",
            LessonID: "testLesson",
            Page: "xQNFEDISERT",
            Type: "lesson"
        };
    },

    "test given model without OpenLessonInCurrentTab when upgradeModel is called then OpenLessonInCurrentTab is added with default value": function () {
        var upgradedModel = this.presenter.upgradeModel(this.model);

        assertNotUndefined(upgradedModel.OpenLessonInCurrentTab);
        assertEquals("False", upgradedModel.OpenLessonInCurrentTab);
    },

    "test given model with OpenLessonInCurrentTab when upgradeModel is called then OpenLessonInCurrentTab value remains unchanged": function () {
        this.model["OpenLessonInCurrentTab"] = "True";
        var upgradedModel = this.presenter.upgradeModel(this.model);

        assertNotUndefined(upgradedModel.OpenLessonInCurrentTab);
        assertEquals("True", upgradedModel.OpenLessonInCurrentTab);
    },

    "test given model without langAttribute when upgradeModel is called then langAttribute is added with default value": function () {
        var upgradedModel = this.presenter.upgradeModel(this.model);

        assertNotUndefined(upgradedModel.langAttribute);
        assertEquals("", upgradedModel.langAttribute);
    },

    "test given model with langAttribute when upgradeModel is called then langAttribute value remains unchanged": function () {
        this.model["langAttribute"] = "PL-pl";
        var upgradedModel = this.presenter.upgradeModel(this.model);

        assertNotUndefined(upgradedModel.langAttribute);
        assertEquals("PL-pl", upgradedModel.langAttribute);
    },

    "test given model without speechTexts when upgradeModel is called then speechTexts is added with default value": function () {
        var expectedSpeechTexts = {
            GoToLesson: {GoToLesson: ""},
        };

        var upgradedModel = this.presenter.upgradeModel(this.model);

        assertNotUndefined(upgradedModel.speechTexts);
        assertEquals(expectedSpeechTexts, upgradedModel.speechTexts);
    },

    "test given model with speechTexts when upgradeModel is called then speechTexts value remains unchanged": function () {
        this.model.speechTexts = {
            GoToLesson: {GoToLesson: "Idź do lekcji"},
        }

        var upgradedModel = this.presenter.upgradeModel(this.model);

        assertNotUndefined(upgradedModel.speechTexts);
        assertEquals(this.model.speechTexts, upgradedModel.speechTexts);
    },

    "test given model without checkForAccess when upgradeModel is called then checkForAccess set to false": function () {
        var upgradedModel = this.presenter.upgradeModel(this.model);

        assertNotUndefined(upgradedModel.CheckForAccess);
        assertEquals(upgradedModel.CheckForAccess, "False");
    },

    "test given model with checkForAccess set to True when upgradeModel is called then checkForAccess value remains unchanged": function () {
        this.model.CheckForAccess = "True";

        var upgradedModel = this.presenter.upgradeModel(this.model);

        assertNotUndefined(upgradedModel.CheckForAccess);
        assertEquals(upgradedModel.CheckForAccess, "True");
    },

     "test given model without AccessIDs when upgradeModel is called then AccessIDs set to empty string": function () {
        var upgradedModel = this.presenter.upgradeModel(this.model);

        assertNotUndefined(upgradedModel.AccessIDs);
        assertEquals(upgradedModel.AccessIDs, "");
    },

    "test given model with AccessIDs set when upgradeModel is called then AccessIDs value remains unchanged": function () {
        var expectedValue = "1234, 5678";
        this.model.AccessIDs = expectedValue;

        var upgradedModel = this.presenter.upgradeModel(this.model);

        assertNotUndefined(upgradedModel.AccessIDs);
        assertEquals(upgradedModel.AccessIDs, expectedValue);
    }
});
