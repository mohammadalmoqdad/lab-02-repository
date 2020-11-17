Image.all = [];
function Image(imgObject) {
    this.image_url = imgObject.image_url;
    this.title = imgObject.title;
    this.description = imgObject.description;
    this.keyword = imgObject.keyword;
    this.horns = imgObject.horns;
    Image.all.push(this);
}



var options = '';

var keywords = [];
$('#page1').click(pagination);
$('#page2').click(pagination);
pagination();

function pagination(event) {
    //defaulut is the page-1.json but when clicking on the button the 
    let path = 'page-1.json';
    if (event) {
        // console.log(22)
        if (event.target.id == 'page2') {
            path = 'page-2.json'
        }
        else if (event.target.id == 'page2') {
            path = 'page-1.json'
        }
    }


    $.ajax(path)
        .then(data => {
            console.log(keywords)
            data.forEach(element => {
                let imgObject = new Image(element);
               
                if (event) {
                    $('.options-section').val('default'); // agter clicking on button the select vlaue shoud be returned to default
                    $('.option').remove();// all of the options will be seleted except the first one because I removed the class from it in line 70
                }


                if (!keywords.includes(element.keyword)) {
                    keywords.push(element.keyword);
                }

            });




            $('.deleteMe').remove();// to remove all the html elements before rendering again and making the array empty for the js part




            // to render the drop-down list
            for (var i = 0; i < keywords.length; i++) {
                options = $('.option').clone();
                $('.options-section').append(options);
                options.text(keywords[i]);//image.all[i].keyword
               
                options.removeClass('option');
                options.attr('value', keywords[i]);// to give each option the value of keword  
            }

            $('.option').removeClass(); //to delete options in line 41 without deleting first option 
            // and it is after the rendering of the select options because they where cloaning from it.


            sortArrayElements();
            // render Images
            Image.all.forEach(element => {

                let template = $('#importElement').html();
                let html = Mustache.render(template, element);
                $('.main').append(html);


                // let imgSection = $('.photo-template').clone();
                // $('.main').append(imgSection);

                // //add the values to elements inside created sections
                // imgSection.removeClass('photo-template');
                // imgSection.find('.imageTitle').text(element.title);
                // imgSection.find('.imageDescription').text(element.description);
                // imgSection.find('.image').attr('src', element.image_url);
                // imgSection.attr('class','deleteMe');// give the sections classes to remove them before rendering Images again.
            });








            //render images depend on the keyword(<select> vlaue)
            $('.options-section').on('change', renderImgsKewordBased);
            function renderImgsKewordBased(event) {
                $('.deleteMe').remove();
                // Another sulution 
                // $('.deleteMe').attr('style','display: none;');
                console.log(Image.all)
                Image.all.forEach(element => {

                    if (element.keyword == event.target.value) {
                        // let imgSection = $('.photo-template').clone();
                        // $('.main').append(imgSection);
                        // // console.log(imgSection.text)
                        // imgSection.removeClass('photo-template');
                        // imgSection.find('.imageTitle').text(element.title);
                        // imgSection.find('.imageDescription').text(element.description);
                        // imgSection.find('.image').attr('src', element.image_url);
                        // imgSection.attr('class', 'deleteMe');

                        let template = $('#importElement').html();
                        let html = Mustache.render(template, element);
                        $('.main').append(html);

                    }

                    else if ("default" == event.target.value) {
                        //when the selected choice in <select> is 'filter by keyword'
                        let template = $('#importElement').html();
                        let html = Mustache.render(template, element);
                        $('.main').append(html);

                        // let imgSection = $('.photo-template').clone();
                        // $('.main').append(imgSection);
                        //add the values to elements inside created sections
                        // imgSection.removeClass('photo-template');
                        // imgSection.find('.imageTitle').text(element.title);
                        // imgSection.find('.imageDescription').text(element.description);
                        // imgSection.find('.image').attr('src', element.image_url);
                        // imgSection.attr('class', 'deleteMe');// give the sections classes to remove them before rendering Images again.
                    }
                });
            }
            function sortArrayElements() {
                Image.all.sort(function (c, b) {
                    b = b.horns;
                    c = c.horns;

                    if (c > b) {
                        return -1;
                    }
                    else if (c < b) {
                        return 1
                    }
                    else {
                        return 0;
                    }

                });
            }


        });
Image.all=[];//empty the array to avoid adding the lemnts when clicking on the page 1 or 2 button
}