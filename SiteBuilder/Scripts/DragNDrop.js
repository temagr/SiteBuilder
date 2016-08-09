﻿$(function () {
    $('#image, #video').draggable({
        revert: function () {
            return true;
        },
    });

    $('#droppable1, #droppable2, #droppable3, #droppable4').droppable({
        drop: function (event, ui) {
            if (ui.draggable.attr('id') == "image") {
                uploadImage(this);
            }
            else {
                var src = prompt("Add link youtube video");
                var code = '<iframe width="' + $(this).width() + '" height = "' + $(this).width()/4*3 + '" src="' + src + '" frameborder="0" class="2"></iframe>'
                add(this, code);
            }
        },
    });
});

function uploadImage(element) {
    cloudinary.openUploadWidget({ cloud_name: 'tematema', upload_preset: 'ciwchslt' },
      function (error, result) { console.log(error, result) });

    $(document).one('cloudinarywidgetsuccess', function (e, data) {
        var code = "<img src='" + data[0].secure_url + "' width='" + $(element).width() + "' class='1' />"
        add(element, code);
    });
}

function add(element, code) {
    $(element).empty();
    $(element).html(code);
    $(element).height("100%");
}

function submitForm() {

    var result = 0;

    for (var i = 1; i < 4; i++) {
        result += checkEmpty('#droppable' + i);
    }

    if (result == 3) {
        savePage($('#inputSiteId').attr('value'), $('#inputPageName').val());
    }
    else {
        alert('Please insert data in layout.');
    }
}

function checkEmpty(element) {
    if ($(element).is(':empty')) {
        return 0;
    }
    else {
        return 1;
    }
}

function savePage(siteId, name) {
    $.ajax({
        type: 'POST',
        url: "/SiteBuilder/SavePage",
        data: {
            SiteId: siteId,
            TemplateId: $('.template').attr('id'),
            Name: name,
        },
        success: function (data) {
            for (var i = 1; i < 4; i++) {
                alert("#droppable" + i.toString());
                saveData(data, i, "#droppable" + i.toString());
            }

            $("#formPage").submit();
        },
        error: function (data) {
            alert('Error save page. Please refresh page.');
        }
    });
}

function saveData(id, position, tagId) {
    $.ajax({
        type: 'POST',
        url: "/SiteBuilder/SaveData",
        data: {
            PageId: id,
            Position: position,
            Data: $(tagId).children(':first').attr('src'),
            ContentTypeId: $(tagId).children(':first').attr('class'),
        },
        success: function (data) {
            alert("+");
        },
        error: function (data) {
            alert("Error save data. Please refresh page." + $(tagId).html().replace(/"/g,"'"));
        }
    });
}